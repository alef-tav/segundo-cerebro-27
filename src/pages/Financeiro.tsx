import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const Financeiro = () => {
  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Financeiro</h1>
        <p className="text-muted-foreground">
          Gerencie suas finanças pessoais.
        </p>
      </div>
      <Card className="p-6 bg-secondary">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-display text-xl font-semibold">Orçamento</h2>
        </div>
        <p className="text-muted-foreground">
          Acompanhe suas receitas e despesas mensais.
        </p>
      </Card>
    </div>
  );
};

export default Financeiro;