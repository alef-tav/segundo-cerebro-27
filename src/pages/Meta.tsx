import { Card } from "@/components/ui/card";
import { Target } from "lucide-react";

const Meta = () => {
  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Metas</h1>
        <p className="text-muted-foreground">
          Defina e acompanhe suas metas pessoais e profissionais.
        </p>
      </div>
      <Card className="p-6 bg-secondary">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-display text-xl font-semibold">Metas Anuais</h2>
        </div>
        <p className="text-muted-foreground">
          Adicione suas metas para o ano e acompanhe seu progresso.
        </p>
      </Card>
    </div>
  );
};

export default Meta;