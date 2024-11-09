import { Card } from "@/components/ui/card";
import { Timer } from "lucide-react";

const Flow = () => {
  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Flow Caverna</h1>
        <p className="text-muted-foreground">
          Mantenha o foco e aumente sua produtividade.
        </p>
      </div>
      <Card className="p-6 bg-secondary">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Timer className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-display text-xl font-semibold">Pomodoro Timer</h2>
        </div>
        <p className="text-muted-foreground">
          Configure seu timer e comece a focar nas suas tarefas.
        </p>
      </Card>
    </div>
  );
};

export default Flow;