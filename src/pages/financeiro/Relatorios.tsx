
import { FinancialLayout } from "@/components/financial/FinancialLayout";
import { FinancialTypeSelector } from "@/components/financial/FinancialTypeSelector";
import { useFinancialContext } from "@/contexts/FinancialContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, TrendingDown, PieChart, Download } from "lucide-react";
import { formatCurrency } from "@/lib/currency";

export default function Relatorios() {
  const { financialType } = useFinancialContext();

  const dadosPessoais = {
    receitas: 25000.00,
    despesas: 18500.00,
    economia: 6500.00,
    variacaoReceitas: 12,
    variacaoDespesas: 5,
    variacaoEconomia: 25,
    categorias: [
      { categoria: "Alimentação", valor: 4500, percentual: 24, cor: "bg-red-500" },
      { categoria: "Transporte", valor: 3200, percentual: 17, cor: "bg-blue-500" },
      { categoria: "Casa", valor: 2800, percentual: 15, cor: "bg-green-500" },
      { categoria: "Lazer", valor: 2100, percentual: 11, cor: "bg-purple-500" },
      { categoria: "Saúde", valor: 1900, percentual: 10, cor: "bg-orange-500" },
    ]
  };

  const dadosEmpresariais = {
    receitas: 120000.00,
    despesas: 85000.00,
    economia: 35000.00,
    variacaoReceitas: 18,
    variacaoDespesas: 8,
    variacaoEconomia: 45,
    categorias: [
      { categoria: "Fornecedores", valor: 35000, percentual: 41, cor: "bg-red-500" },
      { categoria: "Salários", valor: 25000, percentual: 29, cor: "bg-blue-500" },
      { categoria: "Marketing", valor: 12000, percentual: 14, cor: "bg-green-500" },
      { categoria: "Escritório", valor: 8000, percentual: 9, cor: "bg-purple-500" },
      { categoria: "Impostos", valor: 5000, percentual: 6, cor: "bg-orange-500" },
    ]
  };

  const dados = financialType === 'pessoal' ? dadosPessoais : dadosEmpresariais;
  const titulo = financialType === 'pessoal' ? 'Relatórios Pessoais' : 'Relatórios Empresariais';

  return (
    <FinancialLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Relatórios</h1>
              <p className="text-muted-foreground">
                Análise detalhada das suas finanças {financialType === 'pessoal' ? 'pessoais' : 'empresariais'}
              </p>
            </div>
            <FinancialTypeSelector />
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
                <p className="text-sm text-muted-foreground">{financialType === 'pessoal' ? 'Receitas do Mês' : 'Faturamento do Mês'}</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(dados.receitas)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{dados.variacaoReceitas}% vs mês anterior
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
                <p className="text-sm text-muted-foreground">{financialType === 'pessoal' ? 'Despesas do Mês' : 'Custos do Mês'}</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(dados.despesas)}</p>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{dados.variacaoDespesas}% vs mês anterior
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
                <p className="text-sm text-muted-foreground">{financialType === 'pessoal' ? 'Economia do Mês' : 'Lucro do Mês'}</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(dados.economia)}</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{dados.variacaoEconomia}% vs mês anterior
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
              Evolução Mensal - {titulo}
            </h3>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Gráfico de evolução mensal das {financialType === 'pessoal' ? 'receitas e despesas pessoais' : 'receitas e custos empresariais'}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              {financialType === 'pessoal' ? 'Despesas por Categoria' : 'Custos por Categoria'}
            </h3>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Gráfico de pizza das categorias de {financialType === 'pessoal' ? 'despesas pessoais' : 'custos empresariais'}
            </div>
          </Card>
        </div>

        {/* Tabela de categorias */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Análise por Categoria - {titulo}</h3>
          <div className="space-y-4">
            {dados.categorias.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.cor}`} />
                  <span className="font-medium">{item.categoria}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">{item.percentual}%</span>
                  <span className="font-semibold">{formatCurrency(item.valor)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </FinancialLayout>
  );
}
