
import { FinancialLayout } from "@/components/financial/FinancialLayout";
import { FinancialTypeSelector } from "@/components/financial/FinancialTypeSelector";
import { useFinancialContext } from "@/contexts/FinancialContext";
import { useFinancialTransactions } from "@/hooks/useFinancialTransactions";
import { useFinancialAccounts } from "@/hooks/useFinancialAccounts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, TrendingDown, PieChart, Download, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/currency";
import { useMemo } from "react";

export default function Relatorios() {
  const { financialType } = useFinancialContext();
  
  const { receitas, despesas, isLoading: transactionsLoading } = useFinancialTransactions(financialType);
  const { accounts, isLoading: accountsLoading } = useFinancialAccounts(financialType);

  // Calcular totais reais
  const dadosReais = useMemo(() => {
    const totalReceitas = receitas.reduce((total, receita) => {
      const valor = Number(receita.valor) || 0;
      return total + valor;
    }, 0);
    
    const totalDespesas = despesas.reduce((total, despesa) => {
      const valor = Number(despesa.valor) || 0;
      return total + valor;
    }, 0);
    
    const saldoTotal = totalReceitas - totalDespesas;

    // Calcular categorias de despesas
    const categoriasDespesas = despesas.reduce((acc, despesa) => {
      const valor = Number(despesa.valor) || 0;
      if (!acc[despesa.categoria]) {
        acc[despesa.categoria] = 0;
      }
      acc[despesa.categoria] = (acc[despesa.categoria] || 0) + valor;
      return acc;
    }, {} as Record<string, number>);

    const categoriasFormatadas = Object.entries(categoriasDespesas).map(([categoria, valor], index) => {
      const cores = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-yellow-500"];
      const valorNumerico = Number(valor) || 0;
      const totalDespesasNumerico = Number(totalDespesas) || 0;
      const percentual = totalDespesasNumerico > 0 ? Math.round((valorNumerico / totalDespesasNumerico) * 100) : 0;
      
      return {
        categoria,
        valor: valorNumerico,
        percentual,
        cor: cores[index % cores.length]
      };
    }).sort((a, b) => b.valor - a.valor);

    return {
      receitas: totalReceitas,
      despesas: totalDespesas,
      economia: saldoTotal,
      variacaoReceitas: 0, // Placeholder - seria calculado comparando com período anterior
      variacaoDespesas: 0, // Placeholder - seria calculado comparando com período anterior
      variacaoEconomia: 0, // Placeholder - seria calculado comparando com período anterior
      categorias: categoriasFormatadas
    };
  }, [receitas, despesas]);

  const titulo = financialType === 'pessoal' ? 'Relatórios Pessoais' : 'Relatórios Empresariais';

  if (transactionsLoading || accountsLoading) {
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
                <p className="text-2xl font-bold text-green-600">{formatCurrency(dadosReais.receitas)}</p>
                {dadosReais.variacaoReceitas !== 0 && (
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{dadosReais.variacaoReceitas}% vs mês anterior
                  </p>
                )}
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
                <p className="text-2xl font-bold text-red-600">{formatCurrency(dadosReais.despesas)}</p>
                {dadosReais.variacaoDespesas !== 0 && (
                  <p className="text-sm text-red-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{dadosReais.variacaoDespesas}% vs mês anterior
                  </p>
                )}
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
                <p className={`text-2xl font-bold ${dadosReais.economia >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {formatCurrency(dadosReais.economia)}
                </p>
                {dadosReais.variacaoEconomia !== 0 && (
                  <p className="text-sm text-blue-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{dadosReais.variacaoEconomia}% vs mês anterior
                  </p>
                )}
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
              {dadosReais.categorias.length > 0 ? (
                <div className="w-full">
                  <p className="text-center mb-4">Distribuição das categorias:</p>
                  <div className="space-y-2">
                    {dadosReais.categorias.slice(0, 5).map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${item.cor}`} />
                          <span>{item.categoria}</span>
                        </div>
                        <span>{item.percentual}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                'Nenhuma despesa encontrada para gerar o gráfico'
              )}
            </div>
          </Card>
        </div>

        {/* Tabela de categorias */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Análise por Categoria - {titulo}</h3>
          <div className="space-y-4">
            {dadosReais.categorias.length > 0 ? (
              dadosReais.categorias.map((item, index) => (
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
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma despesa encontrada</p>
                <p className="text-sm">Adicione algumas despesas para ver a análise por categoria</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </FinancialLayout>
  );
}
