
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Link2, Unlink, Eye, Edit3, Save, X } from "lucide-react";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  linkedNotes?: string[];
}

interface Note {
  id: string;
  title: string;
  content: string;
  links: string[];
  linkedTasks?: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface TaskNoteLinkProps {
  tasks: Task[];
  notes: Note[];
  onLinkTaskToNote: (taskId: string, noteId: string) => void;
  onUnlinkTaskFromNote: (taskId: string, noteId: string) => void;
  onUpdateTask: (taskId: string, newText: string) => void;
  onUpdateNote: (noteId: string, title: string, content: string, links: string[]) => void;
}

export function TaskNoteLinker({ 
  tasks, 
  notes, 
  onLinkTaskToNote, 
  onUnlinkTaskFromNote,
  onUpdateTask,
  onUpdateNote
}: TaskNoteLinkProps) {
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="p-0 h-auto text-left justify-start hover:bg-accent/20"
                            >
                              <span className="text-muted-foreground cursor-pointer hover:text-primary">
                                → {note.title}
                              </span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Eye className="h-5 w-5" />
                                Visualizar Vinculação
                              </DialogTitle>
                            </DialogHeader>
                            <LinkDetailsModal 
                              task={task}
                              note={note}
                              onUpdateTask={onUpdateTask}
                              onUpdateNote={onUpdateNote}
                              onUnlink={() => onUnlinkTaskFromNote(task.id, note.id)}
                            />
                          </DialogContent>
                        </Dialog>
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

interface LinkDetailsModalProps {
  task: Task;
  note: Note;
  onUpdateTask: (taskId: string, newText: string) => void;
  onUpdateNote: (noteId: string, title: string, content: string, links: string[]) => void;
  onUnlink: () => void;
}

function LinkDetailsModal({ task, note, onUpdateTask, onUpdateNote, onUnlink }: LinkDetailsModalProps) {
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [taskText, setTaskText] = useState(task.text);
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);
  const [noteLinks, setNoteLinks] = useState<string[]>(note.links.length ? note.links : [""]);

  const handleSaveTask = () => {
    onUpdateTask(task.id, taskText);
    setIsEditingTask(false);
  };

  const handleSaveNote = () => {
    onUpdateNote(note.id, noteTitle, noteContent, noteLinks.filter(link => link.trim() !== ""));
    setIsEditingNote(false);
  };

  const addLinkField = () => {
    setNoteLinks([...noteLinks, ""]);
  };

  const updateLinkField = (index: number, value: string) => {
    const updatedLinks = [...noteLinks];
    updatedLinks[index] = value;
    setNoteLinks(updatedLinks);
  };

  const removeLinkField = (index: number) => {
    const updatedLinks = noteLinks.filter((_, i) => i !== index);
    setNoteLinks(updatedLinks);
  };

  const openLink = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank');
    } else {
      window.open(`https://${url}`, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Seção da Tarefa */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Tarefa</h3>
          <div className="flex gap-2">
            {!isEditingTask ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditingTask(true)}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Editar
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSaveTask}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setIsEditingTask(false);
                    setTaskText(task.text);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3 mb-2">
          <Checkbox checked={task.completed} disabled />
          {isEditingTask ? (
            <Input
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="flex-1"
            />
          ) : (
            <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.text}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Status: {task.completed ? 'Concluída' : 'Pendente'}
        </p>
      </div>

      {/* Seção da Nota */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Nota</h3>
          <div className="flex gap-2">
            {!isEditingNote ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditingNote(true)}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Editar
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSaveNote}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setIsEditingNote(false);
                    setNoteTitle(note.title);
                    setNoteContent(note.content);
                    setNoteLinks(note.links.length ? note.links : [""]);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {isEditingNote ? (
            <Input
              placeholder="Título da nota"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
          ) : (
            <h4 className="font-medium text-lg">{note.title}</h4>
          )}

          {isEditingNote ? (
            <Textarea
              placeholder="Conteúdo da nota"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="min-h-[100px]"
            />
          ) : (
            <p className="text-sm whitespace-pre-wrap">{note.content}</p>
          )}

          {/* Links */}
          <div>
            <h5 className="font-medium text-sm mb-2">Links</h5>
            {isEditingNote ? (
              <div className="space-y-2">
                {noteLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="https://exemplo.com"
                      value={link}
                      onChange={(e) => updateLinkField(index, e.target.value)}
                    />
                    {noteLinks.length > 1 && (
                      <Button
                        onClick={() => removeLinkField(index)}
                        size="icon"
                        variant="ghost"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button onClick={addLinkField} variant="outline" size="sm">
                  Adicionar Link
                </Button>
              </div>
            ) : (
              <div className="space-y-1">
                {note.links.length > 0 ? (
                  note.links.map((link, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => openLink(link)}
                      className="mr-2 mb-1"
                    >
                      {link.length > 30 ? `${link.substring(0, 30)}...` : link}
                    </Button>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhum link adicionado</p>
                )}
              </div>
            )}
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Criado em: {note.createdAt.toLocaleDateString('pt-BR')}</p>
            {note.updatedAt.getTime() !== note.createdAt.getTime() && (
              <p>Editado em: {note.updatedAt.toLocaleDateString('pt-BR')}</p>
            )}
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button 
          variant="destructive" 
          onClick={onUnlink}
          className="flex items-center gap-2"
        >
          <Unlink className="h-4 w-4" />
          Desvincular
        </Button>
      </div>
    </div>
  );
}
