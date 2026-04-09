# 🗄️ Arquitetura do Banco de Dados - VDA Dashboard

## 📊 Visão Geral das Tabelas

```
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE DATABASE                         │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐
│   auth.users     │  ← Tabela nativa do Supabase (Autenticação)
│ ────────────────  │
│ • id (UUID)      │
│ • email          │
│ • password       │
│ • created_at     │
└────────┬─────────┘
         │
         │ 1:1 (Trigger automático)
         │
         ↓
┌──────────────────┐
│  user_profiles   │  ← Nossa tabela (Perfil do usuário)
│ ────────────────  │
│ • id (UUID) PK   │ ← FK para auth.users
│ • email          │
│ • full_name      │
│ • avatar_url     │
│ • phone          │
│ • subscription   │ ← free | premium | vip
│ • total_prods    │ ← Contador automático
│ • last_login_at  │
│ • created_at     │
│ • updated_at     │
└────────┬─────────┘
         │
         │ 1:N
         │
         ↓
┌───────────────────┐
│ selected_products │  ← Produtos que usuário escolheu (START)
│ ──────────────────  │
│ • id (BIGSERIAL)  │
│ • user_id (UUID)  │ ← FK para user_profiles
│ • product_id      │ ← 1-18
│ • created_at      │
└───────────────────┘
```

---

## 🔗 Relacionamentos

### **1. auth.users → user_profiles (1:1)**

```
auth.users                    user_profiles
┌──────────┐                 ┌──────────┐
│ id (PK)  │─────────────────│ id (FK)  │
│ email    │                 │ email    │
│ password │                 │ ...      │
└──────────┘                 └──────────┘

Trigger: on_auth_user_created
Ação: Cria perfil automaticamente ao registrar
```

---

### **2. user_profiles → selected_products (1:N)**

```
user_profiles                selected_products
┌──────────┐                ┌─────────────┐
│ id (PK)  │────────────────│ user_id(FK) │
│ email    │        │       │ product_id  │
│ ...      │        │       │ ...         │
└──────────┘        │       └─────────────┘
                    │       ┌─────────────┐
                    ├───────│ user_id(FK) │
                    │       │ product_id  │
                    │       └─────────────┘
                    │       ┌─────────────┐
                    └───────│ user_id(FK) │
                            │ product_id  │
                            └─────────────┘

Trigger: sync_products_count_trigger
Ação: Atualiza total_products_selected automaticamente
```

---

## ⚡ Triggers Automáticos

### **1. Criar Perfil ao Registrar**

```sql
Trigger: on_auth_user_created
Tabela: auth.users
Evento: AFTER INSERT
Função: handle_new_user()

Fluxo:
Usuario.criar() → auth.users INSERT → Trigger → user_profiles INSERT
```

---

### **2. Atualizar Last Login**

```sql
Trigger: on_user_login
Tabela: auth.sessions
Evento: AFTER INSERT
Função: update_last_login()

Fluxo:
Usuario.login() → sessions INSERT → Trigger → user_profiles UPDATE last_login_at
```

---

### **3. Sincronizar Contador de Produtos**

```sql
Trigger: sync_products_count_trigger
Tabela: selected_products
Evento: AFTER INSERT OR DELETE
Função: sync_products_count()

Fluxo INSERT:
Produto.adicionar() → INSERT → Trigger → user_profiles.total += 1

Fluxo DELETE:
Produto.remover() → DELETE → Trigger → user_profiles.total -= 1
```

---

### **4. Atualizar Timestamp**

```sql
Trigger: update_user_profiles_updated_at
Tabela: user_profiles
Evento: BEFORE UPDATE
Função: update_updated_at_column()

Fluxo:
Perfil.atualizar() → UPDATE → Trigger → updated_at = NOW()
```

---

## 🔐 Row Level Security (RLS)

### **Tabela: user_profiles**

#### **Política 1: SELECT (Leitura)**
```sql
Nome: "Users can view their own profile"
Condição: auth.uid() = id

Permite: Usuário ver APENAS seu próprio perfil
Bloqueia: Ver perfil de outros usuários
```

#### **Política 2: UPDATE (Atualização)**
```sql
Nome: "Users can update their own profile"
Condição: auth.uid() = id

Permite: Usuário atualizar APENAS seu próprio perfil
Bloqueia: Atualizar perfil de outros
```

#### **Política 3: INSERT (Criação)**
```sql
Nome: "Service role can insert profiles"
Condição: true (apenas service role)

Permite: Apenas triggers/sistema criar perfis
Bloqueia: Usuários criarem perfis manualmente
```

---

### **Tabela: selected_products**

#### **Política 1: SELECT**
```sql
Nome: "Users can view their own selected products"
Condição: auth.uid() = user_id

Permite: Ver APENAS seus próprios produtos
```

#### **Política 2: INSERT**
```sql
Nome: "Users can add their own selected products"
Condição: auth.uid() = user_id

Permite: Adicionar APENAS à própria lista
```

#### **Política 3: DELETE**
```sql
Nome: "Users can delete their own selected products"
Condição: auth.uid() = user_id

Permite: Remover APENAS da própria lista
```

---

## 📈 Índices para Performance

### **Tabela: user_profiles**

```sql
1. idx_user_profiles_email
   Campo: email
   Tipo: B-tree
   Uso: Busca rápida por email

2. idx_user_profiles_subscription
   Campo: subscription_status
   Tipo: B-tree
   Uso: Filtrar por tipo de assinatura

3. idx_user_profiles_last_login
   Campo: last_login_at DESC
   Tipo: B-tree
   Uso: Ordenar por último login
```

### **Tabela: selected_products**

```sql
1. idx_selected_products_user_id
   Campo: user_id
   Tipo: B-tree
   Uso: Buscar produtos de um usuário

2. idx_selected_products_product_id
   Campo: product_id
   Tipo: B-tree
   Uso: Ver quem selecionou um produto

3. idx_selected_products_created_at
   Campo: created_at DESC
   Tipo: B-tree
   Uso: Ordenar por data de seleção
```

---

## 🔄 Fluxos Completos

### **Fluxo 1: Registro de Novo Usuário**

```
1. Usuário preenche formulário
   └─ Email: user@email.com
   └─ Senha: ********

2. Frontend chama signUp()
   └─ Supabase Auth cria usuário

3. INSERT em auth.users
   └─ id: a1b2c3...
   └─ email: user@email.com

4. Trigger on_auth_user_created dispara

5. Função handle_new_user() executa

6. INSERT em user_profiles
   └─ id: a1b2c3... (mesmo da auth)
   └─ email: user@email.com
   └─ full_name: user@email.com (padrão)
   └─ subscription_status: 'free'
   └─ total_products_selected: 0

7. Usuário criado com perfil! ✅
```

---

### **Fluxo 2: Login do Usuário**

```
1. Usuário faz login
   └─ Email + Senha

2. Supabase valida credenciais

3. INSERT em auth.sessions
   └─ user_id: a1b2c3...
   └─ access_token: ...

4. Trigger on_user_login dispara

5. UPDATE em user_profiles
   └─ last_login_at: NOW()

6. Frontend carrega perfil:
   └─ getUserProfile(user_id)
   └─ getSelectedProducts(user_id)

7. Dashboard renderiza com dados! ✅
```

---

### **Fluxo 3: Selecionar Produto**

```
1. Usuário abre Produto #5

2. Clica em "START"

3. Frontend chama addSelectedProduct()

4. INSERT em selected_products
   └─ user_id: a1b2c3...
   └─ product_id: 5

5. Trigger sync_products_count dispara

6. UPDATE em user_profiles
   └─ total_products_selected: 0 → 1

7. Estado local atualiza
   └─ setIsSelected(true)

8. Botão muda para "INICIADO" ✅

9. Usuário volta para HOME

10. Dashboard mostra Produto #5 em "Meus Produtos" ✅
```

---

### **Fluxo 4: Remover Produto**

```
1. Usuário abre Produto #5 (selecionado)

2. Vê botão "INICIADO"

3. Clica novamente

4. Frontend chama removeSelectedProduct()

5. DELETE em selected_products
   └─ WHERE user_id = a1b2c3... AND product_id = 5

6. Trigger sync_products_count dispara

7. UPDATE em user_profiles
   └─ total_products_selected: 1 → 0

8. Estado local atualiza
   └─ setIsSelected(false)

9. Botão volta para "START" ✅

10. Produto sai de "Meus Produtos" ✅
```

---

## 📊 Cardinalidade

```
1 Usuário (auth.users)
    ↓
1 Perfil (user_profiles)
    ↓
N Produtos Selecionados (selected_products)
    ↓
18 Produtos Disponíveis (mockados)
```

**Exemplo:**
```
Usuário A
├── Perfil A
└── Produtos Selecionados:
    ├── Produto #5
    ├── Produto #8
    └── Produto #12

Usuário B
├── Perfil B
└── Produtos Selecionados:
    ├── Produto #2
    └── Produto #15
```

---

## 🎯 Constraints e Regras

### **Unicidade:**
```sql
selected_products: UNIQUE(user_id, product_id)
```
**Impede:** Usuário selecionar mesmo produto 2x

---

### **Cascade:**
```sql
user_profiles: REFERENCES auth.users(id) ON DELETE CASCADE
```
**Garante:** Deletar usuário → Deleta perfil automaticamente

```sql
selected_products: user_id REFERENCES auth.users(id) ON DELETE CASCADE
```
**Garante:** Deletar usuário → Deleta produtos selecionados

---

### **Check Constraint:**
```sql
subscription_status CHECK (subscription_status IN ('free', 'premium', 'vip'))
```
**Garante:** Apenas valores válidos

---

## 📝 Queries Comuns

### **1. Ver perfil completo com produtos:**
```sql
SELECT 
  up.*,
  (
    SELECT json_agg(product_id)
    FROM selected_products sp
    WHERE sp.user_id = up.id
  ) as selected_products
FROM user_profiles up
WHERE up.id = 'USER_UUID';
```

---

### **2. Usuários mais ativos:**
```sql
SELECT 
  email,
  full_name,
  total_products_selected,
  subscription_status
FROM user_profiles
ORDER BY total_products_selected DESC
LIMIT 10;
```

---

### **3. Produtos mais populares:**
```sql
SELECT 
  product_id,
  COUNT(*) as total_usuarios,
  array_agg(up.email) as usuarios
FROM selected_products sp
JOIN user_profiles up ON sp.user_id = up.id
GROUP BY product_id
ORDER BY total_usuarios DESC;
```

---

### **4. Analytics de assinaturas:**
```sql
SELECT 
  subscription_status,
  COUNT(*) as total_usuarios,
  AVG(total_products_selected) as media_produtos
FROM user_profiles
GROUP BY subscription_status;
```

---

## 🔮 Escalabilidade Futura

### **Fácil adicionar:**

1. **Novos campos no perfil:**
   ```sql
   ALTER TABLE user_profiles ADD COLUMN company TEXT;
   ```

2. **Tabela de transações:**
   ```sql
   CREATE TABLE transactions (
     id BIGSERIAL PRIMARY KEY,
     user_id UUID REFERENCES user_profiles(id),
     amount DECIMAL(10,2),
     type TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. **Tabela de notificações:**
   ```sql
   CREATE TABLE notifications (
     id BIGSERIAL PRIMARY KEY,
     user_id UUID REFERENCES user_profiles(id),
     title TEXT,
     message TEXT,
     read BOOLEAN DEFAULT false,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

4. **Sistema de referral:**
   ```sql
   ALTER TABLE user_profiles 
   ADD COLUMN referred_by UUID REFERENCES user_profiles(id);
   ```

---

## ✅ Checklist de Verificação

### **Após executar os SQLs:**

#### **Tabelas:**
- [ ] `user_profiles` existe
- [ ] `selected_products` existe

#### **Triggers:**
- [ ] `on_auth_user_created` criado
- [ ] `on_user_login` criado
- [ ] `sync_products_count_trigger` criado
- [ ] `update_user_profiles_updated_at` criado

#### **Políticas RLS:**
- [ ] 3 políticas em `user_profiles`
- [ ] 3 políticas em `selected_products`

#### **Índices:**
- [ ] 3 índices em `user_profiles`
- [ ] 3 índices em `selected_products`

#### **Testes:**
- [ ] Perfis criados para usuários existentes
- [ ] Contadores sincronizados
- [ ] RLS funcionando

---

## 🎉 Resultado Final

**Banco de dados completo e profissional com:**

✅ 2 Tabelas customizadas  
✅ 4 Triggers automáticos  
✅ 6 Políticas de segurança (RLS)  
✅ 6 Índices otimizados  
✅ 3 Constraints de integridade  
✅ Sincronização automática  
✅ Zero código manual necessário  
✅ 100% seguro e escalável  

---

**Status**: ✅ Arquitetura Completa  
**Versão**: 1.0.0  
**Data**: 27/01/2026  
**Maturidade**: 🏆 Production Ready
