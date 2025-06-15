
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Plus, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

  // Buscar lembretes do usuário
  const { data: reminders = [], isLoading } = useQuery({
    queryKey: ['reminders'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map((reminder: any) => ({
        id: reminder.id,
        text: reminder.text,
        completed: reminder.completed,
        createdAt: new Date(reminder.created_at)
      }));
    }
  });

  // Adicionar lembrete
  const addReminderMutation = useMutation({
    mutationFn: async (text: string) => {
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

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      setNewReminder("");
      setIsAdding(false);
    }
  });

  // Marcar lembrete como concluído/não concluído
  const toggleReminderMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const { error } = await supabase
        .from('reminders')
        .update({ completed })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    }
  });

  // Remover lembrete
  const removeReminderMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    }
  });

  const addReminder = () => {
    if (newReminder.trim()) {
      addReminderMutation.mutate(newReminder);
    }
  };

  const toggleReminder = (id: string, completed: boolean) => {
    toggleReminderMutation.mutate({ id, completed: !completed });
  };

  const removeReminder = (id: string) => {
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

  // Se não estiver autenticado, mostrar lembretes padrão
  const defaultReminders = [
    { id: "1", text: "Baixar o app da Central Caverna", completed: false, createdAt: new Date() },
    { id: "2", text: "Pagar Internet", completed: false, createdAt: new Date() },
    { id: "3", text: "Responder Emails Pendentes", completed: false, createdAt: new Date() },
  ];

  const displayReminders = reminders.length > 0 ? reminders : defaultReminders;

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
            displayReminders.map((reminder, index) => (
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
                  onCheckedChange={() => toggleReminder(reminder.id, reminder.completed)}
                  className="rounded border-primary"
                  disabled={toggleReminderMutation.isPending}
                />
                <span className={`text-sm flex-1 ${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {reminder.text}
                </span>
                {reminders.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeReminder(reminder.id)}
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                    disabled={removeReminderMutation.isPending}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))
          )}

          {!isLoading && reminders.length === 0 && !isAdding && (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground">
                Nenhum lembrete adicionado
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
