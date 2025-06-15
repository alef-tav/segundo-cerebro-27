
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle } from "lucide-react";

export function ProductivityTracker() {
  // Dados fictícios - em uma aplicação real, viriam do estado/contexto
  const focusTimeToday = 225; // minutos
  const focusGoal = 300; // 5 horas
  const tasksCompleted = 6;
  const totalTasks = 10;

  const focusProgress = (focusTimeToday / focusGoal) * 100;
  const taskProgress = (tasksCompleted / totalTasks) * 100;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card className="p-6 bg-secondary border-0">
      <h2 className="font-display text-xl font-semibold mb-6">Acompanhamento de Produtividade</h2>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">Tempo de Foco Hoje</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {formatTime(focusTimeToday)} / {formatTime(focusGoal)}
            </span>
          </div>
          <Progress value={focusProgress} className="h-2" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Tarefas Concluídas</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {tasksCompleted} / {totalTasks}
            </span>
          </div>
          <Progress value={taskProgress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">4</div>
            <div className="text-sm text-muted-foreground">Pomodoros Hoje</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">85%</div>
            <div className="text-sm text-muted-foreground">Eficiência</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
