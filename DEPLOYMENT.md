# 🚀 Guia de Deploy - VDA Landing Page

## 📋 Pré-requisitos

Antes de fazer deploy, certifique-se de que:

- [ ] O projeto está funcionando localmente (`npm run dev`)
- [ ] Build de produção funciona sem erros (`npm run build`)
- [ ] Todas as variáveis de ambiente estão configuradas
- [ ] Código está versionado no Git
- [ ] Repository está no GitHub/GitLab/Bitbucket

---

## 🌐 Opção 1: Vercel (Recomendado)

### Vantagens
- ✅ Otimizado para Next.js
- ✅ Deploy automático em cada commit
- ✅ SSL gratuito
- ✅ CDN global
- ✅ Análises e logs integrados
- ✅ Preview para cada PR

### Passo a Passo

#### 1. Preparar o Repositório

```bash
# Inicializar Git (se ainda não foi feito)
git init
git add .
git commit -m "feat: initial commit - VDA Landing Page"

# Criar repositório no GitHub e fazer push
git remote add origin https://github.com/seu-usuario/vda-landing.git
git branch -M main
git push -u origin main
```

#### 2. Deploy na Vercel

**Via Dashboard:**
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu GitHub
4. Selecione o repositório
5. Configure:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Adicione variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Clique em "Deploy"

**Via CLI:**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

#### 3. Configurar Domínio Customizado

1. No dashboard da Vercel, vá em "Settings" > "Domains"
2. Adicione seu domínio: `www.vda.com.br`
3. Configure os DNS:
   - Type: `CNAME`
   - Name: `www` (ou `@` para root)
   - Value: `cname.vercel-dns.com`
4. Aguarde propagação (até 48h)

#### 4. Configurar Variáveis de Ambiente

No dashboard:
1. Settings > Environment Variables
2. Adicione cada variável:
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `sua-url-supabase`
   - Environment: Production, Preview, Development

---

## 🎨 Opção 2: Netlify

### Vantagens
- ✅ Interface simples
- ✅ SSL gratuito
- ✅ Forms integrados
- ✅ Funções serverless

### Passo a Passo

#### 1. Configurar Build

Crie `netlify.toml` na raiz:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### 2. Deploy

1. Acesse [netlify.com](https://netlify.com)
2. "New site from Git"
3. Conecte seu GitHub
4. Selecione o repositório
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Adicione variáveis de ambiente
7. "Deploy site"

---

## ☁️ Opção 3: AWS Amplify

### Vantagens
- ✅ Integração com serviços AWS
- ✅ Escalável
- ✅ SSL gratuito

### Passo a Passo

1. Console AWS > Amplify
2. "New app" > "Host web app"
3. Conecte repositório
4. Configure:
   - Build command: `npm run build`
   - Artifacts: `.next`
5. Adicione variáveis de ambiente
6. "Save and deploy"

---

## 🐳 Opção 4: Docker + VPS

### Vantagens
- ✅ Controle total
- ✅ Customizável
- ✅ Sem vendor lock-in

### Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

### Deploy

```bash
# Build
docker build -t vda-landing .

# Run
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your-url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key \
  vda-landing
```

---

## 🔒 Configurar SSL (Manual)

Se estiver usando VPS sem SSL automático:

### Com Certbot (Let's Encrypt)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d vda.com.br -d www.vda.com.br

# Renovar automaticamente
sudo certbot renew --dry-run
```

---

## 📊 Configurar Analytics

### Google Analytics

1. Crie uma propriedade no [analytics.google.com](https://analytics.google.com)
2. Copie o ID (ex: `G-XXXXXXXXXX`)
3. Adicione no `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. Crie `lib/analytics.ts`:

```typescript
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

5. Adicione no `app/layout.tsx`:

```tsx
import Script from 'next/script'

// Dentro do <body>
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>
```

---

## 🔍 SEO Pós-Deploy

### 1. Google Search Console

1. Acesse [search.google.com/search-console](https://search.google.com/search-console)
2. Adicione sua propriedade
3. Verifique a propriedade
4. Envie o sitemap: `https://seusite.com/sitemap.xml`

### 2. Criar Sitemap

Crie `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://vda.com.br',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://vda.com.br/login',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
```

### 3. Criar Robots.txt

Crie `app/robots.ts`:

```typescript
import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/'],
    },
    sitemap: 'https://vda.com.br/sitemap.xml',
  }
}
```

---

## ⚡ Otimizações Pós-Deploy

### 1. Comprimir Imagens

```bash
# Instalar sharp (já incluído no Next.js)
npm install sharp
```

### 2. Configurar Cache

No `next.config.js`:

```javascript
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
  compress: true,
}
```

### 3. Análise de Bundle

```bash
# Instalar
npm install @next/bundle-analyzer

# Analisar
ANALYZE=true npm run build
```

---

## 📈 Monitoramento

### Vercel Analytics

Já incluído automaticamente na Vercel.

### Sentry (Erros)

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

---

## 🔐 Segurança

### Headers de Segurança

No `next.config.js`:

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
]

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

---

## ✅ Checklist Pós-Deploy

- [ ] Site carrega corretamente
- [ ] SSL ativo (https://)
- [ ] Links funcionando
- [ ] Imagens carregando
- [ ] Mobile responsivo
- [ ] Analytics funcionando
- [ ] Formulários testados
- [ ] SEO configurado (sitemap, robots.txt)
- [ ] Domínio customizado configurado
- [ ] Variáveis de ambiente corretas
- [ ] Teste de performance (PageSpeed Insights)
- [ ] Backup configurado

---

## 🆘 Troubleshooting

### Build Falha

```bash
# Limpar cache
rm -rf .next node_modules
npm install
npm run build
```

### Erros de Variáveis de Ambiente

- Verifique se começam com `NEXT_PUBLIC_`
- Reconstrua após adicionar novas variáveis
- Use aspas se houver caracteres especiais

### Performance Lenta

- Otimize imagens (WebP, AVIF)
- Use lazy loading
- Minimize JavaScript
- Configure CDN

---

## 📚 Recursos

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)

---

**Última atualização:** Janeiro 2026
