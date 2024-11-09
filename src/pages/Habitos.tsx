import { Card } from "@/components/ui/card";
import { Brain } from "lucide-react";

const Habitos = () => {
  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Hábitos</h1>
        <p className="text-muted-foreground">
          Desenvolva e mantenha hábitos saudáveis.
        </p>
      </div>
      <Card className="p-6 bg-secondary">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-display text-xl font-semibold">Meus Hábitos</h2>
        </div>
        <p className="text-muted-foreground">
          Crie e acompanhe seus hábitos diários.
        </p>
      </Card>
    </div>
  );
};

export default Habitos;