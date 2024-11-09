import { Card } from "@/components/ui/card";

const Resumo = () => {
  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Resumo do Dia</h1>
        <p className="text-muted-foreground">
          Acompanhe suas atividades diárias e mantenha-se organizado.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 bg-secondary">
          <h3 className="font-display text-lg font-semibold mb-4">Tarefas Pendentes</h3>
          <p className="text-muted-foreground">Nenhuma tarefa pendente para hoje.</p>
        </Card>
        <Card className="p-6 bg-secondary">
          <h3 className="font-display text-lg font-semibold mb-4">Próximos Compromissos</h3>
          <p className="text-muted-foreground">Nenhum compromisso agendado.</p>
        </Card>
      </div>
    </div>
  );
};

export default Resumo;