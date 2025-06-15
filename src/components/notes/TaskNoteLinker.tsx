
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link2, Unlink } from "lucide-react";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  linkedNotes?: string[];
}

interface Note {
  id: string;
  title: string;
  linkedTasks?: string[];
}

interface TaskNoteLinkProps {
  tasks: Task[];
  notes: Note[];
  onLinkTaskToNote: (taskId: string, noteId: string) => void;
  onUnlinkTaskFromNote: (taskId: string, noteId: string) => void;
}

export function TaskNoteLinker({ tasks, notes, onLinkTaskToNote, onUnlinkTaskFromNote }: TaskNoteLinkProps) {
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [selectedNote, setSelectedNote] = useState<string>("");

  const handleLink = () => {
    if (selectedTask && selectedNote) {
      onLinkTaskToNote(selectedTask, selectedNote);
      setSelectedTask("");
      setSelectedNote("");
    }
  };

  const getLinkedNotesForTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || !task.linkedNotes) return [];
    return notes.filter(note => task.linkedNotes!.includes(note.id));
  };

  return (
    <Card className="p-4 bg-accent/30 border-accent/50">
      <div className="flex items-center gap-2 mb-4">
        <Link2 className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Vincular Tarefa à Nota</h3>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select value={selectedTask} onValueChange={setSelectedTask}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar Tarefa" />
            </SelectTrigger>
            <SelectContent>
              {tasks.map((task) => (
                <SelectItem key={task.id} value={task.id}>
                  {task.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedNote} onValueChange={setSelectedNote}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar Nota" />
            </SelectTrigger>
            <SelectContent>
              {notes.map((note) => (
                <SelectItem key={note.id} value={note.id}>
                  {note.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleLink} 
          disabled={!selectedTask || !selectedNote}
          className="w-full"
        >
          <Link2 className="h-4 w-4 mr-2" />
          Vincular
        </Button>
      </div>

      {/* Mostrar vinculações existentes */}
      {tasks.some(task => task.linkedNotes && task.linkedNotes.length > 0) && (
        <div className="mt-6">
          <h4 className="font-medium text-sm mb-3">Vinculações Existentes</h4>
          <div className="space-y-2">
            {tasks.filter(task => task.linkedNotes && task.linkedNotes.length > 0).map((task) => {
              const linkedNotes = getLinkedNotesForTask(task.id);
              return (
                <div key={task.id} className="p-3 bg-background rounded-lg border">
                  <div className="font-medium text-sm mb-2">{task.text}</div>
                  <div className="space-y-1">
                    {linkedNotes.map((note) => (
                      <div key={note.id} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">→ {note.title}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUnlinkTaskFromNote(task.id, note.id)}
                          className="h-6 w-6 p-0"
                        >
                          <Unlink className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
