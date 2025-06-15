
import { FinancialLayout } from "@/components/financial/FinancialLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const Configuracoes = () => {
  const [categoriasReceitas, setCategoriasReceitas] = useState([
    "Salário",
    "Freelance", 
    "Investimentos",
    "Vendas",
    "Consultoria",
    "Mentoria",
    "Dividendos"
  ]);

  const [categoriasDespesas, setCategoriasDespesas] = useState([
    "Alimentação",
    "Transporte",
    "Moradia",
    "Saúde",
    "Educação",
    "Lazer",
    "Compras",
    "Fornecedores",
    "Salários",
    "Marketing",
    "Impostos"
  ]);

  const [novaCategoria, setNovaCategoria] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipoCategoria, setTipoCategoria] = useState<"receita" | "despesa">("receita");

  const adicionarCategoria = () => {
    if (novaCategoria.trim()) {
      if (tipoCategoria === "receita") {
        setCategoriasReceitas(prev => [...prev, novaCategoria.trim()]);
      } else {
        setCategoriasDespesas(prev => [...prev, novaCategoria.trim()]);
      }
      setNovaCategoria("");
      setIsModalOpen(false);
    }
  };

  const removerCategoria = (categoria: string, tipo: "receita" | "despesa") => {
    if (tipo === "receita") {
      setCategoriasReceitas(prev => prev.filter(cat => cat !== categoria));
    } else {
      setCategoriasDespesas(prev => prev.filter(cat => cat !== categoria));
    }
  };

  const abrirModal = (tipo: "receita" | "despesa") => {
    setTipoCategoria(tipo);
    setIsModalOpen(true);
  };

  return (
    <FinancialLayout>
      <div className="space-y-8 animate-in">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            <h1 className="font-display text-4xl font-bold">Configurações</h1>
          </div>
          <p className="text-muted-foreground">
            Gerencie categorias, contas e outras configurações do sistema financeiro
          </p>
        </div>

        <Tabs defaultValue="categorias" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categorias">Categorias</TabsTrigger>
            <TabsTrigger value="contas">Contas</TabsTrigger>
            <TabsTrigger value="geral">Geral</TabsTrigger>
          </TabsList>

          <TabsContent value="categorias" className="space-y-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {/* Categorias de Receitas */}
              <Card className="p-6 bg-secondary border-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-green-500" />
                    <h3 className="text-lg font-semibold text-green-500">Categorias de Receitas</h3>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => abrirModal("receita")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {categoriasReceitas.map((categoria, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                      <Badge variant="secondary" className="text-green-600 bg-green-100">
                        {categoria}
                      </Badge>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Categoria</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir a categoria "{categoria}"? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => removerCategoria(categoria, "receita")}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Categorias de Despesas */}
              <Card className="p-6 bg-secondary border-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-red-500" />
                    <h3 className="text-lg font-semibold text-red-500">Categorias de Despesas</h3>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => abrirModal("despesa")}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {categoriasDespesas.map((categoria, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                      <Badge variant="secondary" className="text-red-600 bg-red-100">
                        {categoria}
                      </Badge>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Categoria</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir a categoria "{categoria}"? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => removerCategoria(categoria, "despesa")}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contas" className="space-y-6">
            <Card className="p-6 bg-secondary border-0">
              <h3 className="text-lg font-semibold mb-4">Gerenciamento de Contas</h3>
              <p className="text-muted-foreground">
                As contas podem ser gerenciadas diretamente no Dashboard principal através do botão "Adicionar Nova Conta".
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="geral" className="space-y-6">
            <Card className="p-6 bg-secondary border-0">
              <h3 className="text-lg font-semibold mb-4">Configurações Gerais</h3>
              <p className="text-muted-foreground">
                Configurações gerais do sistema financeiro serão implementadas em futuras versões.
              </p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal para Adicionar Categoria */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Nova Categoria de {tipoCategoria === "receita" ? "Receita" : "Despesa"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome da Categoria</label>
                <Input 
                  placeholder="Digite o nome da categoria"
                  value={novaCategoria}
                  onChange={(e) => setNovaCategoria(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && adicionarCategoria()}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={adicionarCategoria}
                  className={`flex-1 ${tipoCategoria === "receita" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                  disabled={!novaCategoria.trim()}
                >
                  Adicionar Categoria
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </FinancialLayout>
  );
};

export default Configuracoes;
