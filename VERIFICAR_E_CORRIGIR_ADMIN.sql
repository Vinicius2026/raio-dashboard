-- ========================================
-- SCRIPT PARA VERIFICAR E CORRIGIR ADMIN
-- Execute este script no Supabase SQL Editor
-- ========================================

-- PASSO 1: Ver todos os usuários e suas roles
SELECT id, email, full_name, role 
FROM user_profiles 
ORDER BY created_at DESC;

-- PASSO 2: Tornar seu usuário admin (SUBSTITUA O EMAIL!)
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'thiagolimaslv@gmail.com';  -- ← TROQUE PELO SEU EMAIL

-- PASSO 3: Verificar se atualizou
SELECT id, email, full_name, role 
FROM user_profiles 
WHERE email = 'thiagolimaslv@gmail.com';  -- ← TROQUE PELO SEU EMAIL

-- PASSO 4: Se o erro persistir, precisamos ajustar as políticas RLS
-- Remover políticas conflitantes
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;

-- PASSO 5: Recriar políticas corretas
-- Usuários podem ver seu próprio perfil
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Admins podem ver todos os perfis (CORRIGIDO)
CREATE POLICY "Admins can view all profiles"
  ON user_profiles
  FOR SELECT
  USING (
    -- Verifica se o usuário atual é admin
    role = 'admin' OR
    -- OU permite que qualquer usuário veja se houver um admin logado
    EXISTS (
      SELECT 1 FROM user_profiles AS up
      WHERE up.id = auth.uid()
      AND up.role = 'admin'
    )
  );

-- PASSO 6: Adicionar política para admins atualizarem perfis
DROP POLICY IF EXISTS "Admins can update all profiles" ON user_profiles;
CREATE POLICY "Admins can update all profiles"
  ON user_profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles AS up
      WHERE up.id = auth.uid()
      AND up.role = 'admin'
    )
  );

-- PASSO 7: Verificação final
SELECT 
  id, 
  email, 
  full_name, 
  role,
  created_at
FROM user_profiles 
WHERE role = 'admin';

-- ========================================
-- IMPORTANTE: Execute linha por linha!
-- ========================================
-- 1. Execute o SELECT do PASSO 1 para ver todos os usuários
-- 2. Execute o UPDATE do PASSO 2 (com seu email correto!)
-- 3. Execute o SELECT do PASSO 3 para confirmar
-- 4. Se ainda não funcionar, execute os PASSOS 4-7
-- ========================================
