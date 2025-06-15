
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, X, Edit3, Link, ExternalLink } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  links: string[];
  linkedTasks: string[];
  createdAt: Date;
  updatedAt: Date;
}

export function NotesBlock() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newLinks, setNewLinks] = useState<string[]>([""]);

  const addLinkField = () => {
    setNewLinks([...newLinks, ""]);
  };

  const updateLinkField = (index: number, value: string) => {
    const updatedLinks = [...newLinks];
    updatedLinks[index] = value;
    setNewLinks(updatedLinks);
  };

  const removeLinkField = (index: number) => {
    const updatedLinks = newLinks.filter((_, i) => i !== index);
    setNewLinks(updatedLinks);
  };

  const createNote = () => {
    if (newTitle.trim() || newContent.trim()) {
      const validLinks = newLinks.filter(link => link.trim() !== "");
      const note: Note = {
        id: Date.now().toString(),
        title: newTitle.trim() || "Nota sem título",
        content: newContent.trim(),
        links: validLinks,
        linkedTasks: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setNotes([note, ...notes]);
      setNewTitle("");
      setNewContent("");
      setNewLinks([""]);
      setIsCreating(false);
    }
  };

  const updateNote = (id: string, title: string, content: string, links: string[]) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, title, content, links, updatedAt: new Date() }
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
    setNewLinks([""]);
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
              
              {/* Campo de Links */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Link className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Links</span>
                  <Button 
                    onClick={addLinkField} 
                    size="sm" 
                    variant="outline"
                    className="h-6"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                {newLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="https://exemplo.com"
                      value={link}
                      onChange={(e) => updateLinkField(index, e.target.value)}
                      className="bg-background border-0"
                    />
                    {newLinks.length > 1 && (
                      <Button
                        onClick={() => removeLinkField(index)}
                        size="icon"
                        variant="ghost"
                        className="h-10 w-10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

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
            onSave={(title, content, links) => updateNote(note.id, title, content, links)}
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
  onSave: (title: string, content: string, links: string[]) => void;
  onCancel: () => void;
  onDelete: () => void;
}

function NoteCard({ note, isEditing, onEdit, onSave, onCancel, onDelete }: NoteCardProps) {
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editLinks, setEditLinks] = useState<string[]>(note.links.length > 0 ? note.links : [""]);

  const addLinkField = () => {
    setEditLinks([...editLinks, ""]);
  };

  const updateLinkField = (index: number, value: string) => {
    const updatedLinks = [...editLinks];
    updatedLinks[index] = value;
    setEditLinks(updatedLinks);
  };

  const removeLinkField = (index: number) => {
    const updatedLinks = editLinks.filter((_, i) => i !== index);
    setEditLinks(updatedLinks);
  };

  const handleSave = () => {
    const validLinks = editLinks.filter(link => link.trim() !== "");
    onSave(editTitle, editContent, validLinks);
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditLinks(note.links.length > 0 ? note.links : [""]);
    onCancel();
  };

  const openLink = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank');
    } else {
      window.open(`https://${url}`, '_blank');
    }
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
          
          {/* Campo de Links na edição */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Link className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Links</span>
              <Button 
                onClick={addLinkField} 
                size="sm" 
                variant="outline"
                className="h-6"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            {editLinks.map((link, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="https://exemplo.com"
                  value={link}
                  onChange={(e) => updateLinkField(index, e.target.value)}
                  className="bg-background border-0"
                />
                {editLinks.length > 1 && (
                  <Button
                    onClick={() => removeLinkField(index)}
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

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
      
      {/* Exibir Links */}
      {note.links.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Link className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Links</span>
          </div>
          <div className="space-y-1">
            {note.links.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => openLink(link)}
                className="flex items-center gap-2 h-8 text-xs"
              >
                <ExternalLink className="h-3 w-3" />
                {link.length > 30 ? `${link.substring(0, 30)}...` : link}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>Criado em {note.createdAt.toLocaleDateString('pt-BR')}</span>
        {note.updatedAt.getTime() !== note.createdAt.getTime() && (
          <span>Editado em {note.updatedAt.toLocaleDateString('pt-BR')}</span>
        )}
      </div>
    </Card>
  );
}
