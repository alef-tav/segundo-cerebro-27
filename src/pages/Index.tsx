import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, MessageSquare, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Bem-vindo ao seu Segundo Cérebro</h1>
        <p className="text-muted-foreground">
          Organize seus pensamentos, aumente sua produtividade e alcance seus objetivos.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 space-y-4 bg-secondary">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-xl font-semibold">Organize</h2>
          </div>
          <p className="text-muted-foreground">
            Centralize suas ideias, tarefas e objetivos em um só lugar.
          </p>
        </Card>

        <Card className="p-6 space-y-4 bg-secondary">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-xl font-semibold">IA Assistant</h2>
          </div>
          <p className="text-muted-foreground">
            Use nosso assistente Claude 3.5 para aumentar sua produtividade.
          </p>
          <Button variant="outline" className="w-full">
            Conversar com IA
          </Button>
        </Card>

        <Card className="p-6 space-y-4 bg-secondary">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-xl font-semibold">Produtividade</h2>
          </div>
          <p className="text-muted-foreground">
            Ferramentas e recursos para maximizar seu potencial.
          </p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 bg-secondary">
          <h3 className="font-display text-lg font-semibold mb-4">Resumo do Dia</h3>
          <p className="text-muted-foreground">
            Você ainda não configurou seu resumo diário. Comece agora!
          </p>
        </Card>

        <Card className="p-6 bg-secondary">
          <h3 className="font-display text-lg font-semibold mb-4">Próximos Compromissos</h3>
          <p className="text-muted-foreground">
            Nenhum compromisso agendado para hoje.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Index;