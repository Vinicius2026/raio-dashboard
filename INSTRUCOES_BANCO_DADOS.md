# 📋 Instruções de Configuração do Banco de Dados

## ⚠️ IMPORTANTE: Execute os scripts no Supabase

Para que o sistema de afiliação e dashboard administrativa funcionem corretamente, você precisa executar o script SQL no seu projeto Supabase.

## 🚀 Como executar

### 1. Acesse o Supabase Dashboard
- Vá para [https://supabase.com](https://supabase.com)
- Entre no seu projeto VDA

### 2. Execute os Scripts SQL na ordem correta

⚠️ **IMPORTANTE: Execute os scripts nesta ordem:**

#### Passo 1: Adicionar coluna 'role' (OBRIGATÓRIO PRIMEIRO)
1. No menu lateral, clique em **SQL Editor**
2. Clique em **New query**
3. Copie todo o conteúdo do arquivo `supabase-add-role-column.sql`
4. Cole no editor
5. Clique em **Run** ou pressione `Ctrl + Enter`
6. Aguarde a confirmação de sucesso

#### Passo 2: Criar tabela de afiliações
1. Ainda no **SQL Editor**
2. Clique em **New query** novamente
3. Copie todo o conteúdo do arquivo `supabase-affiliate.sql`
4. Cole no editor
5. Clique em **Run** ou pressione `Ctrl + Enter`
6. Aguarde a confirmação de sucesso

### 3. Verifique se foi criado corretamente

Após executar o script, verifique se a tabela foi criada:

1. Vá em **Database** → **Tables**
2. Procure pela tabela `affiliate_requests`
3. Você deve ver:
   - ✅ Tabela `affiliate_requests` criada
   - ✅ Colunas: id, user_id, full_name, email, whatsapp, sales_experience, traffic_type, status, etc.
   - ✅ Políticas RLS configuradas

## 👤 Como criar o primeiro usuário Admin

Para acessar a dashboard administrativa, você precisa ter um usuário com role "admin".

### Método 1: Via SQL (Mais rápido)

1. Primeiro, crie uma conta normalmente no sistema
2. Anote o email que você usou
3. No Supabase SQL Editor, execute:

```sql
-- Substitua 'seu-email@exemplo.com' pelo email da sua conta
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'seu-email@exemplo.com';
```

### Método 2: Via Table Editor

1. Vá em **Database** → **Tables**
2. Selecione a tabela `user_profiles`
3. Encontre seu usuário
4. Clique para editar
5. Mude o campo `role` de `user` para `admin`
6. Salve

## 🔐 Acessando a Dashboard Administrativa

Após configurar o usuário admin:

1. Acesse: `http://localhost:3000/admin2626`
2. Faça login com as credenciais do usuário admin
3. Você será redirecionado para `/admin2626/dashboard`

## 📊 Funcionalidades da Dashboard Admin

### 1. Usuários Cadastrados
- Visualizar todos os usuários do sistema
- Ver detalhes de cada usuário
- Ver quais produtos cada usuário deu START

### 2. Solicitações de Afiliação
- Ver todas as solicitações de afiliação
- Filtrar por status (pendente, aprovada, rejeitada)
- Aprovar ou rejeitar solicitações
- Adicionar observações administrativas

## 🎯 Testando o Sistema

### Teste 1: Formulário de Afiliação
1. Faça login como usuário normal
2. Vá para a aba "Rev VDA"
3. Preencha o formulário de afiliação
4. Clique em "Solicitar Afiliação"
5. Você deve ver uma mensagem de sucesso

### Teste 2: Dashboard Admin
1. Faça login como admin em `/admin2626`
2. Vá para a aba "Afiliações"
3. Você deve ver a solicitação que acabou de criar
4. Clique nela para ver os detalhes
5. Teste aprovar ou rejeitar

## ❓ Problemas Comuns

### Erro: "relation 'affiliate_requests' does not exist"
**Solução:** Você não executou o script SQL. Execute o arquivo `supabase-affiliate.sql` no Supabase.

### Erro: "Acesso negado. Apenas administradores podem acessar esta área"
**Solução:** Seu usuário não tem role de admin. Execute o SQL para atualizar a role:
```sql
UPDATE user_profiles SET role = 'admin' WHERE email = 'seu-email@exemplo.com';
```

### Não consigo ver as solicitações de afiliação
**Solução:** Verifique se as políticas RLS foram criadas corretamente. Execute novamente o script `supabase-affiliate.sql`.

## 📝 Notas Adicionais

- A tabela `affiliate_requests` armazena todas as solicitações de afiliação
- Apenas usuários com role "admin" podem acessar `/admin2626`
- As políticas RLS garantem que usuários normais só vejam suas próprias solicitações
- Admins podem ver todas as solicitações de todos os usuários
- O sistema mantém histórico de quem aprovou/rejeitou cada solicitação

## 🔄 Próximos Passos

Após configurar tudo:

1. ✅ Execute o script SQL no Supabase
2. ✅ Crie um usuário admin
3. ✅ Teste o formulário de afiliação
4. ✅ Teste a dashboard administrativa
5. ✅ Configure notificações por email (opcional)

---

**Desenvolvido com ❤️ para VDA Premium Hub**
