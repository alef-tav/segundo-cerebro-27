import { FinancialLayout } from "@/components/financial/FinancialLayout";
import { FinancialTypeSelector } from "@/components/financial/FinancialTypeSelector";
import { useFinancialContext } from "@/contexts/FinancialContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, TrendingDown, Plus, ArrowUp, ArrowDown, Wallet, Building, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";

const Financeiro = () => {
  const { financialType, setFinancialType } = useFinancialContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pessoal");
  const [transactionType, setTransactionType] = useState("receita");

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

  // Cálculos dinâmicos para finanças pessoais
  const totalReceitasPessoais = receitasPessoais.reduce((sum, receita) => sum + receita.valor, 0);
  const totalDespesasPessoais = despesasPessoais.reduce((sum, despesa) => sum + despesa.valor, 0);
  const saldoPessoal = totalReceitasPessoais - totalDespesasPessoais;
  const totalTransacoesPessoais = receitasPessoais.length + despesasPessoais.length;

  // Cálculos dinâmicos para finanças empresariais
  const totalReceitasEmpresariais = receitasEmpresariais.reduce((sum, receita) => sum + receita.valor, 0);
  const totalDespesasEmpresariais = despesasEmpresariais.reduce((sum, despesa) => sum + despesa.valor, 0);
  const saldoEmpresarial = totalReceitasEmpresariais - totalDespesasEmpresariais;

  // Sincronizar as abas com o contexto
  useEffect(() => {
    setFinancialType(financialType);
  }, []);

  const handleTabChange = (value: string) => {
    setFinancialType(value as 'pessoal' | 'empresarial');
  };

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

        <Tabs value={financialType} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pessoal">Finanças Pessoais</TabsTrigger>
            <TabsTrigger value="empresarial">Finanças Empresariais</TabsTrigger>
          </TabsList>

          <TabsContent value="pessoal" className="space-y-6">
            {/* Cards de Resumo */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
              <Card className="p-6 bg-secondary border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Saldo Total</p>
                    <p className={`text-2xl font-bold ${saldoPessoal >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      R$ {saldoPessoal.toFixed(2)}
                    </p>
                  </div>
                  <Wallet className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="p-6 bg-secondary border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Receitas</p>
                    <p className="text-2xl font-bold text-blue-500">R$ {totalReceitasPessoais.toFixed(2)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
              </Card>

              <Card className="p-6 bg-secondary border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Despesas</p>
                    <p className="text-2xl font-bold text-red-500">R$ {totalDespesasPessoais.toFixed(2)}</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-500" />
                </div>
              </Card>

              <Card className="p-6 bg-secondary border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Transações</p>
                    <p className="text-2xl font-bold">{totalTransacoesPessoais}</p>
                    <p className="text-xs text-muted-foreground">Todos os períodos</p>
                  </div>
                  <ArrowUp className="h-8 w-8 text-blue-500" />
                </div>
              </Card>
            </div>

            {/* Contas */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">📊 Contas</h3>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                <Card className="p-6 bg-secondary border-0">
                  <h4 className="font-semibold mb-2">Banco PagSeguro</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Balance</span>
                      <span className="font-bold">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-500">↗ Income</span>
                      <span className="text-green-500">$1000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-red-500">↘ Expenses</span>
                      <span className="text-red-500">$200.00</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-secondary border-0">
                  <h4 className="font-semibold mb-2">Cartão de Crédito</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Balance</span>
                      <span className="font-bold">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-500">↗ Income</span>
                      <span className="text-green-500">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-red-500">↘ Expenses</span>
                      <span className="text-red-500">$326.25</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-secondary border-0">
                  <h4 className="font-semibold mb-2">Banco Inter</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Balance</span>
                      <span className="font-bold">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-500">↗ Income</span>
                      <span className="text-green-500">$500.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-red-500">↘ Expenses</span>
                      <span className="text-red-500">$0.00</span>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-secondary border-0">
                <div className="flex items-center justify-center py-8 text-muted-foreground">
                  <Plus className="h-6 w-6 mr-2" />
                  <span>Adicionar Nova Conta</span>
                </div>
              </Card>
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
                  {receitasPessoais.map((receita) => (
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
                          <p className="font-bold text-green-500">+R$ {receita.valor.toFixed(2)}</p>
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
                                onClick={() => deleteReceita(receita.id, 'pessoal')}
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
                  {despesasPessoais.map((despesa) => (
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
                          <p className="font-bold text-red-500">-R$ {despesa.valor.toFixed(2)}</p>
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
                                onClick={() => deleteDespesa(despesa.id, 'pessoal')}
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
          </TabsContent>

          <TabsContent value="empresarial" className="space-y-6">
            {/* Cards de Resumo Empresarial */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
              <Card className="p-6 bg-secondary border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Saldo Total</p>
                    <p className={`text-2xl font-bold ${saldoEmpresarial >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      R$ {saldoEmpresarial.toFixed(2)}
                    </p>
                  </div>
                  <Wallet className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="p-6 bg-secondary border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Faturamento</p>
                    <p className="text-2xl font-bold text-green-500">R$ {totalReceitasEmpresariais.toFixed(2)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="p-6 bg-secondary border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Custos Operacionais</p>
                    <p className="text-2xl font-bold text-red-500">R$ {totalDespesasEmpresariais.toFixed(2)}</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-500" />
                </div>
              </Card>

              <Card className="p-6 bg-secondary border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Transações</p>
                    <p className="text-2xl font-bold">{receitasEmpresariais.length + despesasEmpresariais.length}</p>
                    <p className="text-xs text-muted-foreground">Todos os períodos</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
              </Card>
            </div>

            {/* Contas Empresariais */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">🏢 Contas Empresariais</h3>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                <Card className="p-6 bg-secondary border-0">
                  <h4 className="font-semibold mb-2">Conta Empresarial Principal</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Balance</span>
                      <span className="font-bold">R$ {saldoEmpresarial.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-500">↗ Income</span>
                      <span className="text-green-500">R$ {totalReceitasEmpresariais.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-red-500">↘ Expenses</span>
                      <span className="text-red-500">R$ {totalDespesasEmpresariais.toFixed(2)}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-secondary border-0">
                  <div className="flex items-center justify-center py-8 text-muted-foreground">
                    <Plus className="h-6 w-6 mr-2" />
                    <span>Adicionar Nova Conta</span>
                  </div>
                </Card>
              </div>
            </div>

            {/* Transações Empresariais - Duas Colunas */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {/* Coluna de Receitas Empresariais */}
              <Card className="p-6 bg-secondary border-0">
                <div className="flex items-center gap-2 mb-4">
                  <ArrowUp className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-green-500">Receitas</h3>
                </div>
                <div className="space-y-4">
                  {receitasEmpresariais.map((receita) => (
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
                          <p className="font-bold text-green-500">+R$ {receita.valor.toFixed(2)}</p>
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
                                Tem certeza que deseja excluir esta receita empresarial? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteReceita(receita.id, 'empresarial')}
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

              {/* Coluna de Despesas Empresariais */}
              <Card className="p-6 bg-secondary border-0">
                <div className="flex items-center gap-2 mb-4">
                  <ArrowDown className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-red-500">Despesas</h3>
                </div>
                <div className="space-y-4">
                  {despesasEmpresariais.map((despesa) => (
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
                          <p className="font-bold text-red-500">-R$ {despesa.valor.toFixed(2)}</p>
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
                                Tem certeza que deseja excluir esta despesa empresarial? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteDespesa(despesa.id, 'empresarial')}
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
          </TabsContent>
        </Tabs>
      </div>
    </FinancialLayout>
  );
};

export default Financeiro;
