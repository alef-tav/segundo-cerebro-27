
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
import { useFinancialAccounts } from "@/hooks/useFinancialAccounts";
import { useFinancialTransactions } from "@/hooks/useFinancialTransactions";
import { useFinancialContext } from "@/contexts/FinancialContext";
import { formatCurrency } from "@/lib/currency";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Resumo = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const { financialType } = useFinancialContext();
  
  // Buscar dados financeiros reais
  const { accounts } = useFinancialAccounts(financialType);
  const { receitas, despesas } = useFinancialTransactions(financialType);

  // Buscar lembretes do usuário
  const { data: reminders = [] } = useQuery({
    queryKey: ['reminders'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    }
  });

  // Calcular dados financeiros reais
  const totalReceitas = receitas.reduce((total, receita) => total + receita.valor, 0);
  const totalDespesas = despesas.reduce((total, despesa) => total + despesa.valor, 0);
  const saldoTotal = accounts.reduce((total, conta) => total + conta.saldo, 0);
  const balanceDia = totalReceitas - totalDespesas;

  // Calcular métricas de produtividade baseadas em dados reais
  const totalReminders = reminders.length;
  const completedReminders = reminders.filter(r => r.completed).length;
  const reminderCompletionRate = totalReminders > 0 ? Math.round((completedReminders / totalReminders) * 100) : 0;

  // Dados fictícios que serão substituídos por dados reais quando outras funcionalidades forem implementadas
  const dailyStats = {
    tasks: {
      completed: completedReminders,
      total: totalReminders,
      completionRate: reminderCompletionRate
    },
    focus: {
      pomodorosCompleted: 0, // Será conectado quando Pomodoro for implementado
      totalFocusTime: 0, // minutos
      goal: 240
    },
    habits: {
      completed: 0, // Será conectado quando Hábitos for implementado
      total: 0,
      streak: 0
    },
    appointments: {
      attended: 0, // Será conectado quando Compromissos for implementado
      total: 0
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getProductivityScore = () => {
    const taskScore = totalReminders > 0 ? (completedReminders / totalReminders) * 40 : 20;
    const focusScore = (dailyStats.focus.totalFocusTime / dailyStats.focus.goal) * 30;
    const habitScore = dailyStats.habits.total > 0 ? (dailyStats.habits.completed / dailyStats.habits.total) * 30 : 15;
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
           totalReminders === 0 ? "Adicione alguns lembretes para começar a acompanhar sua produtividade!" :
           "Há espaço para melhorar amanhã!"}
        </p>
      </Card>

      {/* Métricas Principais */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Lembretes */}
        <Card className="p-4 bg-secondary border-0">
          <div className="flex items-center justify-between mb-3">
            <Check className="h-5 w-5 text-green-500" />
            <span className="text-2xl font-bold">{completedReminders}/{totalReminders}</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Lembretes Concluídos</p>
            <Progress value={reminderCompletionRate} className="h-2" />
            <p className="text-xs text-muted-foreground">{reminderCompletionRate}% completo</p>
          </div>
        </Card>

        {/* Foco */}
        <Card className="p-4 bg-secondary border-0">
          <div className="flex items-center justify-between mb-3">
            <Clock className="h-5 w-5 text-blue-500" />
            <span className="text-2xl font-bold">{dailyStats.focus.pomodorosCompleted}</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Sessões de Foco</p>
            <p className="text-xs text-muted-foreground">
              {formatTime(dailyStats.focus.totalFocusTime)} de foco hoje
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
            <Progress value={dailyStats.habits.total > 0 ? (dailyStats.habits.completed / dailyStats.habits.total) * 100 : 0} className="h-2" />
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
            <Progress value={dailyStats.appointments.total > 0 ? (dailyStats.appointments.attended / dailyStats.appointments.total) * 100 : 0} className="h-2" />
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
            {completedReminders > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm text-card-foreground">{completedReminders} lembrete(s) concluído(s)</span>
              </div>
            )}
            {totalReceitas > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm text-card-foreground">Receitas registradas: {formatCurrency(totalReceitas)}</span>
              </div>
            )}
            {accounts.length > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-card-foreground">{accounts.length} conta(s) financeira(s) configurada(s)</span>
              </div>
            )}
            {totalReminders === 0 && totalReceitas === 0 && accounts.length === 0 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                <Brain className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-card-foreground">Comece adicionando lembretes e configurando suas finanças</span>
              </div>
            )}
          </div>
        </Card>

        {/* Resumo Financeiro - DADOS REAIS */}
        <Card className="p-6 bg-secondary border-0">
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Resumo Financeiro
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Receitas</p>
                <p className="text-lg font-semibold text-green-500">
                  +{formatCurrency(totalReceitas)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Despesas</p>
                <p className="text-lg font-semibold text-red-500">
                  -{formatCurrency(totalDespesas)}
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-border">
              <p className="text-sm text-muted-foreground">Saldo Total</p>
              <p className={`text-xl font-bold ${saldoTotal >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatCurrency(saldoTotal)}
              </p>
            </div>
            <div className="pt-2">
              <p className="text-sm text-muted-foreground">Resultado do Dia</p>
              <p className={`text-lg font-bold ${balanceDia >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {balanceDia >= 0 ? '+' : ''}{formatCurrency(balanceDia)}
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
            {totalReminders - completedReminders > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{totalReminders - completedReminders} lembrete(s) pendente(s)</span>
              </div>
            )}
            {accounts.length === 0 && (
              <div className="flex items-center gap-3 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <DollarSign className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Configure suas contas financeiras</span>
              </div>
            )}
            {totalReminders === 0 && (
              <div className="flex items-center gap-3 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                <Target className="h-4 w-4 text-purple-500" />
                <span className="text-sm">Adicione seus primeiros lembretes</span>
              </div>
            )}
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
                {completedReminders > 0 ? 
                  `Você completou ${completedReminders} lembrete(s) hoje!` :
                  "Configure seu dashboard para começar a acompanhar seu progresso."
                }
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-500">💡 Oportunidades</p>
              <p className="text-xs text-muted-foreground">
                {totalReminders === 0 ? 
                  "Comece adicionando alguns lembretes importantes." :
                  totalReminders - completedReminders > 0 ?
                  `Complete os ${totalReminders - completedReminders} lembrete(s) restante(s).` :
                  "Todos os lembretes concluídos! Adicione novos desafios."
                }
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-purple-500">🎯 Meta para Amanhã</p>
              <p className="text-xs text-muted-foreground">
                {accounts.length === 0 ?
                  "Configure pelo menos uma conta financeira." :
                  totalReminders === 0 ?
                  "Adicione 3-5 lembretes importantes para organizar seu dia." :
                  "Mantenha a consistência e complete todos os lembretes."
                }
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Resumo;
