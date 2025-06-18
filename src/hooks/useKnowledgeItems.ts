
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface KnowledgeItem {
  id: string;
  title: string;
  type: "livro" | "curso" | "artigo";
  status: "a-fazer" | "em-andamento" | "concluido";
  description?: string;
  url?: string;
  email?: string;
  password?: string;
  pdf_file_name?: string;
  image_file_name?: string;
  created_at: Date;
  updated_at: Date;
}

export const useKnowledgeItems = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchItems = async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('knowledge_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching knowledge items:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar os itens de conhecimento."
        });
        return;
      }

      const formattedItems = data.map(item => ({
        ...item,
        created_at: new Date(item.created_at),
        updated_at: new Date(item.updated_at)
      }));

      setItems(formattedItems);
    } catch (error) {
      console.error('Error fetching knowledge items:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro inesperado ao carregar os itens."
      });
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (newItem: Omit<KnowledgeItem, "id" | "created_at" | "updated_at">) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('knowledge_items')
        .insert([{
          ...newItem,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding knowledge item:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível adicionar o item."
        });
        return;
      }

      const formattedItem = {
        ...data,
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at)
      };

      setItems(prev => [formattedItem, ...prev]);
      toast({
        title: "Sucesso",
        description: "Item adicionado com sucesso!"
      });
    } catch (error) {
      console.error('Error adding knowledge item:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro inesperado."
      });
    }
  };

  const updateItem = async (updatedItem: KnowledgeItem) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('knowledge_items')
        .update({
          title: updatedItem.title,
          type: updatedItem.type,
          status: updatedItem.status,
          description: updatedItem.description,
          url: updatedItem.url,
          email: updatedItem.email,
          password: updatedItem.password,
          pdf_file_name: updatedItem.pdf_file_name,
          image_file_name: updatedItem.image_file_name,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedItem.id);

      if (error) {
        console.error('Error updating knowledge item:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível atualizar o item."
        });
        return;
      }

      setItems(prev => prev.map(item => 
        item.id === updatedItem.id 
          ? { ...updatedItem, updated_at: new Date() }
          : item
      ));

      toast({
        title: "Sucesso",
        description: "Item atualizado com sucesso!"
      });
    } catch (error) {
      console.error('Error updating knowledge item:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro inesperado."
      });
    }
  };

  const deleteItem = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('knowledge_items')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting knowledge item:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível excluir o item."
        });
        return;
      }

      setItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Sucesso",
        description: "Item excluído com sucesso!"
      });
    } catch (error) {
      console.error('Error deleting knowledge item:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro inesperado."
      });
    }
  };

  useEffect(() => {
    fetchItems();
  }, [user]);

  return {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem,
    refetch: fetchItems
  };
};
