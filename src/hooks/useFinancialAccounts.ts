
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Building } from 'lucide-react';

export interface FinancialAccount {
  id: string;
  nome: string;
  tipo: string;
  saldo: number;
  cor: string;
  receitas: number;
  despesas: number;
  financial_type: 'pessoal' | 'empresarial';
  icon: typeof Building;
  transacoes?: any[];
}

export function useFinancialAccounts(financialType: 'pessoal' | 'empresarial') {
  const queryClient = useQueryClient();

  // Buscar contas do usuário
  const { data: accounts = [], isLoading, error } = useQuery({
    queryKey: ['financial-accounts', financialType],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('financial_accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('financial_type', financialType)
        .order('created_at', { ascending: true });

      if (error) throw error;

      return data.map((account: any) => ({
        ...account,
        icon: Building,
        transacoes: []
      }));
    },
    enabled: !!financialType
  });

  // Adicionar nova conta
  const addAccountMutation = useMutation({
    mutationFn: async (newAccount: Omit<FinancialAccount, 'id' | 'icon' | 'transacoes'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('financial_accounts')
        .insert([{
          ...newAccount,
          user_id: user.id,
          financial_type: financialType
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-accounts', financialType] });
    }
  });

  // Excluir conta
  const deleteAccountMutation = useMutation({
    mutationFn: async (accountId: string) => {
      const { error } = await supabase
        .from('financial_accounts')
        .delete()
        .eq('id', accountId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-accounts', financialType] });
    }
  });

  // Atualizar conta
  const updateAccountMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<FinancialAccount> & { id: string }) => {
      const { data, error } = await supabase
        .from('financial_accounts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-accounts', financialType] });
    }
  });

  return {
    accounts,
    isLoading,
    error,
    addAccount: addAccountMutation.mutate,
    deleteAccount: deleteAccountMutation.mutate,
    updateAccount: updateAccountMutation.mutate,
    isAddingAccount: addAccountMutation.isPending,
    isDeletingAccount: deleteAccountMutation.isPending,
    isUpdatingAccount: updateAccountMutation.isPending
  };
}
