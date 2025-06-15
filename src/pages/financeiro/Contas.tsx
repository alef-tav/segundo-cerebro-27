
import { FinancialLayout } from "@/components/financial/FinancialLayout";
import { FinancialTypeSelector } from "@/components/financial/FinancialTypeSelector";
import { useFinancialContext } from "@/contexts/FinancialContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wallet, CreditCard, Building } from "lucide-react";

export default function Contas() {
  const { financialType } = useFinancialContext();

  const contasPessoais = [
    { 
      id: 1, 
      nome: "Banco PagSeguro", 
      tipo: "Conta Corrente", 
      saldo: 15000.00, 
      icon: Building,
      cor: "bg-blue-500" 
    },
    { 
      id: 2, 
      nome: "Cartão de Crédito", 
      tipo: "Cartão", 
      saldo: -2500.00, 
      icon: CreditCard,
      cor: "bg-purple-500" 
    },
    { 
      id: 3, 
      nome: "Banco Inter", 
      tipo: "Conta Corrente", 
      saldo: 8750.00, 
      icon: Building,
      cor: "bg-orange-500" 
    },
  ];

  const contasEmpresariais = [
    { 
      id: 1, 
      nome: "Conta Empresarial Principal", 
      tipo: "Conta Corrente PJ", 
      saldo: 85000.00, 
      icon: Building,
      cor: "bg-green-500" 
    },
    { 
      id: 2, 
      nome: "Conta de Investimentos", 
      tipo: "Conta Investimento", 
      saldo: 150000.00, 
      icon: Wallet,
      cor: "bg-blue-500" 
    },
    { 
      id: 3, 
      nome: "Cartão Empresarial", 
      tipo: "Cartão Corporativo", 
      saldo: -8500.00, 
      icon: CreditCard,
      cor: "bg-red-500" 
    },
  ];

  const contas = financialType === 'pessoal' ? contasPessoais : contasEmpresariais;

  const calcularTotais = () => {
    const totalPositivo = contas.filter(c => c.saldo > 0).reduce((sum, c) => sum + c.saldo, 0);
    const totalNegativo = contas.filter(c => c.saldo < 0).reduce((sum, c) => sum + Math.abs(c.saldo), 0);
    const patrimonio = totalPositivo - totalNegativo;
    return { totalPositivo, totalNegativo, patrimonio };
  };

  const { totalPositivo, totalNegativo, patrimonio } = calcularTotais();

  return (
    <FinancialLayout>
      <div className="space-y-8">
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
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nova Conta
          </Button>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {contas.map((conta) => (
            <Card key={conta.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${conta.cor}`}>
                    <conta.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{conta.nome}</h3>
                    <p className="text-sm text-muted-foreground">{conta.tipo}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Saldo atual</p>
                <p className={`text-2xl font-bold ${conta.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  R$ {Math.abs(conta.saldo).toFixed(2).replace('.', ',')}
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Extrato
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Resumo das contas */}
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
