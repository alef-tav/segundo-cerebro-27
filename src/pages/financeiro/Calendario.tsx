
import { FinancialLayout } from "@/components/financial/FinancialLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useFinancialContext } from "@/contexts/FinancialContext";
import { useFinancialTransactions } from "@/hooks/useFinancialTransactions";
import { formatCurrency } from "@/lib/currency";
import { useState } from "react";

export default function Calendario() {
  const { financialType } = useFinancialContext();
  const { transactions, isLoading } = useFinancialTransactions(financialType);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get month and year for display
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const currentMonthName = monthNames[currentMonth.getMonth()];
  const currentYear = currentMonth.getFullYear();

  // Filter transactions for current month
  const currentMonthTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.data.split('/').reverse().join('-'));
    return transactionDate.getMonth() === currentMonth.getMonth() && 
           transactionDate.getFullYear() === currentMonth.getFullYear();
  });

  // Navigate months
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    return currentMonthTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.data.split('/').reverse().join('-'));
      return transactionDate.getDate() === day;
    });
  };

  // Get upcoming events (next 7 days)
  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.data.split('/').reverse().join('-'));
      return transactionDate >= today && transactionDate <= nextWeek;
    }).sort((a, b) => {
      const dateA = new Date(a.data.split('/').reverse().join('-'));
      const dateB = new Date(b.data.split('/').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    }).slice(0, 5);
  };

  if (isLoading) {
    return (
      <FinancialLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </FinancialLayout>
    );
  }

  return (
    <FinancialLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Calendário Financeiro</h1>
            <p className="text-muted-foreground">
              Acompanhe receitas e despesas programadas
            </p>
          </div>
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento
          </Button>
        </div>

        {/* Navegação do calendário */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">{currentMonthName} {currentYear}</h2>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                Receitas
              </Badge>
              <Badge variant="outline" className="text-red-600 border-red-200">
                <div className="w-2 h-2 bg-red-600 rounded-full mr-2" />
                Despesas
              </Badge>
            </div>
          </div>

          {/* Grid do calendário */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(dia => (
              <div key={dia} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {dia}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: new Date(currentYear, currentMonth.getMonth() + 1, 0).getDate() }, (_, i) => i + 1).map(dia => {
              const eventosDoDia = getEventsForDay(dia);
              return (
                <div key={dia} className="min-h-24 p-2 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="text-sm font-medium mb-1">{dia}</div>
                  <div className="space-y-1">
                    {eventosDoDia.map(evento => (
                      <div 
                        key={evento.id}
                        className={`text-xs p-1 rounded truncate ${
                          evento.tipo === 'receita' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}
                        title={`${evento.categoria} - ${formatCurrency(evento.valor)}`}
                      >
                        {evento.categoria}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Lista de eventos próximos */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Próximos Eventos
          </h3>
          
          <div className="space-y-3">
            {getUpcomingEvents().length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum evento próximo</p>
                <p className="text-sm">Adicione transações para vê-las aqui</p>
              </div>
            ) : (
              getUpcomingEvents().map(evento => (
                <div key={evento.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <div className="text-lg font-bold">
                        {new Date(evento.data.split('/').reverse().join('-')).getDate()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {currentMonthName.substring(0, 3).toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{evento.categoria}</p>
                      {evento.descricao && (
                        <p className="text-sm text-muted-foreground">{evento.descricao}</p>
                      )}
                      <Badge 
                        variant="outline" 
                        className={evento.tipo === 'receita' ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'}
                      >
                        {evento.tipo === 'receita' ? 'Receita' : 'Despesa'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-semibold ${evento.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                      {evento.tipo === 'receita' ? '+' : '-'}{formatCurrency(evento.valor)}
                    </p>
                    <p className="text-xs text-muted-foreground">Conta: {evento.conta}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </FinancialLayout>
  );
}
