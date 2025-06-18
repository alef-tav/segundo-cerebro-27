
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, PlayCircle, FileText, Link, Upload, Trash2, Edit, Mail, Lock } from "lucide-react";
import { KnowledgeItem } from "@/hooks/useKnowledgeItems";

interface KnowledgeCardProps {
  item: KnowledgeItem;
  onDelete: (id: string) => void;
  onEdit: (item: KnowledgeItem) => void;
}

export const KnowledgeCard = ({ item, onDelete, onEdit }: KnowledgeCardProps) => {
  const getIcon = () => {
    switch (item.type) {
      case "livro":
        return <BookOpen className="h-5 w-5" />;
      case "curso":
        return <PlayCircle className="h-5 w-5" />;
      case "artigo":
        return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusColor = () => {
    switch (item.status) {
      case "concluido":
        return "bg-green-500";
      case "em-andamento":
        return "bg-yellow-500";
      case "a-fazer":
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (item.status) {
      case "concluido":
        return "Concluído";
      case "em-andamento":
        return "Em andamento";
      case "a-fazer":
        return "A fazer";
    }
  };

  return (
    <Card className="relative group">
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-600 hover:text-blue-700"
          onClick={() => onEdit(item)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getIcon()}
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </div>
        </div>
        <Badge className={`w-fit text-white ${getStatusColor()}`}>
          {getStatusText()}
        </Badge>
      </CardHeader>
      
      <CardContent>
        {item.description && (
          <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
        )}
        
        <div className="flex flex-wrap gap-2">
          {item.url && (
            <Button variant="outline" size="sm" asChild>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Link className="h-4 w-4 mr-1" />
                Acessar
              </a>
            </Button>
          )}
          
          {item.type === "curso" && item.email && (
            <Button variant="outline" size="sm" className="pointer-events-none">
              <Mail className="h-4 w-4 mr-1" />
              Login Salvo
            </Button>
          )}
          
          {item.type === "curso" && item.password && (
            <Button variant="outline" size="sm" className="pointer-events-none">
              <Lock className="h-4 w-4 mr-1" />
              Senha Salva
            </Button>
          )}
          
          {item.pdf_file_name && (
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-1" />
              PDF Anexado
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
