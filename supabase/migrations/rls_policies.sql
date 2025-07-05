-- Habilita a Row Level Security (RLS) para as tabelas principais.
-- É crucial fazer isso para garantir que os dados só possam ser acessados por usuários autorizados.
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

DROP POLICY IF EXISTS "Anyone can read posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can create posts" ON public.posts;
DROP POLICY IF EXISTS "Admins or authors can delete posts" ON public.posts;


--------------------------------
-- Políticas para a tabela 'donations'
--------------------------------

-- 1. Qualquer pessoa (mesmo não autenticada) pode registrar uma nova doação.
CREATE POLICY "Public can insert donations"
ON public.donations FOR INSERT
WITH CHECK (true);

-- 2. Apenas usuários autenticados com o papel 'agente' ou 'admin' podem ver as doações.
--    (Isso protege o dashboard contra acessos não autorizados via API).
CREATE POLICY "Agents and Admins can view donations"
ON public.donations FOR SELECT
                                                                                       USING (auth.role() = 'authenticated' AND (get_my_claim('role') = '"admin"' OR get_my_claim('role') = '"agente"'));

-- 3. Apenas 'agentes' e 'admins' podem atualizar o status das doações.
CREATE POLICY "Agents and Admins can update donations"
ON public.donations FOR UPDATE
                                   USING (auth.role() = 'authenticated' AND (get_my_claim('role') = '"admin"' OR get_my_claim('role') = '"agente"'));


--------------------------------
-- Políticas para a tabela 'profiles' (se usada para roles)
--------------------------------

-- 1. Um usuário pode ver seu próprio perfil.
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
                                  USING (auth.uid() = id);

-- 2. Um usuário pode atualizar seu próprio perfil.
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
                                  USING (auth.uid() = id);

-- 3. Admins podem ver e modificar qualquer perfil (necessário para o UserManagementPage).
CREATE POLICY "Admins can manage all profiles"
ON public.profiles FOR ALL
USING (auth.role() = 'authenticated' AND get_my_claim('role') = '"admin"');


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
CREATE POLICY "Admins or authors can delete posts"
ON public.posts FOR DELETE
USING (auth.uid() = user_id OR get_my_claim('role') = '"admin"');



--------------------------------
-- Correção?
--------------------------------

-- Remove as políticas de leitura restritivas para a tabela 'profiles'
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

-- Cria uma nova política que permite que QUALQUER UM leia os dados dos perfis.
-- Isso é necessário para que o JOIN no Mural de Agradecimentos funcione para visitantes.
CREATE POLICY "Public can read profile info" ON public.profiles
  FOR SELECT USING (true);

-- Recria a política para que Admins possam gerenciar (atualizar/deletar) perfis.
-- A política de leitura acima já cobre o SELECT para admins.
CREATE POLICY "Admins can manage all profiles" ON public.profiles
  FOR UPDATE USING (get_my_claim('role') = '"admin"');

CREATE POLICY "Admins can delete profiles" ON public.profiles
  FOR DELETE USING (get_my_claim('role') = '"admin"');

-- Recria a política para que um usuário possa atualizar seu próprio perfil.
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);