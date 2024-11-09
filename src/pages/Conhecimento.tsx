import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const Conhecimento = () => {
  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Conhecimento</h1>
        <p className="text-muted-foreground">
          Organize seus estudos e aprendizados.
        </p>
      </div>
      <Card className="p-6 bg-secondary">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-display text-xl font-semibold">Biblioteca</h2>
        </div>
        <p className="text-muted-foreground">
          Gerencie seus livros, cursos e materiais de estudo.
        </p>
      </Card>
    </div>
  );
};

export default Conhecimento;