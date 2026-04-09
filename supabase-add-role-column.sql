-- ========================================
-- SCRIPT DE MIGRAÇÃO
-- Adicionar coluna 'role' na tabela user_profiles
-- ========================================

-- 1. Adicionar coluna 'role' à tabela user_profiles
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- 2. Criar índice para a coluna role
CREATE INDEX IF NOT EXISTS idx_user_profiles_role 
  ON user_profiles(role);

-- 3. Adicionar comentário na coluna
COMMENT ON COLUMN user_profiles.role IS 
  'Papel do usuário no sistema: user (padrão) ou admin';

-- 4. Atualizar usuários existentes para 'user' (caso a coluna já exista como NULL)
UPDATE user_profiles 
SET role = 'user' 
WHERE role IS NULL;

-- 5. Criar políticas de segurança para admins visualizarem todos os perfis
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
CREATE POLICY "Admins can view all profiles"
  ON user_profiles
  FOR SELECT
  USING (
    -- Permite ver próprio perfil OU ser admin
    id = auth.uid() OR
    -- Verifica se usuário logado é admin (com alias para evitar loop)
    EXISTS (
      SELECT 1 FROM user_profiles AS admin_check
      WHERE admin_check.id = auth.uid()
      AND admin_check.role = 'admin'
    )
  );

-- 6. Política para admins atualizarem perfis
DROP POLICY IF EXISTS "Admins can update all profiles" ON user_profiles;
CREATE POLICY "Admins can update all profiles"
  ON user_profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles AS admin_check
      WHERE admin_check.id = auth.uid()
      AND admin_check.role = 'admin'
    )
  );

-- ========================================
-- VERIFICAÇÃO
-- ========================================

-- Verificar se a coluna foi criada
-- SELECT column_name, data_type, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'user_profiles' AND column_name = 'role';

-- Ver todos os usuários e suas roles
-- SELECT id, email, full_name, role FROM user_profiles;
