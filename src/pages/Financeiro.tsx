import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, TrendingDown, Plus, ArrowUp, ArrowDown, Wallet, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { NovaContaDialog, ContaTipo } from "../components/NovaContaDialog";

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
  const [contas, setContas] = useState<ContaTipo[]>([
    { nome: "Banco PagSeguro", tipo: "corrente", saldoInicial: 0, responsavel: "Usuário" },
    { nome: "Cartão de Crédito", tipo: "credito", saldoInicial: 0, responsavel: "Usuário" },
    { nome: "Banco Inter", tipo: "corrente", saldoInicial: 0, responsavel: "Usuário" },
  ]);
  const [contaSelecionada, setContaSelecionada] = useState(0);

  function handleNovaConta(conta: ContaTipo) {
    setContas(prev => [...prev, conta]);
    // Ideal: adicionar um toast confirmando cadastro ✅
  }

  return (
    <div className="space-y-8 animate-in">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-bold">Contas</h1>
          <p className="text-muted-foreground">Gerencie suas contas bancárias e cartões</p>
        </div>
        <NovaContaDialog onAdd={handleNovaConta} />
      </div>

      {/* Minhas Contas & Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar de contas */}
        <div className="bg-slate-800 rounded-lg p-4 min-w-[220px] max-w-md">
          <h2 className="text-white text-lg font-semibold mb-4">Minhas Contas</h2>
          <ul className="space-y-2">
            {contas.map((conta, idx) => (
              <li key={conta.nome}>
                <button
                  className={`flex items-center px-3 py-2 rounded-lg w-full text-left transition ${
                    contaSelecionada === idx
                      ? "bg-slate-700 text-white font-bold"
                      : "bg-transparent text-white/80 hover:bg-slate-700"
                  }`}
                  onClick={() => setContaSelecionada(idx)}
                >
                  <span className="mr-2">
                    {conta.tipo === "corrente" ? (
                      <svg width={18} height={18} className="inline" fill="none" stroke="currentColor" strokeWidth={2}><rect x={2} y={5} width={14} height={8} rx={2} /><path d="M2 13h14" /></svg>
                    ) : (
                      <svg width={18} height={18} className="inline" fill="none" stroke="currentColor" strokeWidth={2}><rect x={3} y={4} width={12} height={10} rx={2} /><path d="M10 8h4" /></svg>
                    )}
                  </span>
                  <div>
                    <div className="leading-tight">{conta.nome}</div>
                    <div className="text-xs text-gray-400">{conta.tipo === "corrente" ? "Conta Corrente" : "Cartão de Crédito"}</div>
                  </div>
                  <span className="flex-1" />
                  {contaSelecionada === idx && (
                    <svg width={16} height={16} fill="none" stroke="#60a5fa" strokeWidth={2} className="ml-2"><path d="M5 8l2 2 4-4" /></svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Card detalhes da conta */}
        <div className="md:col-span-2 flex flex-col gap-8">
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white text-xl font-bold">{contas[contaSelecionada]?.nome}</div>
                <div className="text-xs text-gray-400">{contas[contaSelecionada]?.tipo === "corrente" ? "Conta Corrente" : "Cartão de Crédito"}</div>
                <div className="mt-4 flex gap-8">
                  <div>
                    <div className="text-sm text-muted-foreground">Saldo Atual</div>
                    <div className="text-2xl font-bold text-white">R$ {contas[contaSelecionada]?.saldoInicial?.toFixed(2) || "0,00"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Receitas</div>
                    <div className="text-2xl font-bold text-green-500">R$ 1000.00</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Despesas</div>
                    <div className="text-2xl font-bold text-red-500">R$ 200.00</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button title="Editar" className="p-2 rounded hover:bg-slate-700 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><path d="M15.5 6.5l-8.86 8.86c-.27.27-.61.46-.98.54l-3 1 .97-3c.08-.37.27-.71.54-.98l8.86-8.86a2.12 2.12 0 113 3z" /></svg>
                </button>
                <button title="Excluir" className="p-2 rounded hover:bg-slate-700 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h12M5 6v10a2 2 0 002 2h2a2 2 0 002-2V6m3-2H4a2 2 0 00-2 2v0a2 2 0 002 2h12a2 2 0 002-2v0a2 2 0 00-2-2z" /></svg>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Histórico de Transações</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-gray-400 text-xs">
                    <th className="py-2 pr-6 text-left">DATA</th>
                    <th className="py-2 pr-6 text-left">CATEGORIA</th>
                    <th className="py-2 pr-6 text-left">DESCRIÇÃO</th>
                    <th className="py-2 pr-6 text-left">VALOR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1 text-white">13/06/2025</td>
                    <td className="py-1 text-white flex items-center gap-2">
                      <svg width={16} height={16} fill="none" stroke="#60a5fa" strokeWidth={2}><circle cx={8} cy={8} r={7} /></svg>
                      Alimentação
                    </td>
                    <td className="py-1 text-white">Mercadinho</td>
                    <td className="py-1 font-bold text-red-400">-R$ 200.00</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-white">13/06/2025</td>
                    <td className="py-1 text-white flex items-center gap-2">
                      <svg width={16} height={16} fill="none" stroke="#60a5fa" strokeWidth={2}><circle cx={8} cy={8} r={7} /></svg>
                      Salário
                    </td>
                    <td className="py-1 text-white">Mentoria</td>
                    <td className="py-1 font-bold text-green-400">+R$ 1000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financeiro;
