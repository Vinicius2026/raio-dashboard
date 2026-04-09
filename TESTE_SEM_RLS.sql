-- ========================================
-- TESTE RÁPIDO: DESABILITAR RLS TEMPORARIAMENTE
-- Use isso APENAS para testar se o problema é RLS
-- ========================================

-- ⚠️ ATENÇÃO: Isso desabilita a segurança!
-- Use APENAS para teste em desenvolvimento

-- DESABILITAR RLS (TESTE)
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- Agora tente acessar /admin2626
-- Se funcionar, o problema ERA o RLS

-- ========================================
-- DEPOIS DO TESTE, REABILITE A SEGURANÇA:
-- ========================================

-- Reabilitar RLS
-- ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- E execute o script: CORRIGIR_POLITICAS_RLS.sql
-- para criar as políticas corretas

-- ========================================
-- IMPORTANTE:
-- ========================================
-- 1. Execute apenas "ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;"
-- 2. Tente acessar /admin2626
-- 3. Se funcionar, volte aqui e execute CORRIGIR_POLITICAS_RLS.sql
-- 4. NUNCA deixe RLS desabilitado em produção!
-- ========================================
