
import { useState } from "react";
import { FullTaskList } from "@/components/notes/FullTaskList";
import { NotesBlock } from "@/components/notes/NotesBlock";
import { TaskNoteLinker } from "@/components/notes/TaskNoteLinker";

const Anotacoes = () => {
  // Estados compartilhados para gerenciar vinculações
  const [tasks, setTasks] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);

  const handleLinkTaskToNote = (taskId: string, noteId: string) => {
    // Adicionar noteId à lista de notas vinculadas da tarefa
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, linkedNotes: [...(task.linkedNotes || []), noteId] }
          : task
      )
    );

    // Adicionar taskId à lista de tarefas vinculadas da nota
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? { ...note, linkedTasks: [...(note.linkedTasks || []), taskId] }
          : note
      )
    );
  };

  const handleUnlinkTaskFromNote = (taskId: string, noteId: string) => {
    // Remover noteId da lista de notas vinculadas da tarefa
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, linkedNotes: (task.linkedNotes || []).filter((id: string) => id !== noteId) }
          : task
      )
    );

    // Remover taskId da lista de tarefas vinculadas da nota
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? { ...note, linkedTasks: (note.linkedTasks || []).filter((id: string) => id !== taskId) }
          : note
      )
    );
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Anotações</h1>
        <p className="text-muted-foreground">
          Registre suas ideias, informações importantes e gerencie suas tarefas. Vincule tarefas às suas notas para manter tudo organizado.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Lista de Tarefas Completa */}
        <FullTaskList />
        
        {/* Bloco de Notas */}
        <NotesBlock />
      </div>

      {/* Sistema de Vinculação entre Tarefas e Notas */}
      <div className="mt-8">
        <TaskNoteLinker 
          tasks={tasks}
          notes={notes}
          onLinkTaskToNote={handleLinkTaskToNote}
          onUnlinkTaskFromNote={handleUnlinkTaskFromNote}
        />
      </div>
    </div>
  );
};

export default Anotacoes;
