import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, Calendar, DollarSign, Dumbbell, Coffee } from "lucide-react";
import { AIChatbot } from "@/components/AIChatbot";

const Index = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR');
  
  return (
    <div className="space-y-6 animate-in">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-2xl font-bold">Resumo do seu dia - {currentDate}</h1>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Chatbot IA */}
        <Card className="p-6 bg-secondary col-span-1 lg:col-span-3">
          <AIChatbot />
        </Card>

        {/* Checklist Diário */}
        <Card className="p-6 bg-secondary col-span-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Não Esquecer
              </h2>
              <Button variant="outline" size="sm">Novo</Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded bg-accent/50">
                <input type="checkbox" className="rounded border-primary" />
                <span>Baixar o app da Central Caverna</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded">
                <input type="checkbox" className="rounded border-primary" />
                <span>Pagar Internet</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded">
                <input type="checkbox" className="rounded border-primary" />
                <span>Responder Emails Pendentes</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Rotina */}
        <Card className="p-6 bg-secondary col-span-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Rotina
              </h2>
              <Button variant="outline" size="sm">Novo</Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between p-2 rounded bg-accent/50">
                <span>06:00 às 07:00</span>
                <span>Ritual matinal</span>
              </div>
              <div className="flex justify-between p-2 rounded">
                <span>07:00 às 08:00</span>
                <span>Café da manhã</span>
              </div>
              <div className="flex justify-between p-2 rounded">
                <span>09:00 às 11:58</span>
                <span>Escritório</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Financeiro */}
        <Card className="p-6 bg-secondary col-span-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Financeiro (Hoje)
              </h2>
              <Button variant="outline" size="sm">Ver seção</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm text-muted-foreground">A receber</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Freela</span>
                    <span>R$ 750,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saque Corretora</span>
                    <span>R$ 963,61</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm text-muted-foreground">A pagar</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Conta de Luz</span>
                    <span>R$ 328,46</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Internet</span>
                    <span>R$ 87,90</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Treinos */}
        <Card className="p-6 bg-secondary col-span-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-primary" />
                Treinos
              </h2>
              <Button variant="outline" size="sm">Ver seção</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded bg-accent/50">
                <h3 className="font-semibold mb-2">Treino 1</h3>
                <p className="text-sm text-muted-foreground">06:00 às 07:00</p>
                <p>Bike</p>
              </div>
              <div className="p-4 rounded bg-accent/50">
                <h3 className="font-semibold mb-2">Treino 2</h3>
                <p className="text-sm text-muted-foreground">20:00 às 21:00</p>
                <p>Musculação</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Refeições */}
        <Card className="p-6 bg-secondary col-span-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Coffee className="h-5 w-5 text-primary" />
                Refeições
              </h2>
              <Button variant="outline" size="sm">Ver seção</Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between p-2 rounded bg-accent/50">
                <span>07:00</span>
                <span>Café da manhã</span>
              </div>
              <div className="flex justify-between p-2 rounded">
                <span>10:00</span>
                <span>Lanche das 10</span>
              </div>
              <div className="flex justify-between p-2 rounded">
                <span>12:00</span>
                <span>Almoço</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Compromissos */}
        <Card className="p-6 bg-secondary col-span-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Compromissos
              </h2>
              <Button variant="outline" size="sm">Ver seção</Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between p-2 rounded bg-accent/50">
                <span>09:00 às 09:30</span>
                <span>Alinhamento com o time</span>
              </div>
              <div className="flex justify-between p-2 rounded">
                <span>10:00 às 10:30</span>
                <span>Call com alunos</span>
              </div>
              <div className="flex justify-between p-2 rounded">
                <span>11:00 às 11:30</span>
                <span>Treinar novos colaboradores</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;