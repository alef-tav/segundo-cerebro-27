
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KnowledgeItem } from "./KnowledgeCard";

interface EditKnowledgeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateItem: (item: KnowledgeItem) => void;
  item: KnowledgeItem;
}

export const EditKnowledgeDialog = ({ isOpen, onClose, onUpdateItem, item }: EditKnowledgeDialogProps) => {
  const [title, setTitle] = useState(item.title);
  const [type, setType] = useState<"livro" | "curso" | "artigo">(item.type);
  const [status, setStatus] = useState<"a-fazer" | "em-andamento" | "concluido">(item.status);
  const [description, setDescription] = useState(item.description || "");
  const [url, setUrl] = useState(item.url || "");
  const [email, setEmail] = useState(item.email || "");
  const [password, setPassword] = useState(item.password || "");
  const [pdfFile, setPdfFile] = useState<File | undefined>(item.pdfFile);
  const [imageFile, setImageFile] = useState<File | undefined>(item.imageFile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onUpdateItem({
        ...item,
        title: title.trim(),
        type,
        status,
        description: description.trim() || undefined,
        url: url.trim() || undefined,
        email: email.trim() || undefined,
        password: password.trim() || undefined,
        pdfFile,
        imageFile,
      });
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Item</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Nome do livro, curso ou artigo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select value={type} onValueChange={(value: "livro" | "curso" | "artigo") => setType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="livro">Livro</SelectItem>
                  <SelectItem value="curso">Curso</SelectItem>
                  <SelectItem value="artigo">Artigo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value: "a-fazer" | "em-andamento" | "concluido") => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a-fazer">A Fazer</SelectItem>
                  <SelectItem value="em-andamento">Em Andamento</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição/Notas</Label>
              <Textarea
                id="description"
                placeholder="Adicione suas anotações..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {(type === "curso" || type === "artigo" || type === "livro") && (
              <div className="space-y-2">
                <Label htmlFor="url">Link/URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            )}

            {type === "curso" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email do Curso</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha do Curso</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Senha do curso"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </>
            )}

            {type === "livro" && (
              <div className="space-y-2">
                <Label htmlFor="pdf">Upload PDF</Label>
                <Input
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfChange}
                />
                {pdfFile && (
                  <p className="text-sm text-muted-foreground">
                    Arquivo selecionado: {pdfFile.name}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="image">Imagem (opcional)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imageFile && (
                <p className="text-sm text-muted-foreground">
                  Imagem selecionada: {imageFile.name}
                </p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
