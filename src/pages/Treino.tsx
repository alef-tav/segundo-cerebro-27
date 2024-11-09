import { Card } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";

const Treino = () => {
  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Treino e Alimentação</h1>
        <p className="text-muted-foreground">
          Gerencie seus treinos e plano alimentar.
        </p>
      </div>
      <Card className="p-6 bg-secondary">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Dumbbell className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-display text-xl font-semibold">Meus Treinos</h2>
        </div>
        <p className="text-muted-foreground">
          Acompanhe seus treinos e evolução física.
        </p>
      </Card>
    </div>
  );
};

export default Treino;