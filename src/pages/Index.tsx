
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, Calendar, DollarSign, Dumbbell, Coffee, Search, Bell, User, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { RemindersSection } from "@/components/reminders/RemindersSection";
import { UpcomingEventsCard } from "@/components/dashboard/UpcomingEventsCard";

const Index = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR');
  const navigate = useNavigate();
  
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
          <ThemeToggle />
        </div>
      </div>

      {/* Cards principais em grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-8">
        {/* Resumo Diário */}
        <Card className="p-6 bg-secondary border-0">
          <h2 className="font-display text-xl font-semibold mb-4 text-primary">Resumo Diário</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Check className="h-4 w-4" />
              <span className="text-sm">0 tarefas concluídas</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">0 horas de trabalho focado</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm">0 marcos de meta alcançados</span>
            </div>
          </div>
        </Card>

        {/* Ações Rápidas */}
        <Card className="p-6 bg-secondary border-0">
          <h2 className="font-display text-xl font-semibold mb-4 text-primary">Ações Rápidas</h2>
          <div className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/flow')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Iniciar Pomodoro
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/anotacoes')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Nova Tarefa
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/conhecimento')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Conhecimento
            </Button>
          </div>
        </Card>

        {/* Próximos Eventos - Agora usando o componente atualizado */}
        <UpcomingEventsCard />
      </div>

      {/* Seções detalhadas */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {/* Não Esquecer - Agora usando o componente específico */}
        <RemindersSection />

        {/* Rotina */}
        <Card className="p-6 bg-secondary border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Rotina
              </h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/habitos')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo
              </Button>
            </div>
            <div className="text-center py-4 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nenhuma rotina configurada</p>
              <p className="text-xs">Comece criando seus hábitos diários</p>
            </div>
          </div>
        </Card>

        {/* Financeiro */}
        <Card className="p-6 bg-secondary border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Financeiro
              </h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/financeiro')}
              >
                Configurar
              </Button>
            </div>
            <div className="text-center py-4 text-muted-foreground">
              <DollarSign className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Configure suas contas</p>
              <p className="text-xs">Comece adicionando suas primeiras contas financeiras</p>
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/treino')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo
              </Button>
            </div>
            <div className="text-center py-4 text-muted-foreground">
              <Dumbbell className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nenhum treino planejado</p>
              <p className="text-xs">Configure seus treinos e atividades</p>
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/treino')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo
              </Button>
            </div>
            <div className="text-center py-4 text-muted-foreground">
              <Coffee className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nenhuma refeição planejada</p>
              <p className="text-xs">Configure seu plano alimentar</p>
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/compromissos')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo
              </Button>
            </div>
            <div className="text-center py-4 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nenhum compromisso agendado</p>
              <p className="text-xs">Organize sua agenda</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
