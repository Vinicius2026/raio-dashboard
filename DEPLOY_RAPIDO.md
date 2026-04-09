# ⚡ Deploy Rápido na Vercel - Checklist

## 🎯 Passo a Passo Simplificado

### 1️⃣ Obter Credenciais do Supabase

1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2️⃣ Preparar Git

```bash
git init
git add .
git commit -m "feat: preparar para deploy"
git remote add origin https://github.com/SEU-USUARIO/vda-landing-page.git
git push -u origin main
```

### 3️⃣ Deploy na Vercel

1. Acesse: https://vercel.com
2. **Sign Up** com GitHub
3. **Add New Project**
4. Importe seu repositório
5. ⚠️ **ADICIONE AS VARIÁVEIS:**
   - `NEXT_PUBLIC_SUPABASE_URL` = sua URL do Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sua chave anon
6. Clique em **Deploy**

### 4️⃣ Pronto! 🎉

Seu site estará em: `https://vda-landing-page.vercel.app`

---

📖 **Guia completo:** Veja `VERCEL_DEPLOY.md` para detalhes
