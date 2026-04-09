-- ========================================
-- SCRIPT SQL PARA SUPABASE
-- Tabela: selected_products
-- Descrição: Armazena os produtos que cada usuário selecionou (deu START)
-- ========================================

-- 1. Criar a tabela
CREATE TABLE IF NOT EXISTS selected_products (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraint: Um usuário não pode selecionar o mesmo produto duas vezes
  UNIQUE(user_id, product_id)
);

-- 2. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_selected_products_user_id 
  ON selected_products(user_id);

CREATE INDEX IF NOT EXISTS idx_selected_products_product_id 
  ON selected_products(product_id);

CREATE INDEX IF NOT EXISTS idx_selected_products_created_at 
  ON selected_products(created_at DESC);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE selected_products ENABLE ROW LEVEL SECURITY;

-- 4. Criar políticas de segurança

-- Política: Usuários podem ver apenas seus próprios produtos selecionados
CREATE POLICY "Users can view their own selected products"
  ON selected_products
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Usuários podem adicionar produtos à sua própria lista
CREATE POLICY "Users can add their own selected products"
  ON selected_products
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Usuários podem remover produtos da sua própria lista
CREATE POLICY "Users can delete their own selected products"
  ON selected_products
  FOR DELETE
  USING (auth.uid() = user_id);

-- 5. Comentários na tabela (documentação)
COMMENT ON TABLE selected_products IS 
  'Armazena os produtos que cada usuário selecionou (deu START) para trabalhar';

COMMENT ON COLUMN selected_products.user_id IS 
  'ID do usuário que selecionou o produto';

COMMENT ON COLUMN selected_products.product_id IS 
  'Número/ID do produto selecionado';

COMMENT ON COLUMN selected_products.created_at IS 
  'Data e hora em que o produto foi selecionado';

-- ========================================
-- QUERIES ÚTEIS PARA TESTES
-- ========================================

-- Ver todos os produtos selecionados por um usuário específico
-- SELECT * FROM selected_products WHERE user_id = 'UUID_DO_USUARIO' ORDER BY created_at DESC;

-- Contar quantos produtos cada usuário selecionou
-- SELECT user_id, COUNT(*) as total_produtos 
-- FROM selected_products 
-- GROUP BY user_id;

-- Ver os produtos mais populares (mais selecionados)
-- SELECT product_id, COUNT(*) as total_usuarios 
-- FROM selected_products 
-- GROUP BY product_id 
-- ORDER BY total_usuarios DESC;
