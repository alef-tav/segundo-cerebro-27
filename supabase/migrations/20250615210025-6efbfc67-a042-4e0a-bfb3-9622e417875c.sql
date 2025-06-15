
-- Criar tabela para contas financeiras
CREATE TABLE public.financial_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL,
  saldo DECIMAL(15,2) NOT NULL DEFAULT 0,
  cor TEXT NOT NULL DEFAULT 'bg-blue-500',
  receitas DECIMAL(15,2) NOT NULL DEFAULT 0,
  despesas DECIMAL(15,2) NOT NULL DEFAULT 0,
  financial_type TEXT NOT NULL CHECK (financial_type IN ('pessoal', 'empresarial')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela
ALTER TABLE public.financial_accounts ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem apenas suas próprias contas
CREATE POLICY "Users can view their own accounts" 
  ON public.financial_accounts 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Política para usuários criarem suas próprias contas
CREATE POLICY "Users can create their own accounts" 
  ON public.financial_accounts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Política para usuários atualizarem suas próprias contas
CREATE POLICY "Users can update their own accounts" 
  ON public.financial_accounts 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Política para usuários excluírem suas próprias contas
CREATE POLICY "Users can delete their own accounts" 
  ON public.financial_accounts 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Criar tabela para transações
CREATE TABLE public.financial_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id UUID REFERENCES public.financial_accounts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('receita', 'despesa')),
  valor DECIMAL(15,2) NOT NULL,
  categoria TEXT NOT NULL,
  descricao TEXT,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela de transações
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;

-- Políticas para transações
CREATE POLICY "Users can view their own transactions" 
  ON public.financial_transactions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions" 
  ON public.financial_transactions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions" 
  ON public.financial_transactions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own transactions" 
  ON public.financial_transactions 
  FOR DELETE 
  USING (auth.uid() = user_id);
