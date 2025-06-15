
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Plus, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface Reminder {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface RemindersSectionProps {
  className?: string;
}

export function RemindersSection({ className }: RemindersSectionProps) {
  const [newReminder, setNewReminder] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Buscar lembretes do usuário
  const { data: reminders = [], isLoading } = useQuery({
    queryKey: ['reminders'],
    queryFn: async () => {
      console.log('🔍 Fetching reminders...');
      const { data: { user } } = await supabase.auth.getUser();
      console.log('👤 Current user:', user?.id);
      
      if (!user) {
        console.log('❌ No user authenticated, returning empty array');
        return [];
      }

      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('💥 Error fetching reminders:', error);
        throw error;
      }

      console.log('✅ Fetched reminders from DB:', data);
      const mappedReminders = data.map((reminder: any) => ({
        id: reminder.id,
        text: reminder.text,
        completed: reminder.completed,
        createdAt: new Date(reminder.created_at)
      }));
      console.log('🔄 Mapped reminders:', mappedReminders);
      return mappedReminders;
    }
  });

  // Adicionar lembrete
  const addReminderMutation = useMutation({
    mutationFn: async (text: string) => {
      console.log('➕ Adding reminder:', text);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('reminders')
        .insert([{
          text: text.trim(),
          completed: false,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) {
        console.error('💥 Error adding reminder:', error);
        throw error;
      }
      console.log('✅ Added reminder:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      setNewReminder("");
      setIsAdding(false);
      toast({
        title: "Lembrete adicionado",
        description: "Seu lembrete foi salvo com sucesso!",
      });
    },
    onError: (error) => {
      console.error('💥 Error in addReminderMutation:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o lembrete. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  // Marcar lembrete como concluído/não concluído
  const toggleReminderMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      console.log('🔄 Toggling reminder:', id, 'to completed:', completed);
      
      const { data, error } = await supabase
        .from('reminders')
        .update({ completed })
        .eq('id', id)
        .select();

      if (error) {
        console.error('💥 Error toggling reminder:', error);
        throw error;
      }
      
      console.log('✅ Toggle successful:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
    onError: (error) => {
      console.error('💥 Error in toggleReminderMutation:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o lembrete. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  // Remover lembrete
  const removeReminderMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('🗑️ ATTEMPTING TO REMOVE reminder with ID:', id);
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('💥 Error getting user:', userError);
        throw userError;
      }
      
      if (!user) {
        console.error('❌ No authenticated user found');
        throw new Error('Usuário não autenticado');
      }
      
      console.log('👤 Authenticated user ID:', user.id);
      console.log('🎯 Attempting to delete reminder with ID:', id);
      
      const { data, error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)
        .select();

      if (error) {
        console.error('💥 Error removing reminder:', error);
        throw error;
      }
      
      console.log('✅ Remove successful, deleted data:', data);
      
      if (!data || data.length === 0) {
        console.warn('⚠️ No rows were deleted - reminder may not exist or belong to another user');
        throw new Error('Lembrete não encontrado ou não pertence ao usuário');
      }
      
      return data;
    },
    onSuccess: (data) => {
      console.log('🎉 Successfully removed reminder, invalidating queries...');
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      toast({
        title: "Lembrete removido",
        description: "Seu lembrete foi removido com sucesso!",
      });
    },
    onError: (error) => {
      console.error('💥 Error in removeReminderMutation:', error);
      toast({
        title: "Erro",
        description: `Não foi possível remover o lembrete: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const addReminder = () => {
    if (newReminder.trim()) {
      addReminderMutation.mutate(newReminder);
    }
  };

  const toggleReminder = (id: string, currentCompleted: boolean) => {
    console.log('🔄 toggleReminder called for ID:', id, 'current:', currentCompleted);
    toggleReminderMutation.mutate({ id, completed: !currentCompleted });
  };

  const removeReminder = (id: string) => {
    console.log('🗑️ removeReminder button clicked for ID:', id);
    removeReminderMutation.mutate(id);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addReminder();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewReminder("");
    }
  };

  // Lembretes padrão apenas quando não há lembretes do usuário
  const defaultReminders = [
    { id: "default-1", text: "Baixar o app da Central Caverna", completed: false, createdAt: new Date() },
    { id: "default-2", text: "Pagar Internet", completed: false, createdAt: new Date() },
    { id: "default-3", text: "Responder Emails Pendentes", completed: false, createdAt: new Date() },
  ];

  // CORREÇÃO: Usar apenas lembretes do usuário se existirem, senão mostrar padrões
  const hasUserReminders = reminders.length > 0;
  const displayReminders = hasUserReminders ? reminders : defaultReminders;

  console.log('📊 Component render state:', {
    hasUserReminders,
    remindersCount: reminders.length,
    displayRemindersCount: displayReminders.length,
    isLoading,
    displayedReminders: displayReminders.map(r => ({ id: r.id, text: r.text }))
  });

  return (
    <Card className={`p-6 bg-secondary border-0 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold flex items-center gap-2">
            <Check className="h-5 w-5 text-primary" />
            Não Esquecer
          </h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsAdding(true)}
            disabled={isAdding || addReminderMutation.isPending}
          >
            <Plus className="h-4 w-4 mr-1" />
            Novo
          </Button>
        </div>

        <div className="space-y-2">
          {/* Formulário para novo lembrete */}
          {isAdding && (
            <div className="flex gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <Input
                placeholder="Digite seu lembrete..."
                value={newReminder}
                onChange={(e) => setNewReminder(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-background border-0"
                autoFocus
                disabled={addReminderMutation.isPending}
              />
              <Button 
                onClick={addReminder} 
                size="sm"
                disabled={addReminderMutation.isPending}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => {
                  setIsAdding(false);
                  setNewReminder("");
                }} 
                variant="outline" 
                size="sm"
                disabled={addReminderMutation.isPending}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Lista de lembretes */}
          {isLoading ? (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">Carregando lembretes...</p>
            </div>
          ) : (
            displayReminders.map((reminder, index) => {
              // CORREÇÃO: Se há lembretes do usuário, todos são editáveis. Se não há, nenhum é editável.
              const isUserReminder = hasUserReminders;
              
              console.log('🔍 Rendering reminder:', {
                id: reminder.id,
                text: reminder.text,
                isUserReminder,
                hasUserReminders,
                index
              });
              
              return (
                <div 
                  key={reminder.id} 
                  className={`flex items-center gap-2 p-3 rounded-lg transition-colors group ${
                    index === 0 && !reminder.completed 
                      ? 'bg-accent/30 border border-accent/50' 
                      : 'hover:bg-accent/20'
                  } ${reminder.completed ? 'opacity-60' : ''}`}
                >
                  <Checkbox
                    checked={reminder.completed}
                    onCheckedChange={(checked) => {
                      console.log('☑️ Checkbox clicked:', {
                        id: reminder.id,
                        checked,
                        isUserReminder
                      });
                      
                      // Só permite alteração se for lembrete do usuário
                      if (isUserReminder) {
                        toggleReminder(reminder.id, reminder.completed);
                      }
                    }}
                    className="rounded border-primary"
                    disabled={toggleReminderMutation.isPending || !isUserReminder}
                  />
                  <span className={`text-sm flex-1 ${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {reminder.text}
                  </span>
                  {/* Botão de remover - só aparece para lembretes do usuário */}
                  {isUserReminder && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🗑️ Delete button clicked for reminder:', {
                          id: reminder.id,
                          text: reminder.text,
                          isUserReminder
                        });
                        removeReminder(reminder.id);
                      }}
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      disabled={removeReminderMutation.isPending}
                      title={`Remover: ${reminder.text}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              );
            })
          )}

          {!isLoading && displayReminders.length === 0 && (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground">
                Nenhum lembrete encontrado
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Clique em "Novo" para adicionar
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
