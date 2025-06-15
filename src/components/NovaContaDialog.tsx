
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Plus } from "lucide-react";

type NovaContaDialogProps = {
  onAdd: (conta: ContaTipo) => void;
};

export type ContaTipo = {
  nome: string;
  tipo: "corrente" | "credito";
  saldoInicial: number;
  responsavel: string;
};

export function NovaContaDialog({ onAdd }: NovaContaDialogProps) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<"corrente" | "credito">("corrente");
  const [saldo, setSaldo] = useState("");
  const [responsavel, setResponsavel] = useState("");

  function handleSalvar() {
    if (!nome || !saldo) return;
    onAdd({
      nome,
      tipo,
      saldoInicial: parseFloat(saldo.replace(",", ".")),
      responsavel,
    });
    setNome("");
    setTipo("corrente");
    setSaldo("");
    setResponsavel("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Conta
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Nova Conta ou Cartão</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-300">Tipo</label>
            <Select value={tipo} onValueChange={v => setTipo(v as "corrente" | "credito")}>
              <SelectTrigger className="bg-slate-700 text-white border-slate-600 mt-1">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="corrente">Conta Corrente</SelectItem>
                <SelectItem value="credito">Cartão de Crédito</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-gray-300">Nome da Conta</label>
            <Input value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Banco Inter" className="bg-slate-700 text-white border-slate-600 mt-1" />
          </div>
          <div>
            <label className="text-sm text-gray-300">Saldo Inicial</label>
            <Input value={saldo} onChange={e => setSaldo(e.target.value)} placeholder="0,00" className="bg-slate-700 text-white border-slate-600 mt-1" />
          </div>
          <div>
            <label className="text-sm text-gray-300">Responsável</label>
            <Input value={responsavel} onChange={e => setResponsavel(e.target.value)} placeholder="Nome" className="bg-slate-700 text-white border-slate-600 mt-1" />
          </div>
          <Button onClick={handleSalvar} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

