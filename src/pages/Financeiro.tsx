import { FinancialLayout } from "@/components/financial/FinancialLayout";
import { FinancialTypeSelector } from "@/components/financial/FinancialTypeSelector";
import { NewAccountDialog } from "@/components/financial/NewAccountDialog";
import { ProtectedFinancialRoute } from "@/components/financial/ProtectedFinancialRoute";
import { useFinancialContext } from "@/contexts/FinancialContext";
import { useFinancialAccounts } from "@/hooks/useFinancialAccounts";
import { useFinancialTransactions } from "@/hooks/useFinancialTransactions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, TrendingUp, TrendingDown, Plus, ArrowUp, ArrowDown, Wallet, Building, Trash2, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/currency";

const Financeiro = () => {
  const { financialType } = useFinancialContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("receita");
  const [selectedPeriod, setSelectedPeriod] = useState("todos-periodos");

  const {
    accounts: contas,
    addAccount,
    isLoading: accountsLoading
  } = useFinancialAccounts(financialType);

  const {
    receitas,
    despesas,
    deleteTransaction,
    isLoading: transactionsLoading,
    isDeletingTransaction
  } = useFinancialTransactions(financialType);

  // Calcular totais
  const totalReceitas = receitas.reduce((total, receita) => total + receita.valor, 0);
  const totalDespesas = despesas.reduce((total, despesa) => total + despesa.valor, 0);
  const saldo = contas.reduce((total, conta) => total + conta.saldo, 0);
  const totalTransacoes = receitas.length + despesas.length;

  // Função para adicionar nova conta
  const handleAddAccount = (novaConta: any) => {
    addAccount({
      nome: novaConta.nome,
      tipo: novaConta.tipo,
      saldo: novaConta.saldoInicial || 0,
      cor: novaConta.cor,
      receitas: 0,
      despesas: 0,
      financial_type: financialType
    });
  };

  // Função para obter o texto do período selecionado
  const getPeriodText = (period: string) => {
    switch (period) {
      case "todos-periodos":
        return "Todos os períodos";
      case "mes-atual":
        return "Mês atual";
      case "ultimos-30":
        return "Últimos 30 dias";
      default:
        return "Todos os períodos";
    }
  };

  const handleSaveTransaction = () => {
    console.log("Salvando transação...");
    setIsModalOpen(false);
  };

  if (accountsLoading || transactionsLoading) {
    return (
      <ProtectedFinancialRoute>
        <FinancialLayout>
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </FinancialLayout>
      </ProtectedFinancialRoute>
    );
  }

  return (
    <ProtectedFinancialRoute>
      <FinancialLayout>
        <div className="space-y-8 animate-in">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="font-display text-4xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                  Acompanhe suas receitas e despesas
                </p>
              </div>
              <FinancialTypeSelector />
            </div>
            
            <div className="flex items-center gap-4">
              <Select defaultValue="todas-contas">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Todas as Contas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas-contas">Todas as Contas</SelectItem>
                  {contas.map((conta) => (
                    <SelectItem key={conta.id} value={conta.id}>
                      {conta.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Todos os períodos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos-periodos">Todos os períodos</SelectItem>
                  <SelectItem value="mes-atual">Mês atual</SelectItem>
                  <SelectItem value="ultimos-30">Últimos 30 dias</SelectItem>
                </SelectContent>
              </Select>

              {/* Modal de Adicionar Transação */}
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
                  <DialogHeader>
                    <DialogTitle className="text-white flex items-center justify-between">
                      Nova Transação
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Tipo de Transação */}
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Tipo de Transação</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={transactionType === "receita" ? "default" : "outline"}
                          onClick={() => setTransactionType("receita")}
                          className={transactionType === "receita" ? "bg-blue-600 text-white" : "bg-slate-700 text-white border-slate-600"}
                        >
                          Receita
                        </Button>
                        <Button
                          variant={transactionType === "despesa" ? "destructive" : "outline"}
                          onClick={() => setTransactionType("despesa")}
                          className={transactionType === "despesa" ? "bg-red-600 text-white" : "bg-slate-700 text-white border-slate-600"}
                        >
                          Despesa
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Valor</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">R$</span>
                          <Input 
                            placeholder="0,00" 
                            className="pl-8 bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Data</label>
                        <Input 
                          type="date" 
                          defaultValue="2025-06-15"
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Categoria</label>
                        <Select>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            <SelectItem value="alimentacao">Alimentação</SelectItem>
                            <SelectItem value="transporte">Transporte</SelectItem>
                            <SelectItem value="salario">Salário</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Subcategoria</label>
                        <Input 
                          placeholder="Opcional" 
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Status</label>
                        <Select defaultValue="concluido">
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            <SelectItem value="concluido">Concluído</SelectItem>
                            <SelectItem value="pendente">Pendente</SelectItem>
                            <SelectItem value="cancelado">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Responsável</label>
                        <Input 
                          placeholder="Pessoa responsável" 
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Conta</label>
                      <Select>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Selecione uma conta" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {contas.map((conta) => (
                            <SelectItem key={conta.id} value={conta.id}>
                              {conta.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Observações</label>
                      <textarea 
                        placeholder="Detalhes adicionais..."
                        className="w-full h-20 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400 resize-none"
                      />
                    </div>

                    <Button 
                      onClick={handleSaveTransaction}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Salvar Transação
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Período selecionado */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>📅</span>
            <span>Período selecionado: {getPeriodText(selectedPeriod)}</span>
          </div>

          {/* Cards de Resumo */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saldo Total</p>
                  <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatCurrency(saldo)}
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-green-500" />
              </div>
            </Card>

            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {financialType === 'pessoal' ? 'Total Receitas' : 'Faturamento'}
                  </p>
                  <p className="text-2xl font-bold text-blue-500">{formatCurrency(totalReceitas)}</p>
                </div>
                {financialType === 'pessoal' ? 
                  <TrendingUp className="h-8 w-8 text-blue-500" /> : 
                  <DollarSign className="h-8 w-8 text-green-500" />
                }
              </div>
            </Card>

            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {financialType === 'pessoal' ? 'Total Despesas' : 'Custos Operacionais'}
                  </p>
                  <p className="text-2xl font-bold text-red-500">{formatCurrency(totalDespesas)}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-500" />
              </div>
            </Card>

            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Transações</p>
                  <p className="text-2xl font-bold">{totalTransacoes}</p>
                  <p className="text-xs text-muted-foreground">Todos os períodos</p>
                </div>
                <ArrowUp className="h-8 w-8 text-blue-500" />
              </div>
            </Card>
          </div>

          {/* Contas */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              {financialType === 'pessoal' ? '📊 Contas' : '🏢 Contas Empresariais'}
            </h3>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              {contas.map((conta) => (
                <Card key={conta.id} className="p-6 bg-secondary border-0">
                  <h4 className="font-semibold mb-2">{conta.nome}</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Balance</span>
                      <span className="font-bold">{formatCurrency(conta.saldo)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-500">↗ Income</span>
                      <span className="text-green-500">{formatCurrency(conta.receitas)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-red-500">↘ Expenses</span>
                      <span className="text-red-500">{formatCurrency(conta.despesas)}</span>
                    </div>
                  </div>
                </Card>
              ))}

              <NewAccountDialog onAddAccount={handleAddAccount}>
                <Card className="p-6 bg-secondary border-0 hover:bg-secondary/80 cursor-pointer transition-colors">
                  <div className="flex items-center justify-center py-8 text-muted-foreground">
                    <Plus className="h-6 w-6 mr-2" />
                    <span>Adicionar Nova Conta</span>
                  </div>
                </Card>
              </NewAccountDialog>
            </div>
          </div>

          {/* Transações Recentes - Duas Colunas */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* Coluna de Receitas */}
            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center gap-2 mb-4">
                <ArrowUp className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold text-green-500">Receitas</h3>
              </div>
              <div className="space-y-4">
                {receitas.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma receita encontrada</p>
                    <p className="text-sm">Adicione sua primeira receita</p>
                  </div>
                ) : (
                  receitas.map((receita) => (
                    <div key={receita.id} className="flex items-center justify-between p-4 bg-card rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <receita.icon className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium">{receita.categoria}</p>
                          <p className="text-sm text-muted-foreground">{receita.data}</p>
                          <p className="text-xs text-muted-foreground">Conta: {receita.conta}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold text-green-500">+{formatCurrency(receita.valor)}</p>
                          <p className="text-xs text-muted-foreground">{receita.responsavel}</p>
                          <p className="text-xs text-green-600">Income</p>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" disabled={isDeletingTransaction}>
                              {isDeletingTransaction ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir Receita</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir esta receita? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteTransaction(receita.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Coluna de Despesas */}
            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center gap-2 mb-4">
                <ArrowDown className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold text-red-500">Despesas</h3>
              </div>
              <div className="space-y-4">
                {despesas.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma despesa encontrada</p>
                    <p className="text-sm">Adicione sua primeira despesa</p>
                  </div>
                ) : (
                  despesas.map((despesa) => (
                    <div key={despesa.id} className="flex items-center justify-between p-4 bg-card rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                          <despesa.icon className="h-4 w-4 text-red-500" />
                        </div>
                        <div>
                          <p className="font-medium">{despesa.categoria}</p>
                          <p className="text-sm text-muted-foreground">{despesa.data}</p>
                          <p className="text-xs text-muted-foreground">Conta: {despesa.conta}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold text-red-500">-{formatCurrency(despesa.valor)}</p>
                          <p className="text-xs text-muted-foreground">{despesa.responsavel}</p>
                          <p className="text-xs text-red-600">Expense</p>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" disabled={isDeletingTransaction}>
                              {isDeletingTransaction ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir Despesa</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir esta despesa? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteTransaction(despesa.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </FinancialLayout>
    </ProtectedFinancialRoute>
  );
};

export default Financeiro;
