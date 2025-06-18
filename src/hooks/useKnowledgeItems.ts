
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface KnowledgeItem {
  id: string;
  user_id: string;
  title: string;
  type: 'livro' | 'curso' | 'artigo';
  status: 'a-fazer' | 'em-andamento' | 'concluido';
  description?: string | null;
  url?: string | null;
  email?: string | null;
  password?: string | null;
  pdf_file_name?: string | null;
  image_file_name?: string | null;
  created_at: string;
  updated_at: string;
}

export function useKnowledgeItems() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Function to transform database data to match our interface
  const transformDatabaseItem = (dbItem: any): KnowledgeItem => ({
    id: dbItem.id,
    user_id: dbItem.user_id,
    title: dbItem.title,
    type: dbItem.type as 'livro' | 'curso' | 'artigo',
    status: dbItem.status as 'a-fazer' | 'em-andamento' | 'concluido',
    description: dbItem.description,
    url: dbItem.url,
    email: dbItem.email,
    password: dbItem.password,
    pdf_file_name: dbItem.pdf_file_name,
    image_file_name: dbItem.image_file_name,
    created_at: dbItem.created_at,
    updated_at: dbItem.updated_at,
  });

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
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching knowledge items:', error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar itens",
          description: "Não foi possível carregar os itens de conhecimento."
        });
        return;
      }

      const transformedItems = data?.map(transformDatabaseItem) || [];
      setItems(transformedItems);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado ao carregar os itens."
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [user]);

  const addItem = async (newItem: Omit<KnowledgeItem, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('knowledge_items')
        .insert([{
          user_id: user.id,
          title: newItem.title,
          type: newItem.type,
          status: newItem.status,
          description: newItem.description,
          url: newItem.url,
          email: newItem.email,
          password: newItem.password,
          pdf_file_name: newItem.pdf_file_name,
          image_file_name: newItem.image_file_name,
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding knowledge item:', error);
        toast({
          variant: "destructive",
          title: "Erro ao adicionar item",
          description: "Não foi possível adicionar o item de conhecimento."
        });
        return;
      }

      const transformedItem = transformDatabaseItem(data);
      setItems(prev => [transformedItem, ...prev]);
      
      toast({
        title: "Item adicionado!",
        description: "O item de conhecimento foi adicionado com sucesso."
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado ao adicionar o item."
      });
    }
  };

  const updateItem = async (id: string, updates: Partial<Omit<KnowledgeItem, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('knowledge_items')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating knowledge item:', error);
        toast({
          variant: "destructive",
          title: "Erro ao atualizar item",
          description: "Não foi possível atualizar o item de conhecimento."
        });
        return;
      }

      const transformedItem = transformDatabaseItem(data);
      setItems(prev => prev.map(item => item.id === id ? transformedItem : item));
      
      toast({
        title: "Item atualizado!",
        description: "O item de conhecimento foi atualizado com sucesso."
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado ao atualizar o item."
      });
    }
  };

  const deleteItem = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('knowledge_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting knowledge item:', error);
        toast({
          variant: "destructive",
          title: "Erro ao excluir item",
          description: "Não foi possível excluir o item de conhecimento."
        });
        return;
      }

      setItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Item excluído!",
        description: "O item de conhecimento foi excluído com sucesso."
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado ao excluir o item."
      });
    }
  };

  return {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem,
    refetch: fetchItems,
  };
}
