
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit3 } from "lucide-react";

interface EditMetricDialogProps {
  title: string;
  value: number;
  unit: string;
  goal: number;
  onSave: (value: number, goal: number) => void;
  icon: React.ReactNode;
}

export const EditMetricDialog = ({ title, value, unit, goal, onSave, icon }: EditMetricDialogProps) => {
  const [open, setOpen] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const [newGoal, setNewGoal] = useState(goal);

  const handleSave = () => {
    onSave(newValue, newGoal);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-60 hover:opacity-100"
        >
          <Edit3 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {icon}
            Editar {title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="value" className="text-right">
              Atual
            </Label>
            <Input
              id="value"
              type="number"
              value={newValue}
              onChange={(e) => setNewValue(Number(e.target.value))}
              className="col-span-3"
              step="0.1"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="goal" className="text-right">
              Meta
            </Label>
            <Input
              id="goal"
              type="number"
              value={newGoal}
              onChange={(e) => setNewGoal(Number(e.target.value))}
              className="col-span-3"
              step="0.1"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Unidade: {unit}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
