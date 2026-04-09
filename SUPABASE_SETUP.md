# 🔐 Configuração Supabase - VDA Landing Page

## ✅ STATUS: CONECTADO!

Suas credenciais já foram configuradas no `.env.local`.

---

## 📋 INFORMAÇÕES DO PROJETO

**Nome:** Com VDA  
**Project ID:** gcjngvuizbofxwmgmklx  
**URL:** https://gcjngvuizbofxwmgmklx.supabase.co  
**Status:** ✅ Conectado

---

## 🚀 PRÓXIMOS PASSOS

### 1️⃣ Criar Primeiro Usuário (Você)

Acesse: https://gcjngvuizbofxwmgmklx.supabase.co

1. Vá em **Authentication** > **Users**
2. Clique em **Add user** > **Create new user**
3. Preencha:
   - **Email:** seu@email.com
   - **Password:** sua-senha-segura
   - **Auto Confirm User:** ✅ Marque esta opção
4. Clique em **Create user**

### 2️⃣ Testar Login

1. Acesse: http://localhost:3000/login
2. Entre com o email e senha que você criou
3. Você será redirecionado para `/dashboard`

---

## 🔧 FUNCIONALIDADES IMPLEMENTADAS

### ✅ Autenticação Completa
- ✅ Login com email/senha
- ✅ Logout
- ✅ Verificação de sessão
- ✅ Proteção de rotas (dashboard)
- ✅ Mensagens de erro em português
- ✅ Redirecionamento automático

### 📁 Arquivos Atualizados
- ✅ `.env.local` - Credenciais configuradas
- ✅ `lib/supabase.ts` - Client e funções prontas
- ✅ `app/login/page.tsx` - Login real funcionando
- ✅ `app/dashboard/page.tsx` - Proteção de rota + logout

---

## 🎯 COMO USAR

### Login
```typescript
import { signIn } from "@/lib/supabase";

const { data, error } = await signIn(email, password);
```

### Logout
```typescript
import { signOut } from "@/lib/supabase";

await signOut();
```

### Verificar Sessão
```typescript
import { getSession } from "@/lib/supabase";

const session = await getSession();
if (session) {
  // Usuário autenticado
}
```

---

## 📊 CONFIGURAÇÕES OPCIONAIS

### Habilitar Cadastro de Novos Usuários

Se quiser permitir que usuários se cadastrem:

1. No Supabase Dashboard: **Authentication** > **Providers**
2. Configure **Email** provider:
   - **Enable Email provider:** ✅
   - **Confirm email:** Defina conforme necessário

3. Crie uma página de registro em `app/register/page.tsx`:

```typescript
import { supabase } from "@/lib/supabase";

const { data, error } = await supabase.auth.signUp({
  email: email,
  password: password,
});
```

### Adicionar Google OAuth

1. **Authentication** > **Providers** > **Google**
2. Configure Client ID e Secret
3. No código:

```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
});
```

---

## 🛡️ SEGURANÇA

### ⚠️ IMPORTANTE

- ✅ **Anon Key** está no `.env.local` (seguro)
- ✅ **Service Role Key** NÃO deve ser exposta no frontend
- ✅ `.env.local` está no `.gitignore` (não será commitado)
- ✅ Use Row Level Security (RLS) no Supabase

### Configurar RLS (Row Level Security)

Para criar tabelas protegidas:

```sql
-- Exemplo: Tabela de perfis
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Política: Usuário só vê seu próprio perfil
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);
```

---

## 🎨 PERSONALIZAR EMAILS

No Supabase Dashboard:

1. **Authentication** > **Email Templates**
2. Personalize:
   - Confirmação de email
   - Redefinição de senha
   - Email de boas-vindas

---

## 🔗 VARIÁVEIS DE AMBIENTE

### Desenvolvimento (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=https://gcjngvuizbofxwmgmklx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Produção (Vercel)
Configure as mesmas variáveis no dashboard da Vercel:
- Settings > Environment Variables
- Adicione todas as variáveis que começam com `NEXT_PUBLIC_`

---

## 📚 RECURSOS ADICIONAIS

### Criar Tabelas Personalizadas

Acesse: **SQL Editor** no Supabase

```sql
-- Exemplo: Tabela de clicks nos links
CREATE TABLE link_clicks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  link_name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users,
  clicked_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE link_clicks ENABLE ROW LEVEL SECURITY;
```

### Realtime (Tempo Real)

```typescript
const channel = supabase
  .channel('db-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'profiles' },
    (payload) => console.log(payload)
  )
  .subscribe();
```

---

## 🆘 TROUBLESHOOTING

### Erro: "Invalid login credentials"
- Verifique se o usuário foi criado no Supabase
- Confirme que marcou "Auto Confirm User"
- Verifique email e senha

### Erro: "supabase is not defined"
- Reinicie o servidor: `npm run dev`
- Verifique se `.env.local` está configurado

### Usuário não redireciona após login
- Verifique o console do navegador (F12)
- Confirme que a sessão foi criada

---

## 🎉 TUDO PRONTO!

Seu projeto VDA agora está **100% conectado ao Supabase**!

**Próximos passos:**
1. ✅ Crie seu primeiro usuário no Supabase
2. ✅ Teste o login em http://localhost:3000/login
3. ✅ Acesse o dashboard protegido
4. ✅ Teste o logout

---

**Documentação Oficial:** https://supabase.com/docs  
**Seu Projeto:** https://gcjngvuizbofxwmgmklx.supabase.co
