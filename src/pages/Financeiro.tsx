
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, TrendingDown, Plus, ArrowUp, ArrowDown, Wallet } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Financeiro = () => {
  const transacoes = [
    { data: "2023-06-01", categoria: "Salário", descricao: "Salário mensal", tipo: "Receita", valor: 15000.00 },
    { data: "2023-06-01", categoria: "Freelance", descricao: "Projeto freelance", tipo: "Receita", valor: 10000.00 },
    { data: "2023-06-02", categoria: "Aluguel", descricao: "Aluguel do apartamento", tipo: "Despesa", valor: 2500.00 },
    { data: "2023-06-03", categoria: "Alimentação", descricao: "Compras do mês", tipo: "Despesa", valor: 1500.00 },
    { data: "2023-06-03", categoria: "Transporte", descricao: "Combustível e transporte", tipo: "Despesa", valor: 1000.00 },
  ];

  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Finanças Pessoais e Empresariais</h1>
        <p className="text-muted-foreground">
          Gerencie suas finanças pessoais e empresariais de forma integrada.
        </p>
      </div>

      <Tabs defaultValue="pessoais" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pessoais">Finanças Pessoais</TabsTrigger>
          <TabsTrigger value="empresariais">Finanças Empresariais</TabsTrigger>
        </TabsList>

        <TabsContent value="pessoais" className="space-y-6">
          {/* Cards de Resumo */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saldo Total</p>
                  <p className="text-2xl font-bold text-green-500">R$ 70.000,00</p>
                </div>
                <Wallet className="h-8 w-8 text-green-500" />
              </div>
            </Card>

            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Receita Total</p>
                  <p className="text-2xl font-bold text-blue-500">R$ 105.000,00</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </Card>

            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Despesas Totais</p>
                  <p className="text-2xl font-bold text-red-500">R$ 35.000,00</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-500" />
              </div>
            </Card>
          </div>

          {/* Cards Detalhados */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Saldo</span>
              </div>
              <p className="text-xl font-bold text-green-500">R$ 20.000,00</p>
            </Card>

            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Receita</span>
              </div>
              <p className="text-xl font-bold text-blue-500">R$ 25.000,00</p>
            </Card>

            <Card className="p-6 bg-secondary border-0">
              <div className="flex items-center gap-2 mb-2">
                <ArrowDown className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Despesas</span>
              </div>
              <p className="text-xl font-bold text-red-500">R$ 5.000,00</p>
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

          {/* Adicionar Nova Transação */}
          <Card className="p-6 bg-secondary border-0">
            <h3 className="text-xl font-semibold mb-4">Adicionar Nova Transação</h3>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-5">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Receita" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receita">Receita</SelectItem>
                  <SelectItem value="despesa">Despesa</SelectItem>
                </SelectContent>
              </Select>
              
              <Input placeholder="Categoria" />
              <Input placeholder="Valor" type="number" />
              <Input placeholder="dd/mm/aaaa" type="date" />
              <Input placeholder="Descrição" />
            </div>
            <Button className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Transação
            </Button>
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
