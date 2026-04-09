-- ========================================
-- SISTEMA DE PERMISSÕES - ADMIN vs USUÁRIO
-- Adiciona campo 'role' para diferenciar permissões
-- ========================================

-- 1. Adicionar campo 'role' na tabela user_profiles
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' 
CHECK (role IN ('user', 'admin'));

-- 2. Criar índice para o campo role
CREATE INDEX IF NOT EXISTS idx_user_profiles_role 
  ON user_profiles(role);

-- 3. Atualizar todos os usuários existentes para 'user' (se não tiverem role)
UPDATE user_profiles 
SET role = 'user' 
WHERE role IS NULL;

-- 4. Comentário no campo
COMMENT ON COLUMN user_profiles.role IS 
  'Função do usuário: user (padrão) ou admin (acesso total)';

-- ========================================
-- FUNÇÕES HELPER PARA VERIFICAR ADMIN
-- ========================================

-- 5. Função para verificar se usuário é admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Função para verificar se o usuário atual é admin
CREATE OR REPLACE FUNCTION current_user_is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- ATUALIZAR POLÍTICAS RLS - ADMIN TEM ACESSO TOTAL
-- ========================================

-- 7. REMOVER políticas antigas de user_profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

-- 8. CRIAR novas políticas com permissões de admin

-- Política SELECT: Usuário vê seu perfil OU Admin vê todos
CREATE POLICY "Users can view own profile, admins view all"
  ON user_profiles
  FOR SELECT
  USING (
    auth.uid() = id OR  -- Usuário vê seu próprio perfil
    current_user_is_admin()  -- Admin vê todos os perfis
  );

-- Política UPDATE: Usuário atualiza seu perfil OU Admin atualiza qualquer um
CREATE POLICY "Users can update own profile, admins update all"
  ON user_profiles
  FOR UPDATE
  USING (
    auth.uid() = id OR  -- Usuário atualiza seu próprio perfil
    current_user_is_admin()  -- Admin atualiza qualquer perfil
  )
  WITH CHECK (
    auth.uid() = id OR
    current_user_is_admin()
  );

-- Política INSERT: Mantém igual (apenas sistema/triggers)
-- (Não precisa atualizar, já existe)

-- 9. ATUALIZAR políticas de selected_products para admin

-- REMOVER políticas antigas
DROP POLICY IF EXISTS "Users can view their own selected products" ON selected_products;
DROP POLICY IF EXISTS "Users can add their own selected products" ON selected_products;
DROP POLICY IF EXISTS "Users can delete their own selected products" ON selected_products;

-- CRIAR novas políticas com permissões de admin

-- Política SELECT: Usuário vê seus produtos OU Admin vê todos
CREATE POLICY "Users view own products, admins view all"
  ON selected_products
  FOR SELECT
  USING (
    auth.uid() = user_id OR  -- Usuário vê seus produtos
    current_user_is_admin()  -- Admin vê todos os produtos
  );

-- Política INSERT: Usuário adiciona seus produtos OU Admin adiciona para qualquer um
CREATE POLICY "Users add own products, admins add for all"
  ON selected_products
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR  -- Usuário adiciona para si
    current_user_is_admin()  -- Admin adiciona para qualquer um
  );

-- Política DELETE: Usuário remove seus produtos OU Admin remove qualquer um
CREATE POLICY "Users delete own products, admins delete all"
  ON selected_products
  FOR DELETE
  USING (
    auth.uid() = user_id OR  -- Usuário remove seus produtos
    current_user_is_admin()  -- Admin remove qualquer produto
  );

-- ========================================
-- FUNÇÃO PARA PROMOVER USUÁRIO A ADMIN
-- (Use com cuidado!)
-- ========================================

-- 10. Função para promover usuário a admin (apenas admins podem usar)
CREATE OR REPLACE FUNCTION promote_to_admin(target_user_id UUID)
RETURNS void AS $$
BEGIN
  -- Verificar se quem está executando é admin
  IF NOT current_user_is_admin() THEN
    RAISE EXCEPTION 'Apenas administradores podem promover usuários';
  END IF;
  
  -- Promover usuário
  UPDATE user_profiles
  SET role = 'admin'
  WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Função para rebaixar admin a user
CREATE OR REPLACE FUNCTION demote_to_user(target_user_id UUID)
RETURNS void AS $$
BEGIN
  -- Verificar se quem está executando é admin
  IF NOT current_user_is_admin() THEN
    RAISE EXCEPTION 'Apenas administradores podem rebaixar usuários';
  END IF;
  
  -- Rebaixar usuário
  UPDATE user_profiles
  SET role = 'user'
  WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- QUERIES PARA GESTÃO DE ADMINS
-- ========================================

-- Ver todos os admins
-- SELECT id, email, full_name, role, created_at 
-- FROM user_profiles 
-- WHERE role = 'admin'
-- ORDER BY created_at DESC;

-- Ver todos os usuários normais
-- SELECT id, email, full_name, role, created_at 
-- FROM user_profiles 
-- WHERE role = 'user'
-- ORDER BY created_at DESC;

-- Contar admins vs usuários
-- SELECT role, COUNT(*) as total 
-- FROM user_profiles 
-- GROUP BY role;

-- ========================================
-- PROMOVER SEU PRIMEIRO ADMIN MANUALMENTE
-- (Execute APENAS UMA VEZ para criar o primeiro admin)
-- ========================================

-- IMPORTANTE: Substitua 'seu-email@exemplo.com' pelo email do usuário que será admin
-- 
-- UPDATE user_profiles 
-- SET role = 'admin' 
-- WHERE email = 'seu-email@exemplo.com';
--
-- Depois de criar o primeiro admin, ele pode promover outros usando a função promote_to_admin()
