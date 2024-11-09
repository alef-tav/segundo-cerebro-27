import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const Compromissos = () => {
  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Compromissos</h1>
        <p className="text-muted-foreground">
          Gerencie sua agenda e compromissos.
        </p>
      </div>
      <Card className="p-6 bg-secondary">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-display text-xl font-semibold">Calendário</h2>
        </div>
        <p className="text-muted-foreground">
          Visualize e organize seus compromissos.
        </p>
      </Card>
    </div>
  );
};

export default Compromissos;