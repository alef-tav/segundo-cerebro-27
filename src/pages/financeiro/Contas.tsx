
import { FinancialLayout } from "@/components/financial/FinancialLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wallet, CreditCard, Building } from "lucide-react";

export default function Contas() {
  const contas = [
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

  return (
    <FinancialLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Contas</h1>
            <p className="text-muted-foreground">
              Gerencie suas contas bancárias e cartões
            </p>
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
          <h3 className="text-lg font-semibold mb-4">Resumo Geral</h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total em Contas</p>
              <p className="text-2xl font-bold text-green-600">R$ 23.750,00</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total em Dívidas</p>
              <p className="text-2xl font-bold text-red-600">R$ 2.500,00</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Patrimônio Líquido</p>
              <p className="text-2xl font-bold text-blue-600">R$ 21.250,00</p>
            </div>
          </div>
        </Card>
      </div>
    </FinancialLayout>
  );
}
