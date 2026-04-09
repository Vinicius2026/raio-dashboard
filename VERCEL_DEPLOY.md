# 🚀 Guia de Deploy na Vercel - VDA Landing Page

## 📋 Pré-requisitos

- [ ] Conta no GitHub/GitLab/Bitbucket
- [ ] Conta no Supabase (https://supabase.com)
- [ ] Conta na Vercel (https://vercel.com) - pode criar durante o processo
- [ ] Projeto funcionando localmente (`npm run dev`)

---

## 🔐 Passo 1: Obter Credenciais do Supabase

### 1.1 Acesse seu projeto no Supabase

1. Vá para [https://app.supabase.com](https://app.supabase.com)
2. Selecione seu projeto (ou crie um novo se necessário)

### 1.2 Obter as credenciais

1. No menu lateral, clique em **Settings** (⚙️)
2. Clique em **API** no submenu
3. Você verá duas informações importantes:

   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   Esta é sua `NEXT_PUBLIC_SUPABASE_URL`

   **anon/public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   Esta é sua `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 1.3 Copiar as credenciais

⚠️ **IMPORTANTE:** Copie essas credenciais e guarde em local seguro. Você precisará delas na Vercel.

---

## 📦 Passo 2: Preparar o Repositório Git

### 2.1 Verificar se já está versionado

```bash
# Verificar se já tem Git inicializado
git status
```

### 2.2 Se não tiver Git, inicializar:

```bash
# Inicializar Git
git init

# Adicionar todos os arquivos (exceto os ignorados pelo .gitignore)
git add .

# Fazer primeiro commit
git commit -m "feat: preparar projeto para deploy na Vercel"
```

### 2.3 Criar repositório no GitHub

1. Acesse [https://github.com/new](https://github.com/new)
2. Crie um novo repositório (ex: `vda-landing-page`)
3. **NÃO** inicialize com README, .gitignore ou license
4. Copie a URL do repositório

### 2.4 Conectar repositório local ao GitHub

```bash
# Adicionar remote
git remote add origin https://github.com/SEU-USUARIO/vda-landing-page.git

# Renomear branch para main (se necessário)
git branch -M main

# Fazer push
git push -u origin main
```

---

## 🌐 Passo 3: Deploy na Vercel

### 3.1 Criar conta na Vercel

1. Acesse [https://vercel.com](https://vercel.com)
2. Clique em **Sign Up**
3. Escolha **Continue with GitHub** (recomendado)
4. Autorize a Vercel a acessar seus repositórios

### 3.2 Importar Projeto

1. No dashboard da Vercel, clique em **Add New...** > **Project**
2. Você verá seus repositórios do GitHub
3. Clique em **Import** ao lado do repositório `vda-landing-page`

### 3.3 Configurar Projeto

A Vercel detectará automaticamente que é um projeto Next.js. Verifique:

- **Framework Preset:** Next.js ✅
- **Root Directory:** `./` (deixe padrão)
- **Build Command:** `npm run build` (automático)
- **Output Directory:** `.next` (automático)
- **Install Command:** `npm install` (automático)

### 3.4 ⚠️ CONFIGURAR VARIÁVEIS DE AMBIENTE (CRÍTICO!)

Antes de fazer deploy, configure as variáveis do Supabase:

1. Na seção **Environment Variables**, clique em **Add**
2. Adicione a primeira variável:
   - **Key:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** Cole a URL do seu projeto Supabase (ex: `https://xxxxxxxxxxxxx.supabase.co`)
   - **Environments:** Marque todas as opções:
     - ☑️ Production
     - ☑️ Preview
     - ☑️ Development

3. Clique em **Add** novamente e adicione a segunda variável:
   - **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** Cole a chave anon do Supabase (ex: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
   - **Environments:** Marque todas as opções:
     - ☑️ Production
     - ☑️ Preview
     - ☑️ Development

4. Verifique se ambas as variáveis aparecem na lista

### 3.5 Fazer Deploy

1. Clique em **Deploy**
2. Aguarde o processo (geralmente 2-5 minutos)
3. Você verá o progresso em tempo real

### 3.6 Verificar Deploy

Após o deploy concluir:

1. Você receberá uma URL temporária (ex: `vda-landing-page.vercel.app`)
2. Clique na URL para abrir o site
3. Teste se está funcionando:
   - ✅ Página inicial carrega
   - ✅ Login funciona
   - ✅ Dashboard funciona (se autenticado)

---

## 🔄 Passo 4: Deploy Automático (Configurado!)

A partir de agora, **cada push no GitHub** fará deploy automático:

### 4.1 Para atualizar o site:

```bash
# Fazer alterações no código
# ... editar arquivos ...

# Commitar mudanças
git add .
git commit -m "feat: adicionar nova funcionalidade"

# Fazer push
git push origin main
```

A Vercel detectará automaticamente e fará novo deploy! 🎉

### 4.2 Preview Deploys

- Cada **Pull Request** criado gera um **Preview Deploy** com URL única
- Permite testar mudanças antes de fazer merge
- Perfeito para revisão de código

---

## 🌍 Passo 5: Configurar Domínio Customizado (Opcional)

### 5.1 Adicionar Domínio

1. No dashboard da Vercel, vá em **Settings** > **Domains**
2. Digite seu domínio (ex: `vda.com.br`)
3. Clique em **Add**

### 5.2 Configurar DNS

A Vercel mostrará instruções específicas. Geralmente:

**Para domínio raiz (`vda.com.br`):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (IP da Vercel)

**Para subdomínio (`www.vda.com.br`):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

### 5.3 Aguardar Propagação

- Pode levar de alguns minutos até 48 horas
- A Vercel verificará automaticamente quando estiver pronto

---

## ✅ Checklist Pós-Deploy

- [ ] Site está acessível na URL da Vercel
- [ ] Página inicial carrega corretamente
- [ ] Login funciona e conecta ao Supabase
- [ ] Dashboard carrega após login
- [ ] Imagens estão carregando
- [ ] Não há erros no console do navegador
- [ ] Variáveis de ambiente estão configuradas corretamente

---

## 🐛 Troubleshooting

### Erro: "Missing environment variables"

**Solução:** Verifique se adicionou as variáveis na Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Erro: "Failed to fetch" no login

**Solução:** 
1. Verifique se a URL do Supabase está correta (sem barra no final)
2. Verifique se a chave anon está completa
3. Verifique se as políticas RLS no Supabase estão configuradas

### Build falha

**Solução:**
1. Teste localmente: `npm run build`
2. Verifique os logs de erro na Vercel
3. Certifique-se de que todas as dependências estão no `package.json`

### Site não atualiza após push

**Solução:**
1. Verifique se o push foi feito na branch `main`
2. Verifique os logs de deploy na Vercel
3. Tente fazer deploy manual: vá em **Deployments** > **Redeploy**

---

## 📚 Recursos Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Supabase](https://supabase.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## 🎉 Pronto!

Seu site está no ar! Cada mudança no código será automaticamente deployada.

**URL do seu site:** `https://vda-landing-page.vercel.app` (ou seu domínio customizado)
