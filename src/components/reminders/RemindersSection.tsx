
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Plus, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: "1", text: "Baixar o app da Central Caverna", completed: false, createdAt: new Date() },
    { id: "2", text: "Pagar Internet", completed: false, createdAt: new Date() },
    { id: "3", text: "Responder Emails Pendentes", completed: false, createdAt: new Date() },
  ]);
  const [newReminder, setNewReminder] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addReminder = () => {
    if (newReminder.trim()) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        text: newReminder.trim(),
        completed: false,
        createdAt: new Date()
      };
      setReminders([reminder, ...reminders]);
      setNewReminder("");
      setIsAdding(false);
    }
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    ));
  };

  const removeReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addReminder();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewReminder("");
    }
  };

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
            disabled={isAdding}
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
              />
              <Button onClick={addReminder} size="sm">
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => {
                  setIsAdding(false);
                  setNewReminder("");
                }} 
                variant="outline" 
                size="sm"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Lista de lembretes */}
          {reminders.map((reminder, index) => (
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
                onCheckedChange={() => toggleReminder(reminder.id)}
                className="rounded border-primary"
              />
              <span className={`text-sm flex-1 ${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
                {reminder.text}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeReminder(reminder.id)}
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}

          {reminders.length === 0 && !isAdding && (
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
