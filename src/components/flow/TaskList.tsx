
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false
      };
      setTasks([...tasks, task]);
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

  return (
    <Card className="p-6 bg-secondary border-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold">Lista de Tarefas</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/anotacoes')}
          className="flex items-center gap-2"
        >
          Ver Mais <ArrowRight className="h-4 w-4" />
        </Button>
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

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhuma tarefa adicionada ainda
          </p>
        ) : (
          tasks.slice(0, 5).map((task) => (
            <div 
              key={task.id} 
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                task.completed 
                  ? 'bg-accent/30 border-accent/50' 
                  : 'hover:bg-accent/20'
              }`}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <span 
                className={`flex-1 text-sm ${
                  task.completed 
                    ? 'line-through text-muted-foreground' 
                    : ''
                }`}
              >
                {task.text}
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
          ))
        )}
        {tasks.length > 5 && (
          <p className="text-sm text-muted-foreground text-center">
            E mais {tasks.length - 5} tarefas...
          </p>
        )}
      </div>
    </Card>
  );
}
