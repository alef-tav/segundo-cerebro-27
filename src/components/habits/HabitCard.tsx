
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { X, Zap } from "lucide-react";

interface HabitCardProps {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const HabitCard = ({ id, name, streak, completed, onToggle, onDelete }: HabitCardProps) => {
  return (
    <Card className="p-4 bg-secondary/50 border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={completed}
            onCheckedChange={() => onToggle(id)}
            className="h-5 w-5"
          />
          <span className={`font-medium ${completed ? 'line-through text-muted-foreground' : ''}`}>
            {name}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-orange-400">
            <Zap className="h-4 w-4" />
            <span className="font-semibold">{streak}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
