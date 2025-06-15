
import { FinancialLayout } from "@/components/financial/FinancialLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, TrendingDown, PieChart, Download } from "lucide-react";

export default function Relatorios() {
  return (
    <FinancialLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Relatórios</h1>
            <p className="text-muted-foreground">
              Análise detalhada das suas finanças
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Select defaultValue="mes-atual">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mes-atual">Mês atual</SelectItem>
                <SelectItem value="mes-anterior">Mês anterior</SelectItem>
                <SelectItem value="ultimos-3-meses">Últimos 3 meses</SelectItem>
                <SelectItem value="ano-atual">Ano atual</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Cards de resumo */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Receitas do Mês</p>
                <p className="text-2xl font-bold text-green-600">R$ 25.000,00</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% vs mês anterior
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Despesas do Mês</p>
                <p className="text-2xl font-bold text-red-600">R$ 18.500,00</p>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5% vs mês anterior
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Economia do Mês</p>
                <p className="text-2xl font-bold text-blue-600">R$ 6.500,00</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +25% vs mês anterior
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Evolução Mensal
            </h3>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Gráfico de evolução mensal das receitas e despesas
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Despesas por Categoria
            </h3>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Gráfico de pizza das categorias de despesas
            </div>
          </Card>
        </div>

        {/* Tabela de categorias */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Análise por Categoria</h3>
          <div className="space-y-4">
            {[
              { categoria: "Alimentação", valor: 4500, percentual: 24, cor: "bg-red-500" },
              { categoria: "Transporte", valor: 3200, percentual: 17, cor: "bg-blue-500" },
              { categoria: "Casa", valor: 2800, percentual: 15, cor: "bg-green-500" },
              { categoria: "Lazer", valor: 2100, percentual: 11, cor: "bg-purple-500" },
              { categoria: "Saúde", valor: 1900, percentual: 10, cor: "bg-orange-500" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.cor}`} />
                  <span className="font-medium">{item.categoria}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">{item.percentual}%</span>
                  <span className="font-semibold">R$ {item.valor.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </FinancialLayout>
  );
}
