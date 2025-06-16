
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, Plus, Search } from "lucide-react";
import { KnowledgeCard, KnowledgeItem } from "@/components/knowledge/KnowledgeCard";
import { NewKnowledgeDialog } from "@/components/knowledge/NewKnowledgeDialog";
import { EditKnowledgeDialog } from "@/components/knowledge/EditKnowledgeDialog";

const Conhecimento = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");

  const handleAddItem = (newItem: Omit<KnowledgeItem, "id" | "createdAt">) => {
    const item: KnowledgeItem = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setItems([...items, item]);
  };

  const handleEditItem = (item: KnowledgeItem) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const handleUpdateItem = (updatedItem: KnowledgeItem) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
    setIsEditDialogOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "todos" || item.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const getTabItems = (type?: string) => {
    if (!type) return filteredItems;
    return filteredItems.filter(item => item.type === type);
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Biblioteca de Conhecimento</h1>
        <p className="text-muted-foreground">
          Organize seus estudos e aprendizados.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Pesquisar itens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Item
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="livro">Livros</TabsTrigger>
          <TabsTrigger value="curso">Cursos</TabsTrigger>
          <TabsTrigger value="artigo">Artigos</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="mt-6">
          {filteredItems.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-lg bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-semibold">Sua biblioteca está vazia</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ? "Nenhum item encontrado para sua pesquisa." : "Comece adicionando seus primeiros livros, cursos ou artigos."}
                  </p>
                </div>
                {!searchTerm && (
                  <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Adicionar Primeiro Item
                  </Button>
                )}
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <KnowledgeCard
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteItem}
                  onEdit={handleEditItem}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="livro" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getTabItems("livro").map((item) => (
              <KnowledgeCard
                key={item.id}
                item={item}
                onDelete={handleDeleteItem}
                onEdit={handleEditItem}
              />
            ))}
          </div>
          {getTabItems("livro").length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                {searchTerm ? "Nenhum livro encontrado." : "Nenhum livro adicionado ainda."}
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="curso" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getTabItems("curso").map((item) => (
              <KnowledgeCard
                key={item.id}
                item={item}
                onDelete={handleDeleteItem}
                onEdit={handleEditItem}
              />
            ))}
          </div>
          {getTabItems("curso").length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                {searchTerm ? "Nenhum curso encontrado." : "Nenhum curso adicionado ainda."}
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="artigo" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getTabItems("artigo").map((item) => (
              <KnowledgeCard
                key={item.id}
                item={item}
                onDelete={handleDeleteItem}
                onEdit={handleEditItem}
              />
            ))}
          </div>
          {getTabItems("artigo").length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                {searchTerm ? "Nenhum artigo encontrado." : "Nenhum artigo adicionado ainda."}
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <NewKnowledgeDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddItem={handleAddItem}
      />

      {editingItem && (
        <EditKnowledgeDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setEditingItem(null);
          }}
          onUpdateItem={handleUpdateItem}
          item={editingItem}
        />
      )}
    </div>
  );
};

export default Conhecimento;
