
import { FinancialLayout } from "@/components/financial/FinancialLayout";
import { FinancialTypeSelector } from "@/components/financial/FinancialTypeSelector";
import { NewAccountDialog } from "@/components/financial/NewAccountDialog";
import { useFinancialContext } from "@/contexts/FinancialContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, TrendingUp, TrendingDown, Plus, ArrowUp, ArrowDown, Wallet, Building, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/currency";

const Financeiro = () => {
  const { financialType, setFinancialType } = useFinancialContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("receita");

  // Estado para contas pessoais
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
    },
    { 
      id: 2, 
      nome: "Cartão de Crédito", 
      tipo: "Cartão", 
      saldo: -2500.00, 
      icon: Building,
      cor: "bg-purple-500",
      receitas: 0.00,
      despesas: 326.25,
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
    },
  ]);

  // Estado para contas empresariais
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
    },
    { 
      id: 2, 
      nome: "Conta de Investimentos", 
      tipo: "Conta Investimento", 
      saldo: 150000.00, 
      icon: Building,
      cor: "bg-blue-500",
      receitas: 0.00,
      despesas: 0.00,
    },
    { 
      id: 3, 
      nome: "Cartão Empresarial", 
      tipo: "Cartão Corporativo", 
      saldo: -8500.00, 
      icon: Building,
      cor: "bg-red-500",
      receitas: 0.00,
      despesas: 8500.00,
    },
  ]);

  // Estado para transações pessoais
  const [receitasPessoais, setReceitasPessoais] = useState([
    { 
      id: 1,
      data: "13/06/25", 
      categoria: "Salário", 
      descricao: "Salário", 
      valor: 500.00, 
      conta: "Banco Inter",
      responsavel: "Fernando",
      icon: Building
    },
    { 
      id: 2,
      data: "13/06/25", 
      categoria: "Mentoria", 
      descricao: "Mentoria", 
      valor: 1000.00, 
      conta: "Banco PagSeguro",
      responsavel: "Fernando",
      icon: Building
    },
  ]);

  const [despesasPessoais, setDespesasPessoais] = useState([
    { 
      id: 3,
      data: "13/06/25", 
      categoria: "Mercadinha", 
      descricao: "Mercadinha", 
      valor: 200.00, 
      conta: "Banco PagSeguro",
      responsavel: "Fernando",
      icon: Building
    },
    { 
      id: 4,
      data: "13/06/25", 
      categoria: "Cartão de Crédito", 
      descricao: "Cartão de Crédito", 
      valor: 326.25, 
      conta: "Cartão de Crédito",
      responsavel: "Fernando",
      icon: Building
    },
  ]);

  // Estado para transações empresariais
  const [receitasEmpresariais, setReceitasEmpresariais] = useState([
    { 
      id: 5,
      data: "13/06/25", 
      categoria: "Vendas", 
      descricao: "Venda de Produtos", 
      valor: 25000.00, 
      conta: "Conta Empresarial",
      responsavel: "Empresa",
      icon: Building
    },
    { 
      id: 6,
      data: "12/06/25", 
      categoria: "Consultoria", 
      descricao: "Serviços de Consultoria", 
      valor: 15000.00, 
      conta: "Conta Empresarial",
      responsavel: "Empresa",
      icon: Building
    },
  ]);

  const [despesasEmpresariais, setDespesasEmpresariais] = useState([
    { 
      id: 7,
      data: "13/06/25", 
      categoria: "Fornecedores", 
      descricao: "Compra de Materiais", 
      valor: 8000.00, 
      conta: "Conta Empresarial",
      responsavel: "Empresa",
      icon: Building
    },
    { 
      id: 8,
      data: "12/06/25", 
      categoria: "Salários", 
      descricao: "Folha de Pagamento", 
      valor: 12000.00, 
      conta: "Conta Empresarial",
      responsavel: "Empresa",
      icon: Building
    },
  ]);

  // Calcular totais
  const totalReceitasPessoais = receitasPessoais.reduce((total, receita) => total + receita.valor, 0);
  const totalDespesasPessoais = despesasPessoais.reduce((total, despesa) => total + despesa.valor, 0);
  const totalReceitasEmpresariais = receitasEmpresariais.reduce((total, receita) => total + receita.valor, 0);
  const totalDespesasEmpresariais = despesasEmpresariais.reduce((total, despesa) => total + despesa.valor, 0);
  
  const saldoPessoal = contasPessoais.reduce((total, conta) => total + conta.saldo, 0);
  const saldoEmpresarial = contasEmpresariais.reduce((total, conta) => total + conta.saldo, 0);

  // Função para adicionar nova conta
  const handleAddAccount = (novaConta: any) => {
    if (financialType === 'pessoal') {
      setContasPessoais(prev => [...prev, { ...novaConta, icon: Building }]);
    } else {
      setContasEmpresariais(prev => [...prev, { ...novaConta, icon: Building }]);
    }
  };

  // Funções para deletar transações
  const deleteReceita = (id: number, tipo: 'pessoal' | 'empresarial') => {
    if (tipo === 'pessoal') {
      setReceitasPessoais(prev => prev.filter(item => item.id !== id));
    } else {
      setReceitasEmpresariais(prev => prev.filter(item => item.id !== id));
    }
  };

  const deleteDespesa = (id: number, tipo: 'pessoal' | 'empresarial') => {
    if (tipo === 'pessoal') {
      setDespesasPessoais(prev => prev.filter(item => item.id !== id));
    } else {
      setDespesasEmpresariais(prev => prev.filter(item => item.id !== id));
    }
  };

  // Obter dados baseado no tipo financeiro atual
  const contas = financialType === 'pessoal' ? contasPessoais : contasEmpresariais;
  const receitas = financialType === 'pessoal' ? receitasPessoais : receitasEmpresariais;
  const despesas = financialType === 'pessoal' ? despesasPessoais : despesasEmpresariais;
  const totalReceitas = financialType === 'pessoal' ? totalReceitasPessoais : totalReceitasEmpresariais;
  const totalDespesas = financialType === 'pessoal' ? totalDespesasPessoais : totalDespesasEmpresariais;
  const saldo = financialType === 'pessoal' ? saldoPessoal : saldoEmpresarial;
  const totalTransacoes = receitas.length + despesas.length;

  const handleSaveTransaction = () => {
    console.log("Salvando transação...");
    setIsModalOpen(false);
  };

  return (
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
                <SelectItem value="banco-inter">Banco Inter</SelectItem>
                <SelectItem value="pagseguro">PagSeguro</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="todos-periodos">
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

                  {/* Valor e Data */}
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

                  {/* Categoria e Subcategoria */}
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

                  {/* Status e Responsável */}
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

                  {/* Conta */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Conta</label>
                    <Select defaultValue="banco-pagseguro">
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="banco-pagseguro">Banco PagSeguro</SelectItem>
                        <SelectItem value="banco-inter">Banco Inter</SelectItem>
                        <SelectItem value="cartao-credito">Cartão de Crédito</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Observações */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Observações</label>
                    <textarea 
                      placeholder="Detalhes adicionais..."
                      className="w-full h-20 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400 resize-none"
                    />
                  </div>

                  {/* Botão Salvar */}
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
          <span>Período selecionado: Todos os períodos</span>
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
              {receitas.map((receita) => (
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
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
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
                            onClick={() => deleteReceita(receita.id, financialType)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Coluna de Despesas */}
          <Card className="p-6 bg-secondary border-0">
            <div className="flex items-center gap-2 mb-4">
              <ArrowDown className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-semibold text-red-500">Despesas</h3>
            </div>
            <div className="space-y-4">
              {despesas.map((despesa) => (
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
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
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
                            onClick={() => deleteDespesa(despesa.id, financialType)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </FinancialLayout>
  );
};

export default Financeiro;
