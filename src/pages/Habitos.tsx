
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Brain } from "lucide-react";
import { HabitCard } from "@/components/habits/HabitCard";
import { NewHabitDialog } from "@/components/habits/NewHabitDialog";

interface Habit {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
}

const Habitos = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", name: "Meditar", streak: 5, completed: false },
    { id: "2", name: "Ler 30 minutos", streak: 3, completed: false },
    { id: "3", name: "Exercitar-se", streak: 7, completed: true },
  ]);
  const [isNewHabitDialogOpen, setIsNewHabitDialogOpen] = useState(false);

  const completedHabits = habits.filter(habit => habit.completed).length;
  const totalHabits = habits.length;
  const progressPercentage = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

  const handleToggleHabit = (id: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const newCompleted = !habit.completed;
        return {
          ...habit,
          completed: newCompleted,
          streak: newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1)
        };
      }
      return habit;
    }));
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const handleAddHabit = (name: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      streak: 0,
      completed: false,
    };
    setHabits(prev => [...prev, newHabit]);
  };

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
        </div>

        <Button 
          onClick={() => setIsNewHabitDialogOpen(true)}
          size="lg"
          className="bg-white text-black hover:bg-gray-100"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Hábito
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
