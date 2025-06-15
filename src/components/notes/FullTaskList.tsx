
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, CheckCircle2 } from "lucide-react";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export function FullTaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTasks([task, ...tasks]);
      setNewTask("");
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <Card className="p-6 bg-secondary border-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <CheckCircle2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">Lista de Tarefas Completa</h2>
          <p className="text-sm text-muted-foreground">
            {pendingTasks.length} pendentes • {completedTasks.length} concluídas
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Adicionar nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-background border-0"
        />
        <Button onClick={addTask} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Tarefas Pendentes */}
        {pendingTasks.length > 0 && (
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
              Pendentes ({pendingTasks.length})
            </h3>
            <div className="space-y-2">
              {pendingTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/20 transition-colors"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  <span className="flex-1 text-sm">
                    {task.text}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {task.createdAt.toLocaleDateString('pt-BR')}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTask(task.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tarefas Concluídas */}
        {completedTasks.length > 0 && (
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
              Concluídas ({completedTasks.length})
            </h3>
            <div className="space-y-2">
              {completedTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-center gap-3 p-3 rounded-lg border bg-accent/30 border-accent/50"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  <span className="flex-1 text-sm line-through text-muted-foreground">
                    {task.text}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {task.createdAt.toLocaleDateString('pt-BR')}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTask(task.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Nenhuma tarefa adicionada ainda
            </p>
            <p className="text-sm text-muted-foreground">
              Comece adicionando sua primeira tarefa acima
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
