
import { FinancialLayout } from "@/components/financial/FinancialLayout";
import { FinancialTypeSelector } from "@/components/financial/FinancialTypeSelector";
import { NewAccountDialog } from "@/components/financial/NewAccountDialog";
import { useFinancialContext } from "@/contexts/FinancialContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, Building, Edit, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function Contas() {
  const { financialType } = useFinancialContext();
  const [contasSelecionada, setContaSelecionada] = useState<number | null>(null);

  const [contasPessoais, setContasPessoais] = useState([
    { 
      id: 1, 
      nome: "Banco PagSeguro", 
      tipo: "Conta Corrente", 
      saldo: 15000.00, 
      icon: Building,
      cor: "bg-blue-500",
      receitas: 1000.00,
      despesas: 200.00,
      transacoes: [
        { id: 1, data: "13/06/2025", categoria: "Salário", descricao: "Salário", valor: 500.00, tipo: "receita" },
        { id: 2, data: "12/06/2025", categoria: "Mentoria", descricao: "Mentoria", valor: 500.00, tipo: "receita" },
        { id: 3, data: "11/06/2025", categoria: "Mercado", descricao: "Compras do mês", valor: -200.00, tipo: "despesa" }
      ]
    },
    { 
      id: 2, 
      nome: "Cartão de Crédito", 
      tipo: "Cartão", 
      saldo: -2500.00, 
      icon: CreditCard,
      cor: "bg-purple-500",
      receitas: 0.00,
      despesas: 326.25,
      transacoes: [
        { id: 4, data: "13/06/2025", categoria: "Cartão de Crédito", descricao: "Fatura do cartão", valor: -326.25, tipo: "despesa" }
      ]
    },
    { 
      id: 3, 
      nome: "Banco Inter", 
      tipo: "Conta Corrente", 
      saldo: 8750.00, 
      icon: Building,
      cor: "bg-orange-500",
      receitas: 500.00,
      despesas: 0.00,
      transacoes: [
        { id: 5, data: "13/06/2025", categoria: "Salário", descricao: "Salário", valor: 500.00, tipo: "receita" }
      ]
    },
  ]);

  const [contasEmpresariais, setContasEmpresariais] = useState([
    { 
      id: 1, 
      nome: "Conta Empresarial Principal", 
      tipo: "Conta Corrente PJ", 
      saldo: 85000.00, 
      icon: Building,
      cor: "bg-green-500",
      receitas: 40000.00,
      despesas: 20000.00,
      transacoes: [
        { id: 1, data: "13/06/2025", categoria: "Vendas", descricao: "Venda de Produtos", valor: 25000.00, tipo: "receita" },
        { id: 2, data: "12/06/2025", categoria: "Consultoria", descricao: "Serviços de Consultoria", valor: 15000.00, tipo: "receita" },
        { id: 3, data: "11/06/2025", categoria: "Fornecedores", descricao: "Compra de Materiais", valor: -8000.00, tipo: "despesa" },
        { id: 4, data: "10/06/2025", categoria: "Salários", descricao: "Folha de Pagamento", valor: -12000.00, tipo: "despesa" }
      ]
    },
    { 
      id: 2, 
      nome: "Conta de Investimentos", 
      tipo: "Conta Investimento", 
      saldo: 150000.00, 
      icon: Wallet,
      cor: "bg-blue-500",
      receitas: 0.00,
      despesas: 0.00,
      transacoes: []
    },
    { 
      id: 3, 
      nome: "Cartão Empresarial", 
      tipo: "Cartão Corporativo", 
      saldo: -8500.00, 
      icon: CreditCard,
      cor: "bg-red-500",
      receitas: 0.00,
      despesas: 8500.00,
      transacoes: []
    },
  ]);

  const contas = financialType === 'pessoal' ? contasPessoais : contasEmpresariais;
  const setContas = financialType === 'pessoal' ? setContasPessoais : setContasEmpresariais;

  const contaAtual = contasSelecionada ? contas.find(c => c.id === contasSelecionada) : contas[0];

  const handleAddAccount = (novaConta: any) => {
    setContas(prev => [...prev, { ...novaConta, icon: Building, transacoes: [] }]);
  };

  const handleDeleteAccount = (id: number) => {
    setContas(prev => prev.filter(conta => conta.id !== id));
    if (contasSelecionada === id) {
      setContaSelecionada(null);
    }
  };

  const calcularTotais = () => {
    const totalPositivo = contas.filter(c => c.saldo > 0).reduce((sum, c) => sum + c.saldo, 0);
    const totalNegativo = contas.filter(c => c.saldo < 0).reduce((sum, c) => sum + Math.abs(c.saldo), 0);
    const patrimonio = totalPositivo - totalNegativo;
    return { totalPositivo, totalNegativo, patrimonio };
  };

  const { totalPositivo, totalNegativo, patrimonio } = calcularTotais();

  return (
    <FinancialLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Contas</h1>
              <p className="text-muted-foreground">
                Gerencie suas contas {financialType === 'pessoal' ? 'pessoais' : 'empresariais'}
              </p>
            </div>
            <FinancialTypeSelector />
          </div>
          
          <NewAccountDialog onAddAccount={handleAddAccount} />
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
          {/* Sidebar - Minhas Contas */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Minhas Contas</h3>
              <div className="space-y-2">
                {contas.map((conta) => (
                  <button
                    key={conta.id}
                    onClick={() => setContaSelecionada(conta.id)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      contaAtual?.id === conta.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${conta.cor}`}>
                        <conta.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{conta.nome}</p>
                        <p className="text-sm opacity-75 truncate">{conta.tipo}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          contaAtual?.id === conta.id ? 'text-white' : 
                          conta.saldo >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <span className="text-xs">R$</span> {Math.abs(conta.saldo).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Detalhes da Conta Selecionada */}
          <div className="lg:col-span-3 space-y-6">
            {contaAtual && (
              <>
                {/* Header da Conta */}
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${contaAtual.cor}`}>
                        <contaAtual.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{contaAtual.nome}</h2>
                        <p className="text-muted-foreground">{contaAtual.tipo}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Conta</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir a conta "{contaAtual.nome}"? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteAccount(contaAtual.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  {/* Indicadores */}
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Saldo Atual</p>
                      <p className={`text-2xl font-bold ${contaAtual.saldo >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        <span className="text-lg">R$</span> {Math.abs(contaAtual.saldo).toFixed(2)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        Total Receitas
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        <span className="text-lg">R$</span> {contaAtual.receitas.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                        <TrendingDown className="h-4 w-4 text-red-500" />
                        Total Despesas
                      </p>
                      <p className="text-2xl font-bold text-red-600">
                        <span className="text-lg">R$</span> {contaAtual.despesas.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Histórico de Transações */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Histórico de Transações</h3>
                  
                  {contaAtual.transacoes.length > 0 ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-4 gap-4 text-sm text-muted-foreground border-b pb-2">
                        <span>DATA</span>
                        <span>CATEGORIA</span>
                        <span>DESCRIÇÃO</span>
                        <span className="text-right">VALOR</span>
                      </div>
                      
                      {contaAtual.transacoes.map((transacao) => (
                        <div key={transacao.id} className="grid grid-cols-4 gap-4 py-3 border-b border-border/50 hover:bg-secondary/50 rounded-lg px-2">
                          <span className="text-sm">{transacao.data}</span>
                          <span className="text-sm flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            {transacao.categoria}
                          </span>
                          <span className="text-sm">{transacao.descricao}</span>
                          <span className={`text-sm font-bold text-right ${
                            transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transacao.tipo === 'receita' ? '+' : '-'}R$ {Math.abs(transacao.valor).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhuma transação encontrada</p>
                      <p className="text-sm">As transações desta conta aparecerão aqui</p>
                    </div>
                  )}
                </Card>
              </>
            )}
          </div>
        </div>

        {/* Resumo Geral */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Resumo Geral - {financialType === 'pessoal' ? 'Pessoal' : 'Empresarial'}</h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total em Contas</p>
              <p className="text-2xl font-bold text-green-600">R$ {totalPositivo.toFixed(2).replace('.', ',')}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total em Dívidas</p>
              <p className="text-2xl font-bold text-red-600">R$ {totalNegativo.toFixed(2).replace('.', ',')}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Patrimônio Líquido</p>
              <p className="text-2xl font-bold text-blue-600">R$ {patrimonio.toFixed(2).replace('.', ',')}</p>
            </div>
          </div>
        </Card>
      </div>
    </FinancialLayout>
  );
}
