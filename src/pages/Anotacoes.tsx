
import { FullTaskList } from "@/components/notes/FullTaskList";
import { NotesBlock } from "@/components/notes/NotesBlock";

const Anotacoes = () => {
  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Anotações</h1>
        <p className="text-muted-foreground">
          Registre suas ideias, informações importantes e gerencie suas tarefas.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Lista de Tarefas Completa */}
        <FullTaskList />
        
        {/* Bloco de Notas */}
        <NotesBlock />
      </div>
    </div>
  );
};

export default Anotacoes;
