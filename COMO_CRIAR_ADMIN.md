# 👑 Como Criar Admin - Guia Rápido

## ⚡ 3 Passos Simples

---

## 1️⃣ Executar SQL no Supabase

### **Onde:**
https://supabase.com/dashboard → SQL Editor

### **O que executar:**
Arquivo: `supabase-admin-system.sql`

### **Como:**
1. Copie TUDO do arquivo
2. Cole no SQL Editor
3. Clique em RUN (F5)
4. Veja "Success" ✅

**Tempo:** 30 segundos

---

## 2️⃣ Criar Seu Primeiro Admin

### **No SQL Editor, execute:**

```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'SEU-EMAIL-AQUI@exemplo.com';
```

### **⚠️ IMPORTANTE:**
Troque `'SEU-EMAIL-AQUI@exemplo.com'` pelo seu email REAL!

### **Exemplo:**
```sql
-- Se seu email é joao@gmail.com:
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'joao@gmail.com';
```

**Resultado:** Você agora é ADMIN! 👑

---

## 3️⃣ Verificar

### **No SQL Editor:**

```sql
SELECT email, role FROM user_profiles WHERE role = 'admin';
```

**Deve mostrar:**
```
email                | role
---------------------|------
joao@gmail.com       | admin
```

✅ **Pronto!** Você é admin agora!

---

## 🎯 O Que Isso Te Dá

### **Como Admin você pode:**

✅ Ver perfis de TODOS os usuários  
✅ Editar QUALQUER perfil  
✅ Ver produtos de TODOS  
✅ Promover outros usuários a admin  
✅ Rebaixar admins a usuários  
✅ Acesso total ao sistema  

### **Usuários normais podem:**

✅ Ver apenas seu próprio perfil  
✅ Editar apenas seu perfil  
✅ Ver apenas seus produtos  

---

## 💻 Usar no Código

### **Verificar se você é admin:**

```typescript
import { isCurrentUserAdmin } from '@/lib/supabase';

const isAdmin = await isCurrentUserAdmin();

if (isAdmin) {
  console.log('Você é admin! 👑');
} else {
  console.log('Você é usuário normal');
}
```

### **Proteger uma página:**

```typescript
// No início da página admin
useEffect(() => {
  async function checkAccess() {
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      router.push('/dashboard'); // Redireciona se não for admin
    }
  }
  checkAccess();
}, []);
```

### **Promover outro usuário:**

```typescript
import { promoteToAdmin } from '@/lib/supabase';

// Apenas admins podem fazer isso
await promoteToAdmin('uuid-do-usuario');
```

---

## 🔐 Segurança

**Não tem como burlar!**

- ✅ RLS (Row Level Security) no banco
- ✅ Políticas forçadas pelo Supabase
- ✅ Verificação em todas as queries
- ✅ Usuário não pode se auto-promover

**Testes de segurança:**
```
Usuário normal tenta ver perfil de admin → BLOQUEADO ❌
Usuário normal tenta se promover → BLOQUEADO ❌
Usuário normal tenta promover outro → BLOQUEADO ❌
Admin vê todos os perfis → PERMITIDO ✅
```

---

## 📊 Queries Úteis

### **Ver todos os admins:**
```sql
SELECT * FROM user_profiles WHERE role = 'admin';
```

### **Ver todos os usuários:**
```sql
SELECT * FROM user_profiles WHERE role = 'user';
```

### **Contar:**
```sql
SELECT role, COUNT(*) FROM user_profiles GROUP BY role;
```

### **Promover manualmente:**
```sql
UPDATE user_profiles SET role = 'admin' WHERE email = 'email@user.com';
```

### **Rebaixar manualmente:**
```sql
UPDATE user_profiles SET role = 'user' WHERE email = 'email@admin.com';
```

---

## ⚡ Resumo ULTRA Rápido

```
1. SQL Editor no Supabase
2. Execute: supabase-admin-system.sql
3. Execute: UPDATE user_profiles SET role = 'admin' WHERE email = 'SEU-EMAIL';
4. Pronto! Você é admin! 👑
```

**Tempo total:** 2 minutos

---

## 🎉 Próximos Passos (Opcional)

### **Criar painel administrativo:**
- Criar rota `/admin`
- Listar todos usuários
- Botões para promover/rebaixar
- Ver estatísticas globais

### **Ver documentação completa:**
Arquivo: `ADMIN_SYSTEM.md`

---

**Arquivo para executar:** `supabase-admin-system.sql`  
**SQL para ser admin:** `UPDATE user_profiles SET role = 'admin' WHERE email = 'SEU-EMAIL';`  
**Tempo:** 2 minutos  
**Dificuldade:** ⭐ Muito Fácil
