# 📁 Estrutura do Projeto VDA

```
vda-landing-page/
│
├── 📂 app/                          # Next.js App Router
│   ├── 📂 dashboard/
│   │   └── page.tsx                 # Dashboard (placeholder)
│   ├── 📂 login/
│   │   └── page.tsx                 # Página de autenticação
│   ├── error.tsx                    # Página de erro global
│   ├── globals.css                  # Estilos globais + Glassmorphism
│   ├── layout.tsx                   # Layout raiz + Meta tags
│   ├── loading.tsx                  # Componente de loading
│   ├── not-found.tsx                # Página 404
│   └── page.tsx                     # Landing page principal
│
├── 📂 components/                   # Componentes React
│   ├── FloatingLogo.tsx             # Logo VDA com animação float
│   ├── Footer.tsx                   # Rodapé com bio + sociais
│   ├── Header.tsx                   # Header sticky com menu
│   ├── Hero.tsx                     # Seção hero + CTA
│   └── LinkHub.tsx                  # Cards de links principais
│
├── 📂 lib/                          # Bibliotecas e utilitários
│   ├── supabase.ts                  # Config Supabase + funções auth
│   └── utils.ts                     # Funções auxiliares (cn, formatDate...)
│
├── 📂 public/                       # Assets estáticos
│   ├── 📂 images/
│   │   └── README.md                # Guia de imagens
│   └── favicon.svg                  # Favicon SVG do VDA
│
├── 📂 node_modules/                 # Dependências (gerado automaticamente)
│
├── 📄 .env.local                    # Variáveis de ambiente (não commitar)
├── 📄 .gitignore                    # Arquivos ignorados pelo Git
├── 📄 COMMANDS.md                   # Comandos úteis do projeto
├── 📄 CUSTOMIZATION.md              # Guia de personalização
├── 📄 next.config.js                # Configuração do Next.js
├── 📄 package.json                  # Dependências e scripts
├── 📄 postcss.config.js             # Config PostCSS
├── 📄 QUICKSTART.md                 # Guia de início rápido
├── 📄 README.md                     # Documentação principal
├── 📄 SETUP.md                      # Guia de setup
├── 📄 tailwind.config.ts            # Config Tailwind (cores, animações)
└── 📄 tsconfig.json                 # Configuração TypeScript
```

---

## 📋 Descrição Detalhada

### 🎯 Arquivos Principais

#### `app/page.tsx`
Landing page principal que importa todos os componentes:
- Header
- Hero
- LinkHub  
- Footer

#### `app/layout.tsx`
Layout global com:
- Meta tags SEO
- Google Fonts (Inter)
- Configuração HTML
- Favicon

#### `app/globals.css`
Estilos globais incluindo:
- Importações Tailwind
- Classes `.glassmorphism`
- Classes `.gradient-border`
- Reset CSS

---

### 🎨 Componentes

#### `Header.tsx`
- Menu fixo com backdrop blur
- Botão de login
- Menu mobile responsivo
- Animações de entrada

#### `Hero.tsx`
- Logo flutuante central
- Título + descrição
- CTA principal com pulso
- Scroll indicator

#### `FloatingLogo.tsx`
- Logo VDA com animação float (3s loop)
- Efeito glassmorphism
- Glow effect
- Dots decorativos

#### `LinkHub.tsx`
- 5 cards de links principais
- Ícones personalizados
- Gradientes únicos por card
- Animações no hover

#### `Footer.tsx`
- Foto do especialista (placeholder)
- Bio descritiva
- 4 ícones sociais
- Copyright

---

### ⚙️ Configurações

#### `tailwind.config.ts`
**Cores customizadas:**
- `vda-black`: #000000
- `vda-gray`: #4A4A4A
- `vda-light-gray`: #6B7280
- `vda-white`: #FFFFFF

**Animações:**
- `animate-float`: Flutuação 3s
- `animate-pulse-glow`: Pulso com brilho

#### `tsconfig.json`
- Paths aliases: `@/*`
- Strict mode ativado
- JSX preserve

#### `next.config.js`
- Otimização de imagens
- Formatos: AVIF, WebP
- CSS optimization experimental

---

### 📚 Documentação

| Arquivo | Propósito |
|---------|-----------|
| `README.md` | Documentação geral do projeto |
| `QUICKSTART.md` | Checklist de setup rápido |
| `CUSTOMIZATION.md` | Guia de personalização |
| `COMMANDS.md` | Comandos úteis NPM/Next.js |
| `SETUP.md` | Resumo da estrutura criada |

---

### 🔐 Arquivos Sensíveis

**NÃO COMMITAR:**
- `.env.local` - Contém chaves API
- `node_modules/` - Dependências
- `.next/` - Build cache

---

## 🚀 Fluxo de Navegação

```
┌─────────────┐
│   /         │ Landing Page
│  (Home)     │
└──────┬──────┘
       │
       ├──────> /login ────────> /dashboard
       │       (Auth)           (Protected)
       │
       └──────> /not-found
               (404)
```

---

## 📦 Dependências Principais

### Produção
- `next`: ^14.1.0
- `react`: ^18.2.0
- `framer-motion`: ^11.0.3
- `lucide-react`: ^0.316.0
- `@supabase/supabase-js`: ^2.39.3
- `tailwindcss`: ^3.4.1

### Desenvolvimento
- `typescript`: ^5.3.3
- `@types/react`: ^18.2.48
- `eslint`: ^8.56.0

---

## 🎯 Páginas e Rotas

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | `app/page.tsx` | Landing page |
| `/login` | `app/login/page.tsx` | Autenticação |
| `/dashboard` | `app/dashboard/page.tsx` | Dashboard |
| `/*` | `app/not-found.tsx` | 404 |

---

## 🎨 Sistema de Design

### Espaçamento
- Padding: `p-4`, `p-6`, `p-8`
- Margin: `mb-4`, `mt-8`, `space-y-6`

### Tipografia
- Títulos: `text-2xl`, `text-3xl`, `text-4xl`
- Corpo: `text-base`, `text-lg`
- Peso: `font-normal`, `font-semibold`, `font-bold`

### Bordas
- Raio: `rounded-xl` (12px), `rounded-2xl` (16px)
- Bordas: `border`, `border-white/10`

### Efeitos
- Backdrop: `backdrop-blur-md`
- Sombras: `shadow-2xl`
- Transições: `transition-colors`, `transition-all`

---

## 🔄 Estados do Componente

### Loading
```tsx
<Loading /> // Exibe VDA pulsante + spinner
```

### Error
```tsx
<Error error={...} reset={...} /> // Tela de erro com retry
```

### Not Found
```tsx
<NotFound /> // 404 estilizado
```

---

**Última atualização:** Janeiro 2026
**Versão:** 1.0.0
