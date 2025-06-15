
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, X, Edit3 } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export function NotesBlock() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const createNote = () => {
    if (newTitle.trim() || newContent.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newTitle.trim() || "Nota sem título",
        content: newContent.trim(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setNotes([note, ...notes]);
      setNewTitle("");
      setNewContent("");
      setIsCreating(false);
    }
  };

  const updateNote = (id: string, title: string, content: string) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, title, content, updatedAt: new Date() }
        : note
    ));
    setEditingId(null);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const cancelEdit = () => {
    setIsCreating(false);
    setEditingId(null);
    setNewTitle("");
    setNewContent("");
  };

  return (
    <Card className="p-6 bg-secondary border-0">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Pencil className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">Minhas Notas</h2>
            <p className="text-sm text-muted-foreground">
              {notes.length} {notes.length === 1 ? 'nota' : 'notas'}
            </p>
          </div>
        </div>
        <Button 
          onClick={() => setIsCreating(true)} 
          className="flex items-center gap-2"
          disabled={isCreating}
        >
          <Plus className="h-4 w-4" />
          Nova Nota
        </Button>
      </div>

      <div className="space-y-4">
        {/* Formulário de nova nota */}
        {isCreating && (
          <Card className="p-4 border-2 border-primary/20">
            <div className="space-y-3">
              <Input
                placeholder="Título da nota"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-background border-0"
              />
              <Textarea
                placeholder="Escreva sua nota aqui..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="bg-background border-0 min-h-[100px]"
              />
              <div className="flex gap-2">
                <Button onClick={createNote} size="sm">
                  Salvar
                </Button>
                <Button onClick={cancelEdit} variant="outline" size="sm">
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Lista de notas */}
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            isEditing={editingId === note.id}
            onEdit={() => setEditingId(note.id)}
            onSave={(title, content) => updateNote(note.id, title, content)}
            onCancel={() => setEditingId(null)}
            onDelete={() => deleteNote(note.id)}
          />
        ))}

        {notes.length === 0 && !isCreating && (
          <div className="text-center py-12">
            <Pencil className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
              Nenhuma nota criada ainda
            </p>
            <p className="text-sm text-muted-foreground">
              Clique em "Nova Nota" para começar
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

interface NoteCardProps {
  note: Note;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (title: string, content: string) => void;
  onCancel: () => void;
  onDelete: () => void;
}

function NoteCard({ note, isEditing, onEdit, onSave, onCancel, onDelete }: NoteCardProps) {
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  const handleSave = () => {
    onSave(editTitle, editContent);
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    onCancel();
  };

  if (isEditing) {
    return (
      <Card className="p-4 border-2 border-primary/20">
        <div className="space-y-3">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="bg-background border-0"
          />
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="bg-background border-0 min-h-[100px]"
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">
              Salvar
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm">
              Cancelar
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 hover:bg-accent/20 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-lg">{note.title}</h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8">
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8 text-destructive hover:text-destructive">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap">
        {note.content}
      </p>
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>Criado em {note.createdAt.toLocaleDateString('pt-BR')}</span>
        {note.updatedAt.getTime() !== note.createdAt.getTime() && (
          <span>Editado em {note.updatedAt.toLocaleDateString('pt-BR')}</span>
        )}
      </div>
    </Card>
  );
}
