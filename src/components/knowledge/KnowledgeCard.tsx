
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, PlayCircle, FileText, Link, Upload, Trash2 } from "lucide-react";

export interface KnowledgeItem {
  id: string;
  title: string;
  type: "livro" | "curso" | "artigo";
  status: "a-fazer" | "em-andamento" | "concluido";
  description?: string;
  url?: string;
  password?: string;
  pdfFile?: File;
  imageFile?: File;
  createdAt: Date;
}

interface KnowledgeCardProps {
  item: KnowledgeItem;
  onDelete: (id: string) => void;
}

export const KnowledgeCard = ({ item, onDelete }: KnowledgeCardProps) => {
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
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-destructive hover:text-destructive"
        onClick={() => onDelete(item.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      
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
          
          {item.pdfFile && (
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
