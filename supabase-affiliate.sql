-- ========================================
-- SCRIPT SQL PARA SUPABASE
-- Tabela: affiliate_requests
-- Descrição: Armazena solicitações de afiliação VDA
-- ========================================

-- 1. Criar a tabela de solicitações de afiliação
CREATE TABLE IF NOT EXISTS affiliate_requests (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  sales_experience TEXT NOT NULL CHECK (sales_experience IN ('ja_vendo', 'vou_comecar')),
  traffic_type TEXT NOT NULL CHECK (traffic_type IN ('pago', 'organico', 'ambos')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_affiliate_requests_user_id 
  ON affiliate_requests(user_id);

CREATE INDEX IF NOT EXISTS idx_affiliate_requests_status 
  ON affiliate_requests(status);

CREATE INDEX IF NOT EXISTS idx_affiliate_requests_email 
  ON affiliate_requests(email);

CREATE INDEX IF NOT EXISTS idx_affiliate_requests_created_at 
  ON affiliate_requests(created_at DESC);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE affiliate_requests ENABLE ROW LEVEL SECURITY;

-- 4. Criar políticas de segurança

-- Política: Usuários podem ver suas próprias solicitações
CREATE POLICY "Users can view their own affiliate requests"
  ON affiliate_requests
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Usuários podem criar suas próprias solicitações
CREATE POLICY "Users can create their own affiliate requests"
  ON affiliate_requests
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Admins podem ver todas as solicitações
CREATE POLICY "Admins can view all affiliate requests"
  ON affiliate_requests
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Política: Admins podem atualizar solicitações
CREATE POLICY "Admins can update affiliate requests"
  ON affiliate_requests
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- 5. Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_affiliate_requests_updated_at 
  BEFORE UPDATE ON affiliate_requests 
  FOR EACH ROW 
  EXECUTE PROCEDURE update_updated_at_column();

-- 6. Comentários na tabela (documentação)
COMMENT ON TABLE affiliate_requests IS 
  'Armazena solicitações de afiliação do programa VDA';

COMMENT ON COLUMN affiliate_requests.sales_experience IS 
  'Experiência de vendas: ja_vendo ou vou_comecar';

COMMENT ON COLUMN affiliate_requests.traffic_type IS 
  'Tipo de tráfego utilizado: pago, organico ou ambos';

COMMENT ON COLUMN affiliate_requests.status IS 
  'Status da solicitação: pending, approved ou rejected';

-- ========================================
-- QUERIES ÚTEIS PARA TESTES
-- ========================================

-- Ver todas as solicitações pendentes
-- SELECT * FROM affiliate_requests WHERE status = 'pending' ORDER BY created_at DESC;

-- Contar solicitações por status
-- SELECT status, COUNT(*) as total FROM affiliate_requests GROUP BY status;

-- Ver solicitações de um usuário específico
-- SELECT * FROM affiliate_requests WHERE user_id = 'UUID_DO_USUARIO';
