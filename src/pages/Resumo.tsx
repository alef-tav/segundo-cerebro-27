
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Dumbbell,
  Brain,
  Coffee,
  Star,
  AlertCircle,
  Award
} from "lucide-react";

const Resumo = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Dados fictícios que representariam dados reais do app
  const dailyStats = {
    tasks: {
      completed: 8,
      total: 12,
      completionRate: 67
    },
    focus: {
      pomodorosCompleted: 6,
      totalFocusTime: 180, // minutos
      goal: 240
    },
    habits: {
      completed: 4,
      total: 6,
      streak: 7
    },
    appointments: {
      attended: 3,
      total: 4
    },
    financial: {
      spent: 156.80,
      received: 750.00,
      balance: 593.20
    },
    health: {
      workoutsCompleted: 1,
      mealsLogged: 3,
      stepsGoal: 8500
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getProductivityScore = () => {
    const taskScore = (dailyStats.tasks.completed / dailyStats.tasks.total) * 30;
    const focusScore = (dailyStats.focus.totalFocusTime / dailyStats.focus.goal) * 40;
    const habitScore = (dailyStats.habits.completed / dailyStats.habits.total) * 30;
    return Math.round(taskScore + focusScore + habitScore);
  };

  const productivityScore = getProductivityScore();

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Resumo do Dia</h1>
        <p className="text-muted-foreground capitalize">{currentDate}</p>
      </div>

      {/* Score de Produtividade */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary border-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl font-semibold flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            Score de Produtividade
          </h2>
          <Badge variant={productivityScore >= 80 ? "default" : productivityScore >= 60 ? "secondary" : "destructive"} className="text-lg px-4 py-2">
            {productivityScore}/100
          </Badge>
        </div>
        <Progress value={productivityScore} className="h-3 mb-2" />
        <p className="text-sm text-muted-foreground">
          {productivityScore >= 80 ? "Excelente produtividade hoje!" : 
           productivityScore >= 60 ? "Boa produtividade, continue assim!" : 
           "Há espaço para melhorar amanhã!"}
        </p>
      </Card>

      {/* Métricas Principais */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Tarefas */}
        <Card className="p-4 bg-secondary border-0">
          <div className="flex items-center justify-between mb-3">
            <Check className="h-5 w-5 text-green-500" />
            <span className="text-2xl font-bold">{dailyStats.tasks.completed}/{dailyStats.tasks.total}</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Tarefas Concluídas</p>
            <Progress value={dailyStats.tasks.completionRate} className="h-2" />
            <p className="text-xs text-muted-foreground">{dailyStats.tasks.completionRate}% completo</p>
          </div>
        </Card>

        {/* Foco */}
        <Card className="p-4 bg-secondary border-0">
          <div className="flex items-center justify-between mb-3">
            <Clock className="h-5 w-5 text-blue-500" />
            <span className="text-2xl font-bold">{dailyStats.focus.pomodorosCompleted}</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Pomodoros</p>
            <p className="text-xs text-muted-foreground">
              {formatTime(dailyStats.focus.totalFocusTime)} de foco
            </p>
            <Progress value={(dailyStats.focus.totalFocusTime / dailyStats.focus.goal) * 100} className="h-2" />
          </div>
        </Card>

        {/* Hábitos */}
        <Card className="p-4 bg-secondary border-0">
          <div className="flex items-center justify-between mb-3">
            <Target className="h-5 w-5 text-purple-500" />
            <span className="text-2xl font-bold">{dailyStats.habits.completed}/{dailyStats.habits.total}</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Hábitos</p>
            <p className="text-xs text-muted-foreground">
              {dailyStats.habits.streak} dias de sequência
            </p>
            <Progress value={(dailyStats.habits.completed / dailyStats.habits.total) * 100} className="h-2" />
          </div>
        </Card>

        {/* Compromissos */}
        <Card className="p-4 bg-secondary border-0">
          <div className="flex items-center justify-between mb-3">
            <Calendar className="h-5 w-5 text-orange-500" />
            <span className="text-2xl font-bold">{dailyStats.appointments.attended}/{dailyStats.appointments.total}</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Compromissos</p>
            <p className="text-xs text-muted-foreground">Atendidos hoje</p>
            <Progress value={(dailyStats.appointments.attended / dailyStats.appointments.total) * 100} className="h-2" />
          </div>
        </Card>
      </div>

      {/* Seções Detalhadas */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Atividades Concluídas */}
        <Card className="p-6 bg-secondary border-0">
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Conquistas de Hoje
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm text-card-foreground">Completou ritual matinal</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-card-foreground">6 sessões Pomodoro concluídas</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
              <Dumbbell className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-card-foreground">Treino de musculação realizado</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
              <Brain className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-card-foreground">2 novos conhecimentos adicionados</span>
            </div>
          </div>
        </Card>

        {/* Resumo Financeiro */}
        <Card className="p-6 bg-secondary border-0">
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Resumo Financeiro
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Recebido</p>
                <p className="text-lg font-semibold text-green-500">
                  +R$ {dailyStats.financial.received.toFixed(2)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Gasto</p>
                <p className="text-lg font-semibold text-red-500">
                  -R$ {dailyStats.financial.spent.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-border">
              <p className="text-sm text-muted-foreground">Saldo do dia</p>
              <p className={`text-xl font-bold ${dailyStats.financial.balance > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {dailyStats.financial.balance > 0 ? '+' : ''}R$ {dailyStats.financial.balance.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>

        {/* Próximas Prioridades */}
        <Card className="p-6 bg-secondary border-0">
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Pendências e Prioridades
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">4 tarefas ainda pendentes</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Reunião às 15:00 amanhã</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
              <Target className="h-4 w-4 text-purple-500" />
              <span className="text-sm">2 hábitos não completados</span>
            </div>
          </div>
        </Card>

        {/* Insights e Sugestões */}
        <Card className="p-6 bg-secondary border-0">
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Insights e Sugestões
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-green-500">✨ Pontos Fortes</p>
              <p className="text-xs text-muted-foreground">
                Você manteve o foco bem hoje com 6 Pomodoros!
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-500">💡 Oportunidades</p>
              <p className="text-xs text-muted-foreground">
                Tente completar mais 2 hábitos amanhã para manter a sequência.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-purple-500">🎯 Meta para Amanhã</p>
              <p className="text-xs text-muted-foreground">
                Foque em concluir as 4 tarefas pendentes pela manhã.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Resumo;
