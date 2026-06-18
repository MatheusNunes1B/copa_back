-- ==========================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS
-- Cole isso no "SQL Editor" do seu novo projeto Supabase
-- ==========================================

-- 1. Cria a tabela de usuários (ligada à autenticação do Supabase)
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Cria a tabela de posts do feed
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id TEXT NOT NULL, -- Pode ser texto simples (ex: @gui-costa)
    texto TEXT NOT NULL,
    imagem TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Habilita RLS (Row Level Security) e cria regras que permitem o seu backend inserir e buscar dados sem bloqueio.
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Permite que qualquer um consiga ler e publicar novos usuários/posts (Ideal para começar e testar)
CREATE POLICY "Permitir leitura pública" ON public.usuarios FOR SELECT USING (true);
CREATE POLICY "Permitir inserção pública" ON public.usuarios FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir leitura pública" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Permitir inserção pública" ON public.posts FOR INSERT WITH CHECK (true);
