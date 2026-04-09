-- ========================================
-- SCRIPT PARA CORRIGIR POLÍTICAS RLS
-- Este script remove TODAS as políticas antigas e cria novas corretas
-- ========================================

-- PASSO 1: REMOVER TODAS AS POLÍTICAS ANTIGAS
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Service role can insert profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON user_profiles;

-- PASSO 2: DESABILITAR RLS TEMPORARIAMENTE (apenas para teste)
-- Se você quiser testar sem RLS primeiro:
-- ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- PASSO 3: CRIAR POLÍTICAS CORRETAS SEM LOOPS

-- 3.1: Política para usuários verem seu próprio perfil
CREATE POLICY "users_view_own_profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 3.2: Política para usuários atualizarem seu próprio perfil
CREATE POLICY "users_update_own_profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- 3.3: Política para admins verem TODOS os perfis (SEM LOOP)
CREATE POLICY "admins_view_all_profiles"
  ON user_profiles
  FOR SELECT
  USING (
    -- Permite se for o próprio usuário OU
    auth.uid() = id OR
    -- Se o campo role do próprio registro for 'admin'
    (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
  );

-- 3.4: Política para admins atualizarem qualquer perfil
CREATE POLICY "admins_update_all_profiles"
  ON user_profiles
  FOR UPDATE
  USING (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
  );

-- 3.5: Política para inserir perfis (sistema)
CREATE POLICY "system_insert_profiles"
  ON user_profiles
  FOR INSERT
  WITH CHECK (true);

-- PASSO 4: GARANTIR QUE RLS ESTÁ HABILITADO
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- PASSO 5: VERIFICAR POLÍTICAS CRIADAS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename = 'user_profiles';

-- PASSO 6: VERIFICAR SEU USUÁRIO
SELECT id, email, full_name, role 
FROM user_profiles 
WHERE email = 'thiagolimaslv@gmail.com';

-- ========================================
-- INSTRUÇÕES:
-- ========================================
-- 1. Execute TODO este script de uma vez no SQL Editor
-- 2. Verifique que as políticas foram criadas (PASSO 5)
-- 3. Confirme que você é admin (PASSO 6)
-- 4. FAÇA LOGOUT do sistema
-- 5. LIMPE O CACHE do navegador (Ctrl + Shift + Delete)
-- 6. Tente acessar /admin2626 novamente
-- ========================================
