
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useFinancialContext } from "@/contexts/FinancialContext";
import { formatCurrency } from "@/lib/currency";

interface NewAccountFormData {
  nome: string;
  tipo: string;
  saldoInicial: number;
  cor: string;
}

interface NewAccountDialogProps {
  onAddAccount: (account: any) => void;
}

export function NewAccountDialog({ onAddAccount }: NewAccountDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { financialType } = useFinancialContext();
  const form = useForm<NewAccountFormData>();

  const cores = [
    "bg-blue-500",
    "bg-green-500", 
    "bg-purple-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-indigo-500"
  ];

  const tiposContaPessoal = [
    "Conta Corrente",
    "Conta Poupança", 
    "Cartão de Crédito",
    "Cartão de Débito",
    "Dinheiro"
  ];

  const tiposContaEmpresarial = [
    "Conta Corrente PJ",
    "Conta Investimento",
    "Cartão Corporativo",
    "Conta de Aplicação",
    "Conta de Reserva"
  ];

  const onSubmit = (data: NewAccountFormData) => {
    const novaConta = {
      id: Date.now(),
      nome: data.nome,
      tipo: data.tipo,
      saldo: data.saldoInicial,
      cor: data.cor,
      receitas: 0,
      despesas: 0,
      transacoes: []
    };

    onAddAccount(novaConta);
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nova Conta
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Conta {financialType === 'pessoal' ? 'Pessoal' : 'Empresarial'}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              rules={{ required: "Nome da conta é obrigatório" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Conta</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Conta Corrente Banco XYZ" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipo"
              rules={{ required: "Tipo de conta é obrigatório" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Conta</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(financialType === 'pessoal' ? tiposContaPessoal : tiposContaEmpresarial).map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saldoInicial"
              rules={{ required: "Saldo inicial é obrigatório" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Saldo Atual</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                      <Input 
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        className="pl-8"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cor"
              rules={{ required: "Cor é obrigatória" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-4 gap-2">
                      {cores.map((cor) => (
                        <button
                          key={cor}
                          type="button"
                          className={`w-8 h-8 rounded-full ${cor} ${
                            field.value === cor ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                          }`}
                          onClick={() => field.onChange(cor)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Adicionar Conta
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
