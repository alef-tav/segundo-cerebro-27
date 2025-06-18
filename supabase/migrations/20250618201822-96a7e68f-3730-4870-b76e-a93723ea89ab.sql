
-- Create a table for knowledge items
CREATE TABLE public.knowledge_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('livro', 'curso', 'artigo')),
  status TEXT NOT NULL CHECK (status IN ('a-fazer', 'em-andamento', 'concluido')),
  description TEXT,
  url TEXT,
  email TEXT,
  password TEXT,
  pdf_file_name TEXT,
  image_file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.knowledge_items ENABLE ROW LEVEL SECURITY;

-- Create policies for users to manage their own knowledge items
CREATE POLICY "Users can view their own knowledge items" 
  ON public.knowledge_items 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own knowledge items" 
  ON public.knowledge_items 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own knowledge items" 
  ON public.knowledge_items 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own knowledge items" 
  ON public.knowledge_items 
  FOR DELETE 
  USING (auth.uid() = user_id);
