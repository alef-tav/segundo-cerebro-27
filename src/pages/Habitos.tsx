
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Brain } from "lucide-react";
import { HabitCard } from "@/components/habits/HabitCard";
import { NewHabitDialog } from "@/components/habits/NewHabitDialog";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Habit {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
}

const Habitos = () => {
  const [isNewHabitDialogOpen, setIsNewHabitDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  // Buscar hábitos do usuário
  const { data: habits = [], isLoading } = useQuery({
    queryKey: ['habits'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching habits:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
  });

  // Adicionar novo hábito
  const addHabitMutation = useMutation({
    mutationFn: async (name: string) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('habits')
        .insert([
          {
            user_id: user.id,
            name: name.trim(),
            streak: 0,
            completed: false,
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      setIsNewHabitDialogOpen(false);
      toast({
        title: "Hábito adicionado",
        description: "Seu hábito foi criado com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o hábito. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  // Atualizar hábito (completar/descompletar e streak)
  const toggleHabitMutation = useMutation({
    mutationFn: async ({ id, completed, streak }: { id: string; completed: boolean; streak: number }) => {
      const { data, error } = await supabase
        .from('habits')
        .update({ 
          completed,
          streak,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o hábito. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  // Remover hábito
  const deleteHabitMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      toast({
        title: "Hábito removido",
        description: "Seu hábito foi removido com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível remover o hábito. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  const completedHabits = habits.filter(habit => habit.completed).length;
  const totalHabits = habits.length;
  const progressPercentage = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

  const handleToggleHabit = (id: string) => {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const newCompleted = !habit.completed;
    const newStreak = newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1);

    toggleHabitMutation.mutate({
      id,
      completed: newCompleted,
      streak: newStreak
    });
  };

  const handleDeleteHabit = (id: string) => {
    deleteHabitMutation.mutate(id);
  };

  const handleAddHabit = (name: string) => {
    addHabitMutation.mutate(name);
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in">
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-bold">Hábitos</h1>
          <p className="text-muted-foreground">
            Carregando seus hábitos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Hábitos</h1>
        <p className="text-muted-foreground">
          Desenvolva e mantenha hábitos saudáveis.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6 bg-secondary">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-display text-xl font-semibold">Progresso Diário</h2>
            </div>
            
            <div className="space-y-2">
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {progressPercentage}% dos hábitos completados hoje
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              id={habit.id}
              name={habit.name}
              streak={habit.streak}
              completed={habit.completed}
              onToggle={handleToggleHabit}
              onDelete={handleDeleteHabit}
            />
          ))}
          
          {habits.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                Você ainda não possui hábitos cadastrados. Comece criando seu primeiro hábito!
              </p>
            </Card>
          )}
        </div>

        <Button 
          onClick={() => setIsNewHabitDialogOpen(true)}
          size="lg"
          className="bg-white text-black hover:bg-gray-100"
          disabled={addHabitMutation.isPending}
        >
          <Plus className="h-5 w-5 mr-2" />
          {addHabitMutation.isPending ? 'Adicionando...' : 'Novo Hábito'}
        </Button>
      </div>

      <NewHabitDialog
        isOpen={isNewHabitDialogOpen}
        onClose={() => setIsNewHabitDialogOpen(false)}
        onAddHabit={handleAddHabit}
      />
    </div>
  );
};

export default Habitos;
