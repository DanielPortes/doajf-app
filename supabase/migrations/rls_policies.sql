-- Habilita a Row Level Security (RLS) para as tabelas principais.
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;


-- Apaga políticas antigas, se existirem, para evitar conflitos.
DROP POLICY IF EXISTS "Public can insert donations" ON public.donations;
DROP POLICY IF EXISTS "Agents and Admins can view donations" ON public.donations;
DROP POLICY IF EXISTS "Agents and Admins can update donations" ON public.donations;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public can read profile info" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;

DROP POLICY IF EXISTS "Anyone can read posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can create posts" ON public.posts;
DROP POLICY IF EXISTS "Admins or authors can delete posts" ON public.posts;


--------------------------------
-- Políticas para a tabela 'donations'
--------------------------------

-- 1. Qualquer pessoa (mesmo não autenticada) pode registrar uma nova doação.
-- Esta política está correta e não precisa de alteração.
CREATE POLICY "Public can insert donations"
ON public.donations FOR INSERT
WITH CHECK (true);

-- 2. Apenas usuários autenticados com o papel 'agente' ou 'admin' podem ver as doações.
-- CORREÇÃO: Usando auth.jwt() para checar o papel do usuário nos metadados.
CREATE POLICY "Agents and Admins can view donations"
ON public.donations FOR SELECT
                                                                                                      USING (
                                                                                                      auth.role() = 'authenticated' AND
                                                                                                      (
                                                                                                      (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' OR
                                                                                                      (auth.jwt() -> 'user_metadata' ->> 'role') = 'agente'
                                                                                                      )
                                                                                                      );

-- 3. Apenas 'agentes' e 'admins' podem atualizar o status das doações.
-- CORREÇÃO: Usando auth.jwt() aqui também.
CREATE POLICY "Agents and Admins can update donations"
ON public.donations FOR UPDATE
                                   USING (
                                   auth.role() = 'authenticated' AND
                                   (
                                   (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' OR
                                   (auth.jwt() -> 'user_metadata' ->> 'role') = 'agente'
                                   )
                                   );


--------------------------------
-- Políticas para a tabela 'profiles'
--------------------------------

-- 1. Qualquer pessoa pode ler os dados dos perfis (necessário para o Mural de Agradecimentos).
CREATE POLICY "Public can read profile info" ON public.profiles
  FOR SELECT USING (true);

-- 2. Um usuário pode atualizar seu próprio perfil.
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
                                  USING (auth.uid() = id);

-- 3. Admins podem gerenciar (atualizar/deletar) qualquer perfil.
-- CORREÇÃO: Usando auth.jwt() para a verificação de admin.
CREATE POLICY "Admins can manage all profiles"
ON public.profiles FOR ALL
  USING (
    auth.role() = 'authenticated' AND
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );


--------------------------------
-- Políticas para a tabela 'posts' (Mural)
--------------------------------

-- 1. Qualquer pessoa pode ler as publicações do mural.
CREATE POLICY "Anyone can read posts"
ON public.posts FOR SELECT
                                      USING (true);

-- 2. Apenas usuários autenticados ('agente' ou 'admin') podem criar posts.
CREATE POLICY "Authenticated users can create posts"
ON public.posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- 3. O autor do post ou um admin pode apagar o post.
-- CORREÇÃO: Usando auth.jwt() para a verificação de admin.
CREATE POLICY "Admins or authors can delete posts"
ON public.posts FOR DELETE
USING (
    auth.uid() = user_id OR
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );