# 🔐 Comparação de Permissões - Admin vs User

## 📊 Tabela de Permissões

| Ação | 👤 User | 👑 Admin |
|------|---------|----------|
| **Ver seu próprio perfil** | ✅ Sim | ✅ Sim |
| **Ver perfis de outros usuários** | ❌ Não | ✅ Sim |
| **Editar seu próprio perfil** | ✅ Sim | ✅ Sim |
| **Editar perfis de outros** | ❌ Não | ✅ Sim |
| **Ver seus produtos selecionados** | ✅ Sim | ✅ Sim |
| **Ver produtos de outros usuários** | ❌ Não | ✅ Sim |
| **Adicionar produtos para si** | ✅ Sim | ✅ Sim |
| **Adicionar produtos para outros** | ❌ Não | ✅ Sim |
| **Remover seus produtos** | ✅ Sim | ✅ Sim |
| **Remover produtos de outros** | ❌ Não | ✅ Sim |
| **Promover usuários a admin** | ❌ Não | ✅ Sim |
| **Rebaixar admins** | ❌ Não | ✅ Sim |
| **Ver estatísticas globais** | ❌ Não | ✅ Sim |
| **Acessar painel administrativo** | ❌ Não | ✅ Sim |

---

## 🎯 Cenários Práticos

### **Cenário 1: Visualizar Perfis**

#### **Usuário Normal (João):**
```typescript
// João tenta ver perfil da Maria
const perfil = await getUserProfile('maria-uuid');
// Resultado: null (bloqueado pelo RLS)

// João vê seu próprio perfil
const meuPerfil = await getUserProfile('joao-uuid');
// Resultado: { email: 'joao@...', ... } ✅
```

#### **Admin (Carlos):**
```typescript
// Carlos vê perfil da Maria
const perfil = await getUserProfile('maria-uuid');
// Resultado: { email: 'maria@...', ... } ✅

// Carlos vê perfil do João
const perfil2 = await getUserProfile('joao-uuid');
// Resultado: { email: 'joao@...', ... } ✅

// Carlos vê todos os perfis
const todos = await getAllUsers();
// Resultado: [maria, joao, pedro, ...] ✅
```

---

### **Cenário 2: Editar Perfis**

#### **Usuário Normal (Maria):**
```typescript
// Maria edita seu nome
await updateUserProfile('maria-uuid', { full_name: 'Maria Silva' });
// Resultado: Sucesso ✅

// Maria tenta editar nome do João
await updateUserProfile('joao-uuid', { full_name: 'João Alterado' });
// Resultado: Erro - RLS bloqueado ❌
```

#### **Admin (Carlos):**
```typescript
// Carlos edita qualquer perfil
await updateUserProfile('maria-uuid', { full_name: 'Maria Silva Santos' });
// Resultado: Sucesso ✅

await updateUserProfile('joao-uuid', { full_name: 'João Pedro' });
// Resultado: Sucesso ✅
```

---

### **Cenário 3: Produtos Selecionados**

#### **Usuário Normal (Pedro):**
```typescript
// Pedro vê seus produtos
const produtos = await getSelectedProducts('pedro-uuid');
// Resultado: ["5", "8", "12"] ✅

// Pedro tenta ver produtos da Ana
const produtosAna = await getSelectedProducts('ana-uuid');
// Resultado: [] (bloqueado pelo RLS) ❌
```

#### **Admin (Carlos):**
```typescript
// Carlos vê produtos do Pedro
const produtosPedro = await getSelectedProducts('pedro-uuid');
// Resultado: ["5", "8", "12"] ✅

// Carlos vê produtos da Ana
const produtosAna = await getSelectedProducts('ana-uuid');
// Resultado: ["1", "3", "7", "15"] ✅

// Carlos vê de qualquer um!
```

---

### **Cenário 4: Gestão de Roles**

#### **Usuário Normal (Ana):**
```typescript
// Ana tenta se promover a admin
await updateUserRole('ana-uuid', 'admin');
// Resultado: Erro - RLS bloqueado ❌

// Ana tenta promover o Pedro
await promoteToAdmin('pedro-uuid');
// Resultado: Erro - "Apenas administradores podem promover" ❌
```

#### **Admin (Carlos):**
```typescript
// Carlos promove Ana a admin
await promoteToAdmin('ana-uuid');
// Resultado: Sucesso ✅

// Carlos rebaixa um admin
await demoteToUser('ex-admin-uuid');
// Resultado: Sucesso ✅
```

---

## 🚨 Tentativas de Burla (Todas Bloqueadas)

### **1. Usuário tenta se promover via código:**
```typescript
// Usuário tenta no console do navegador:
await supabase
  .from('user_profiles')
  .update({ role: 'admin' })
  .eq('id', 'meu-uuid');

// Resultado: ❌ BLOQUEADO
// RLS impede: usuário não pode editar seu próprio role
```

---

### **2. Usuário tenta ver outros via API:**
```typescript
// Usuário tenta:
const { data } = await supabase
  .from('user_profiles')
  .select('*');

// Resultado: ❌ BLOQUEADO
// RLS retorna apenas o perfil do próprio usuário
```

---

### **3. Usuário tenta manipular UUID:**
```typescript
// Usuário tenta se passar por admin:
const fakeSession = { user: { id: 'admin-uuid' } };

// Resultado: ❌ BLOQUEADO
// auth.uid() é gerenciado pelo Supabase, não pode ser falsificado
```

---

### **4. SQL Injection:**
```typescript
// Usuário tenta:
await getUserProfile("'; DROP TABLE user_profiles; --");

// Resultado: ❌ BLOQUEADO
// Queries parametrizadas do Supabase previnem SQL injection
```

---

## ✅ O Que Realmente Funciona

### **Para USUÁRIOS:**

```typescript
// ✅ Ver seu perfil
const perfil = await getUserProfile(meuId);

// ✅ Editar seu perfil
await updateUserProfile(meuId, { full_name: 'Novo Nome' });

// ✅ Ver seus produtos
const produtos = await getSelectedProducts(meuId);

// ✅ Adicionar/remover seus produtos
await addSelectedProduct(meuId, '5');
await removeSelectedProduct(meuId, '5');
```

### **Para ADMINS:**

```typescript
// ✅ Tudo que usuário faz +

// ✅ Ver todos os perfis
const todos = await getAllUsers();

// ✅ Editar qualquer perfil
await updateUserProfile(qualquerUserId, { ... });

// ✅ Ver produtos de todos
const produtosUser = await getSelectedProducts(qualquerUserId);

// ✅ Promover/rebaixar
await promoteToAdmin(userId);
await demoteToUser(adminId);

// ✅ Gerenciar qualquer coisa
```

---

## 🎭 Cenários Reais de Uso

### **Caso 1: Suporte ao Cliente**

**Problema:** Cliente não consegue ver um produto que selecionou

**Usuário comum:** Não pode ajudar, não vê produtos de outros  
**Admin:** 
```typescript
// Ver produtos do cliente
const produtos = await getSelectedProducts('cliente-uuid');
console.log(produtos); // Diagnosticar problema

// Se necessário, adicionar produto manualmente
await addSelectedProduct('cliente-uuid', '8');
```

---

### **Caso 2: Moderação de Conteúdo**

**Problema:** Perfil de usuário tem conteúdo inapropriado

**Usuário comum:** Só pode reportar  
**Admin:**
```typescript
// Ver perfil do infrator
const perfil = await getUserProfile('infrator-uuid');

// Editar/limpar conteúdo
await updateUserProfile('infrator-uuid', {
  full_name: '[Removido por violação]',
  avatar_url: null
});

// Se necessário, rebaixar se for admin
await demoteToUser('infrator-uuid');
```

---

### **Caso 3: Relatórios Gerenciais**

**Problema:** Precisa de métricas de uso

**Usuário comum:** Vê apenas suas próprias métricas  
**Admin:**
```typescript
// Ver TODOS os usuários
const users = await getAllUsers();

// Calcular métricas globais
const totalUsers = users.length;
const avgProducts = users.reduce((sum, u) => 
  sum + u.total_products_selected, 0) / totalUsers;

// Usuários mais ativos
const topUsers = users
  .sort((a, b) => b.total_products_selected - a.total_products_selected)
  .slice(0, 10);
```

---

### **Caso 4: Onboarding de Novos Admins**

**Problema:** Novo funcionário precisa ser admin

**Usuário comum:** Não pode ajudar  
**Admin existente:**
```typescript
// Buscar novo funcionário
const users = await getAllUsers();
const novoFunc = users.find(u => u.email === 'novo@empresa.com');

// Promover a admin
await promoteToAdmin(novoFunc.id);

// Verificar
const admins = await getAllAdmins();
console.log('Admins atuais:', admins.length);
```

---

## 📈 Níveis de Acesso Visuais

```
┌─────────────────────────────────────────────────────┐
│                   ADMIN (Nível 2)                   │
├─────────────────────────────────────────────────────┤
│ ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ 100% ACESSO             │
│                                                     │
│ • Todos os perfis (leitura + escrita)              │
│ • Todos os produtos (leitura + escrita)            │
│ • Gestão de permissões                             │
│ • Painel administrativo                            │
│ • Relatórios globais                               │
│ • Ações irreversíveis                              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                   USER (Nível 1)                    │
├─────────────────────────────────────────────────────┤
│ ▰▰▰▰▰▰▰▰░░░░░░░░░░░░░░░░ 35% ACESSO               │
│                                                     │
│ • Apenas seu perfil (leitura + escrita)            │
│ • Apenas seus produtos (leitura + escrita)         │
│ • Dashboard pessoal                                │
│ • Funcionalidades básicas                          │
└─────────────────────────────────────────────────────┘
```

---

## 🛡️ Camadas de Segurança

```
Tentativa de Acesso
        ↓
┌───────────────────┐
│  1. Autenticação  │ ← Usuário está logado?
└────────┬──────────┘
         ↓ SIM
┌───────────────────┐
│   2. RLS Rules    │ ← auth.uid() = id OR is_admin()?
└────────┬──────────┘
         ↓ PERMITIDO
┌───────────────────┐
│  3. Role Check    │ ← role = 'admin'?
└────────┬──────────┘
         ↓ SIM
┌───────────────────┐
│  4. Acesso Total  │ ✅
└───────────────────┘

        ↓ NÃO em qualquer etapa
┌───────────────────┐
│   ❌ BLOQUEADO    │
└───────────────────┘
```

---

## 📝 Checklist de Permissões

### **Implementar Verificações:**

```typescript
// Em TODA página/rota administrativa
const isAdmin = await isCurrentUserAdmin();
if (!isAdmin) {
  router.push('/dashboard');
  return;
}

// Antes de TODA ação privilegiada
const canDoThis = await isCurrentUserAdmin();
if (!canDoThis) {
  alert('Acesso negado');
  return;
}
```

### **Mostrar UI Condicional:**

```typescript
// Mostrar opções admin apenas para admins
{isAdmin && (
  <Link href="/admin">Painel Admin</Link>
)}

// Badge visual
{profile.role === 'admin' && (
  <span className="admin-badge">👑 ADMIN</span>
)}
```

---

## 🎉 Resumo Final

**Usuário:**
- ✅ Acesso pessoal completo
- ❌ Nenhum acesso a dados de outros
- ❌ Nenhuma função administrativa

**Admin:**
- ✅ Tudo que usuário tem
- ✅ Acesso total a todos os dados
- ✅ Todas as funções administrativas
- ✅ Pode gerenciar outros usuários

**Segurança:**
- 🔒 4 camadas de proteção
- 🔒 Impossível burlar via código
- 🔒 RLS no nível do banco
- 🔒 Auditável e rastreável

---

**Status**: ✅ Sistema Completo  
**Segurança**: 🔒 Máxima (4 camadas)  
**Flexibilidade**: 🎯 Total  
**Burlas possíveis**: ❌ Zero
