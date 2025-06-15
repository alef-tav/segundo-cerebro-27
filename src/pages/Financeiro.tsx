
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, TrendingDown, Plus, ArrowUp, ArrowDown, Wallet, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const Financeiro = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pessoais");
  const [transactionType, setTransactionType] = useState("receita");

  const transacoes = [
    { data: "2023-06-01", categoria: "Salário", descricao: "Salário mensal", tipo: "Receita", valor: 15000.00 },
    { data: "2023-06-01", categoria: "Freelance", descricao: "Projeto freelance", tipo: "Receita", valor: 10000.00 },
    { data: "2023-06-02", categoria: "Aluguel", descricao: "Aluguel do apartamento", tipo: "Despesa", valor: 2500.00 },
    { data: "2023-06-03", categoria: "Alimentação", descricao: "Compras do mês", tipo: "Despesa", valor: 1500.00 },
    { data: "2023-06-03", categoria: "Transporte", descricao: "Combustível e transporte", tipo: "Despesa", valor: 1000.00 },
  ];

  const handleSaveTransaction = () => {
    // Aqui você adicionaria a lógica para salvar a transação
    console.log("Salvando transação...");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-bold">Dashboard Financeiro</h1>
          <p className="text-muted-foreground">
            Acompanhe suas receitas e despesas
          </p>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pessoais">Finanças Pessoais</TabsTrigger>
          <TabsTrigger value="empresariais">Finanças Empresariais</TabsTrigger>
        </TabsList>

        <TabsContent value="pessoais" className="space-y-6">
          {/* Cards de Resumo */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saldo Total</p>
                  <p className="text-2xl font-bold text-green-500">$973.75</p>
                </div>
                <Wallet className="h-8 w-8 text-green-500" />
              </div>
            </Card>

            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Receitas</p>
                  <p className="text-2xl font-bold text-blue-500">$1500.00</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </Card>

            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Despesas</p>
                  <p className="text-2xl font-bold text-red-500">$526.25</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-500" />
              </div>
            </Card>

            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Transações</p>
                  <p className="text-2xl font-bold">4</p>
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

          {/* Transações Recentes */}
          <Card className="p-6 bg-secondary border-0">
            <h3 className="text-xl font-semibold mb-4">Transações Recentes</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transacoes.map((transacao, index) => (
                    <TableRow key={index}>
                      <TableCell>{transacao.data}</TableCell>
                      <TableCell>{transacao.categoria}</TableCell>
                      <TableCell>{transacao.descricao}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transacao.tipo === 'Receita' 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-red-500/20 text-red-500'
                        }`}>
                          {transacao.tipo}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={transacao.tipo === 'Receita' ? 'text-green-500' : 'text-red-500'}>
                          R$ {transacao.valor.toFixed(2).replace('.', ',')}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="empresariais" className="space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Faturamento</p>
                  <p className="text-2xl font-bold text-green-500">R$ 150.000,00</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </Card>

            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Custos Operacionais</p>
                  <p className="text-2xl font-bold text-orange-500">R$ 85.000,00</p>
                </div>
                <TrendingDown className="h-8 w-8 text-orange-500" />
              </div>
            </Card>

            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Lucro Líquido</p>
                  <p className="text-2xl font-bold text-blue-500">R$ 65.000,00</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-secondary border-0">
            <h3 className="text-xl font-semibold mb-4">Fluxo de Caixa Empresarial</h3>
            <p className="text-muted-foreground">
              Acompanhe o fluxo de caixa da sua empresa e projete cenários futuros.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Financeiro;
