-- ========================================
-- SCRIPT SQL PARA SUPABASE
-- Tabela: user_profiles
-- Descrição: Perfil completo dos usuários com informações adicionais
-- ========================================

-- 1. Criar a tabela de perfis
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Campos adicionais específicos do VDA
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'premium', 'vip')),
  total_products_selected INTEGER DEFAULT 0,
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- 2. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email 
  ON user_profiles(email);

CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription 
  ON user_profiles(subscription_status);

CREATE INDEX IF NOT EXISTS idx_user_profiles_last_login 
  ON user_profiles(last_login_at DESC);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 4. Criar políticas de segurança

-- Política: Usuários podem ver apenas seu próprio perfil
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Política: Usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Política: Sistema pode inserir perfis (via trigger)
CREATE POLICY "Service role can insert profiles"
  ON user_profiles
  FOR INSERT
  WITH CHECK (true);

-- 5. Criar função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Criar trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 7. Criar função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Criar trigger para criar perfil automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- 9. Criar função para atualizar last_login_at
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.user_profiles
  SET last_login_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Criar trigger para atualizar last_login_at
DROP TRIGGER IF EXISTS on_user_login ON auth.sessions;
CREATE TRIGGER on_user_login
  AFTER INSERT ON auth.sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_last_login();

-- 11. Criar função para sincronizar contagem de produtos selecionados
CREATE OR REPLACE FUNCTION sync_products_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.user_profiles
    SET total_products_selected = (
      SELECT COUNT(*) FROM public.selected_products WHERE user_id = NEW.user_id
    )
    WHERE id = NEW.user_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.user_profiles
    SET total_products_selected = (
      SELECT COUNT(*) FROM public.selected_products WHERE user_id = OLD.user_id
    )
    WHERE id = OLD.user_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. Criar trigger para sincronizar contagem
DROP TRIGGER IF EXISTS sync_products_count_trigger ON selected_products;
CREATE TRIGGER sync_products_count_trigger
  AFTER INSERT OR DELETE ON selected_products
  FOR EACH ROW
  EXECUTE FUNCTION sync_products_count();

-- 13. Comentários na tabela (documentação)
COMMENT ON TABLE user_profiles IS 
  'Perfis dos usuários com informações adicionais além da autenticação';

COMMENT ON COLUMN user_profiles.id IS 
  'ID do usuário (mesmo ID do auth.users)';

COMMENT ON COLUMN user_profiles.email IS 
  'Email do usuário (sincronizado)';

COMMENT ON COLUMN user_profiles.full_name IS 
  'Nome completo do usuário';

COMMENT ON COLUMN user_profiles.avatar_url IS 
  'URL da foto de perfil do usuário';

COMMENT ON COLUMN user_profiles.phone IS 
  'Telefone do usuário';

COMMENT ON COLUMN user_profiles.subscription_status IS 
  'Status da assinatura: free, premium ou vip';

COMMENT ON COLUMN user_profiles.total_products_selected IS 
  'Contador automático de produtos selecionados pelo usuário';

COMMENT ON COLUMN user_profiles.last_login_at IS 
  'Data e hora do último login do usuário';

-- ========================================
-- CRIAR PERFIS PARA USUÁRIOS EXISTENTES
-- (Execute apenas se já tem usuários cadastrados)
-- ========================================

-- Inserir perfis para usuários que já existem mas não têm perfil
INSERT INTO public.user_profiles (id, email, full_name)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', au.email)
FROM auth.users au
LEFT JOIN public.user_profiles up ON au.id = up.id
WHERE up.id IS NULL;

-- Atualizar contagem de produtos para perfis existentes
UPDATE public.user_profiles up
SET total_products_selected = (
  SELECT COUNT(*)
  FROM public.selected_products sp
  WHERE sp.user_id = up.id
);

-- ========================================
-- QUERIES ÚTEIS PARA TESTES
-- ========================================

-- Ver perfil de um usuário específico
-- SELECT * FROM user_profiles WHERE email = 'usuario@email.com';

-- Ver todos os perfis com contagem de produtos
-- SELECT 
--   email, 
--   full_name, 
--   subscription_status, 
--   total_products_selected,
--   last_login_at
-- FROM user_profiles 
-- ORDER BY created_at DESC;

-- Ver usuários mais ativos (mais produtos selecionados)
-- SELECT 
--   email, 
--   full_name, 
--   total_products_selected
-- FROM user_profiles 
-- ORDER BY total_products_selected DESC 
-- LIMIT 10;

-- Ver últimos logins
-- SELECT 
--   email, 
--   full_name, 
--   last_login_at
-- FROM user_profiles 
-- WHERE last_login_at IS NOT NULL
-- ORDER BY last_login_at DESC 
-- LIMIT 20;
