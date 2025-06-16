
-- Criar tabela para as metas
CREATE TABLE public.metas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descricao TEXT,
  progresso INTEGER NOT NULL DEFAULT 0,
  prazo TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para as imagens do quadro de visão
CREATE TABLE public.vision_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  titulo TEXT NOT NULL,
  imagem TEXT NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security (RLS) nas tabelas
ALTER TABLE public.metas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vision_images ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS para metas
CREATE POLICY "Users can view their own metas" 
  ON public.metas 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own metas" 
  ON public.metas 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own metas" 
  ON public.metas 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own metas" 
  ON public.metas 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Criar políticas RLS para vision_images
CREATE POLICY "Users can view their own vision images" 
  ON public.vision_images 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own vision images" 
  ON public.vision_images 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own vision images" 
  ON public.vision_images 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own vision images" 
  ON public.vision_images 
  FOR DELETE 
  USING (auth.uid() = user_id);
