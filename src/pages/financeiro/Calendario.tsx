
import { FinancialLayout } from "@/components/financial/FinancialLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, ArrowLeft, ArrowRight } from "lucide-react";

export default function Calendario() {
  const eventos = [
    { id: 1, titulo: "Pagamento Aluguel", data: "15", tipo: "despesa", valor: 2500 },
    { id: 2, titulo: "Salário", data: "25", tipo: "receita", valor: 15000 },
    { id: 3, titulo: "Conta de Luz", data: "10", tipo: "despesa", valor: 350 },
    { id: 4, titulo: "Freelance", data: "30", tipo: "receita", valor: 5000 },
  ];

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
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">Junho 2025</h2>
              <Button variant="outline" size="sm">
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

          {/* Grid do calendário simplificado */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(dia => (
              <div key={dia} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {dia}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }, (_, i) => i + 1).map(dia => {
              const eventosDoDia = eventos.filter(e => parseInt(e.data) === dia);
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
                      >
                        {evento.titulo}
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
            {eventos.map(evento => (
              <div key={evento.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <div className="text-lg font-bold">{evento.data}</div>
                    <div className="text-xs text-muted-foreground">JUN</div>
                  </div>
                  <div>
                    <p className="font-medium">{evento.titulo}</p>
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
                    R$ {evento.valor.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </FinancialLayout>
  );
}
