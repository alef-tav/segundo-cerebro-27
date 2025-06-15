
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, Calendar, DollarSign, Dumbbell, Coffee, Bot, Search, Bell, User } from "lucide-react";
import { AIChatbot } from "@/components/AIChatbot";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const Index = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR');
  
  return (
    <div className="space-y-6 animate-in">
      {/* Header com barra de pesquisa */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Bem-vindo ao Seu Segundo Cérebro</h1>
          <p className="text-muted-foreground">Organize seu dia e alcance seus objetivos - {currentDate}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Pesquisar..." 
              className="pl-10 w-64 bg-secondary border-0"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Bot className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <AIChatbot />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Cards principais em grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-8">
        {/* Resumo Diário */}
        <Card className="p-6 bg-secondary border-0">
          <h2 className="font-display text-xl font-semibold mb-4 text-primary">Resumo Diário</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-green-400">
              <Check className="h-4 w-4" />
              <span className="text-sm">5 tarefas concluídas</span>
            </div>
            <div className="flex items-center gap-3 text-blue-400">
              <Clock className="h-4 w-4" />
              <span className="text-sm">2 horas de trabalho focado</span>
            </div>
            <div className="flex items-center gap-3 text-red-400">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm">1 marco de meta alcançado</span>
            </div>
          </div>
        </Card>

        {/* Ações Rápidas */}
        <Card className="p-6 bg-secondary border-0">
          <h2 className="font-display text-xl font-semibold mb-4 text-primary">Ações Rápidas</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              Iniciar Pomodoro
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Adicionar Nova Tarefa
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Criar Nota
            </Button>
          </div>
        </Card>

        {/* Próximos Eventos */}
        <Card className="p-6 bg-secondary border-0">
          <h2 className="font-display text-xl font-semibold mb-4 text-primary">Próximos Eventos</h2>
          <div className="space-y-3">
            <div className="text-sm">
              <div className="font-medium">Reunião com a Equipe - 14:00</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">Sessão de Academia - 17:30</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">Ler 30 páginas - 20:00</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Seções detalhadas */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {/* Não Esquecer */}
        <Card className="p-6 bg-secondary border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Não Esquecer
              </h2>
              <Button variant="outline" size="sm">Novo</Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/30 border border-accent/50">
                <input type="checkbox" className="rounded border-primary" />
                <span className="text-sm">Baixar o app da Central Caverna</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-accent/20 transition-colors">
                <input type="checkbox" className="rounded border-primary" />
                <span className="text-sm">Pagar Internet</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-accent/20 transition-colors">
                <input type="checkbox" className="rounded border-primary" />
                <span className="text-sm">Responder Emails Pendentes</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Rotina */}
        <Card className="p-6 bg-secondary border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Rotina
              </h2>
              <Button variant="outline" size="sm">Novo</Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between p-3 rounded-lg bg-accent/30 border border-accent/50">
                <span className="text-sm font-medium">06:00 às 07:00</span>
                <span className="text-sm">Ritual matinal</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg hover:bg-accent/20 transition-colors">
                <span className="text-sm font-medium">07:00 às 08:00</span>
                <span className="text-sm">Café da manhã</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg hover:bg-accent/20 transition-colors">
                <span className="text-sm font-medium">09:00 às 11:58</span>
                <span className="text-sm">Escritório</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Financeiro */}
        <Card className="p-6 bg-secondary border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Financeiro (Hoje)
              </h2>
              <Button variant="outline" size="sm">Ver seção</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-green-400">A receber</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Freela</span>
                    <span className="font-medium">R$ 750,00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Saque Corretora</span>
                    <span className="font-medium">R$ 963,61</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-red-400">A pagar</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Conta de Luz</span>
                    <span className="font-medium">R$ 328,46</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Internet</span>
                    <span className="font-medium">R$ 87,90</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Treinos */}
        <Card className="p-6 bg-secondary border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-primary" />
                Treinos
              </h2>
              <Button variant="outline" size="sm">Ver seção</Button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 rounded-lg bg-accent/30 border border-accent/50">
                <h3 className="font-semibold mb-1">Treino 1</h3>
                <p className="text-xs text-muted-foreground mb-1">06:00 às 07:00</p>
                <p className="text-sm">Bike</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/30 border border-accent/50">
                <h3 className="font-semibold mb-1">Treino 2</h3>
                <p className="text-xs text-muted-foreground mb-1">20:00 às 21:00</p>
                <p className="text-sm">Musculação</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Refeições */}
        <Card className="p-6 bg-secondary border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Coffee className="h-5 w-5 text-primary" />
                Refeições
              </h2>
              <Button variant="outline" size="sm">Ver seção</Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between p-3 rounded-lg bg-accent/30 border border-accent/50">
                <span className="text-sm font-medium">07:00</span>
                <span className="text-sm">Café da manhã</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg hover:bg-accent/20 transition-colors">
                <span className="text-sm font-medium">10:00</span>
                <span className="text-sm">Lanche das 10</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg hover:bg-accent/20 transition-colors">
                <span className="text-sm font-medium">12:00</span>
                <span className="text-sm">Almoço</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Compromissos */}
        <Card className="p-6 bg-secondary border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Compromissos
              </h2>
              <Button variant="outline" size="sm">Ver seção</Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between p-3 rounded-lg bg-accent/30 border border-accent/50">
                <span className="text-sm font-medium">09:00 às 09:30</span>
                <span className="text-sm">Alinhamento com o time</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg hover:bg-accent/20 transition-colors">
                <span className="text-sm font-medium">10:00 às 10:30</span>
                <span className="text-sm">Call com alunos</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg hover:bg-accent/20 transition-colors">
                <span className="text-sm font-medium">11:00 às 11:30</span>
                <span className="text-sm">Treinar novos colaboradores</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
