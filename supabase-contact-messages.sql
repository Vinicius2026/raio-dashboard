-- ========================================
-- TABELA: contact_messages
-- Descrição: Armazena mensagens enviadas pelo formulário de contato
-- da página inicial (Link Bio).
-- ========================================

-- 0. Criar funções helper (se não existirem)
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION current_user_is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Criar a tabela
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON contact_messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read
  ON contact_messages(is_read);

CREATE INDEX IF NOT EXISTS idx_contact_messages_email
  ON contact_messages(email);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 4. Criar políticas de segurança

-- Política INSERT: Qualquer pessoa (anon/authenticated) pode enviar mensagem
-- Necessário para o formulário público funcionar
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Política SELECT: Apenas admins podem ler mensagens
CREATE POLICY "Admins can view all contact messages"
  ON contact_messages
  FOR SELECT
  USING (current_user_is_admin());

-- Política UPDATE: Apenas admins podem atualizar (marcar como lida)
CREATE POLICY "Admins can update contact messages"
  ON contact_messages
  FOR UPDATE
  USING (current_user_is_admin())
  WITH CHECK (current_user_is_admin());

-- Política DELETE: Apenas admins podem deletar mensagens
CREATE POLICY "Admins can delete contact messages"
  ON contact_messages
  FOR DELETE
  USING (current_user_is_admin());

-- 5. Comentários na tabela (documentação)
COMMENT ON TABLE contact_messages IS
  'Mensagens enviadas pelo formulário de contato da página inicial';

COMMENT ON COLUMN contact_messages.name IS
  'Nome do remetente';

COMMENT ON COLUMN contact_messages.email IS
  'Email do remetente';

COMMENT ON COLUMN contact_messages.message IS
  'Conteúdo da mensagem';

COMMENT ON COLUMN contact_messages.is_read IS
  'Se a mensagem foi lida pelo admin (default: false)';

COMMENT ON COLUMN contact_messages.ip_address IS
  'IP de origem (para anti-spam)';

COMMENT ON COLUMN contact_messages.user_agent IS
  'User-Agent do navegador (para anti-spam)';

-- ========================================
-- QUERIES ÚTEIS PARA TESTES
-- ========================================

-- Ver todas as mensagens (mais recentes primeiro)
-- SELECT * FROM contact_messages ORDER BY created_at DESC;

-- Ver apenas mensagens não lidas
-- SELECT * FROM contact_messages WHERE is_read = false ORDER BY created_at DESC;

-- Contar mensagens não lidas
-- SELECT COUNT(*) as nao_lidas FROM contact_messages WHERE is_read = false;

-- Marcar uma mensagem como lida
-- UPDATE contact_messages SET is_read = true WHERE id = 1;
