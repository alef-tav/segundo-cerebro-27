import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";

const Anotacoes = () => {
  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Anotações</h1>
        <p className="text-muted-foreground">
          Registre suas ideias e informações importantes.
        </p>
      </div>
      <Card className="p-6 bg-secondary">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Pencil className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-display text-xl font-semibold">Minhas Notas</h2>
        </div>
        <p className="text-muted-foreground">
          Crie e organize suas anotações por categoria.
        </p>
      </Card>
    </div>
  );
};

export default Anotacoes;