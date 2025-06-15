
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Building } from 'lucide-react';

export interface FinancialTransaction {
  id: string;
  account_id: string;
  tipo: 'receita' | 'despesa';
  valor: number;
  categoria: string;
  descricao?: string;
  data: string;
  conta?: string;
  responsavel?: string;
  icon: typeof Building;
}

export function useFinancialTransactions(financialType: 'pessoal' | 'empresarial') {
  const queryClient = useQueryClient();

  // Buscar transações do usuário
  const { data: transactions = [], isLoading, error } = useQuery({
    queryKey: ['financial-transactions', financialType],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      // Primeiro buscar as contas do tipo selecionado
      const { data: accounts } = await supabase
        .from('financial_accounts')
        .select('id')
        .eq('user_id', user.id)
        .eq('financial_type', financialType);

      if (!accounts || accounts.length === 0) {
        return [];
      }

      const accountIds = accounts.map(acc => acc.id);

      // Buscar transações dessas contas
      const { data, error } = await supabase
        .from('financial_transactions')
        .select(`
          *,
          financial_accounts(nome)
        `)
        .eq('user_id', user.id)
        .in('account_id', accountIds)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map((transaction: any) => ({
        ...transaction,
        conta: transaction.financial_accounts?.nome || 'Conta não encontrada',
        responsavel: 'Usuário',
        icon: Building,
        data: new Date(transaction.data).toLocaleDateString('pt-BR')
      }));
    },
    enabled: !!financialType
  });

  // Adicionar nova transação
  const addTransactionMutation = useMutation({
    mutationFn: async (newTransaction: Omit<FinancialTransaction, 'id' | 'icon' | 'conta' | 'responsavel' | 'data'> & { data: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('financial_transactions')
        .insert([{
          ...newTransaction,
          user_id: user.id,
          data: newTransaction.data
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-transactions', financialType] });
      queryClient.invalidateQueries({ queryKey: ['financial-accounts', financialType] });
    }
  });

  // Excluir transação
  const deleteTransactionMutation = useMutation({
    mutationFn: async (transactionId: string) => {
      const { error } = await supabase
        .from('financial_transactions')
        .delete()
        .eq('id', transactionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-transactions', financialType] });
      queryClient.invalidateQueries({ queryKey: ['financial-accounts', financialType] });
    }
  });

  // Separar receitas e despesas
  const receitas = transactions.filter(t => t.tipo === 'receita');
  const despesas = transactions.filter(t => t.tipo === 'despesa');

  return {
    transactions,
    receitas,
    despesas,
    isLoading,
    error,
    addTransaction: addTransactionMutation.mutate,
    deleteTransaction: deleteTransactionMutation.mutate,
    isAddingTransaction: addTransactionMutation.isPending,
    isDeletingTransaction: deleteTransactionMutation.isPending
  };
}
