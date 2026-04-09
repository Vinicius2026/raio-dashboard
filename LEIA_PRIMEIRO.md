# ⚠️ LEIA PRIMEIRO - IMPORTANTE

## 🔧 Erro Resolvido!

O erro que você recebeu:
```
Error: Failed to run sql query: ERROR: 42703: column user_profiles.role does not exist
```

Foi porque a tabela `user_profiles` não tinha a coluna `role`.

---

## ✅ Solução: Execute os Scripts na Ordem Correta

### 📋 PASSO A PASSO:

#### 1️⃣ PRIMEIRO: Adicionar coluna 'role'
```
Arquivo: supabase-add-role-column.sql
```

**Como fazer:**
1. Abra o Supabase Dashboard
2. Vá em **SQL Editor**
3. Copie TODO o conteúdo do arquivo `supabase-add-role-column.sql`
4. Cole no editor
5. Clique em **RUN** ▶️
6. ✅ Aguarde ver "Success"

---

#### 2️⃣ SEGUNDO: Criar tabela de afiliações
```
Arquivo: supabase-affiliate.sql
```

**Como fazer:**
1. Ainda no **SQL Editor**
2. Clique em **New Query**
3. Copie TODO o conteúdo do arquivo `supabase-affiliate.sql`
4. Cole no editor
5. Clique em **RUN** ▶️
6. ✅ Aguarde ver "Success"

---

#### 3️⃣ TERCEIRO: Tornar seu usuário admin
```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'seu-email-aqui@exemplo.com';
```

**Como fazer:**
1. No **SQL Editor**, clique em **New Query**
2. Cole o código acima
3. **IMPORTANTE:** Substitua `seu-email-aqui@exemplo.com` pelo email da sua conta
4. Clique em **RUN** ▶️
5. ✅ Deve retornar "1 row updated"

---

## 🎉 Pronto! Agora você pode:

### Para Usuários Normais:
1. Acessar `/dashboard`
2. Ir para a aba **Rev VDA**
3. Preencher o formulário de afiliação
4. Clicar em "Solicitar Afiliação"

### Para Administradores:
1. Acessar `/admin2626`
2. Fazer login com suas credenciais de admin
3. Ver usuários cadastrados
4. Revisar e aprovar/rejeitar solicitações de afiliação

---

## 📚 Documentação Completa:

- `INSTRUCOES_BANCO_DADOS.md` - Guia detalhado do banco de dados
- `SISTEMA_AFILIACAO_ADMIN.md` - Documentação completa do sistema

---

## ❓ Dúvidas Comuns:

**Q: Qual a diferença entre os dois scripts SQL?**
- `supabase-add-role-column.sql` → Adiciona a coluna "role" na tabela existente
- `supabase-affiliate.sql` → Cria a tabela de solicitações de afiliação

**Q: Posso executar os dois scripts juntos?**
- Não! Execute na ordem: primeiro o `add-role-column`, depois o `affiliate`

**Q: Como sei se funcionou?**
- Depois de executar ambos os scripts, você não deve ver mais o erro
- Você conseguirá acessar `/admin2626` e fazer login

**Q: E se eu já executei o `supabase-affiliate.sql` antes?**
- Não tem problema! Execute o `supabase-add-role-column.sql` agora
- Depois execute o `supabase-affiliate.sql` novamente

---

**Desenvolvido com ❤️ para VDA Premium Hub**
