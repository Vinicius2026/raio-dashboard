# Guia de Personalização - VDA Landing Page

## 🎨 Cores Personalizadas

As cores do projeto estão definidas em `tailwind.config.ts`:

```typescript
colors: {
  'vda-black': '#000000',      // Fundo principal
  'vda-gray': '#4A4A4A',       // Acentos escuros
  'vda-light-gray': '#6B7280', // Textos secundários
  'vda-white': '#FFFFFF',      // Texto principal
}
```

Para alterar uma cor, edite o arquivo e use as classes no código:
- `bg-vda-black` - Fundo preto
- `text-vda-white` - Texto branco
- `text-vda-light-gray` - Texto cinza claro

---

## 🔗 Personalizar Links do Hub

Edite o arquivo `components/LinkHub.tsx` na constante `links`:

```typescript
const links = [
  {
    title: "Seu Título",
    description: "Sua descrição",
    icon: Smartphone, // Ícone do Lucide React
    url: "https://seu-link.com",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  // ... adicione mais links
];
```

**Ícones disponíveis:**
- `Smartphone`, `Calendar`, `CreditCard`, `Users`, `TrendingUp`
- Veja mais em: https://lucide.dev/icons/

---

## 👤 Adicionar Foto do Thiago Lima

1. Coloque a foto na pasta `public/images/`:
   - Exemplo: `public/images/thiago-lima.jpg`

2. No arquivo `components/Footer.tsx`, substitua o placeholder:

```tsx
<Image
  src="/images/thiago-lima.jpg"
  alt="Thiago Lima"
  fill
  className="object-cover grayscale"
/>
```

---

## 🔐 Configurar Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)

2. Copie as credenciais para `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
```

3. O arquivo `lib/supabase.ts` já está configurado!

---

## 📱 Redes Sociais

Edite `components/Footer.tsx` na constante `socialLinks`:

```typescript
const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/seuusuario",
  },
  // ... atualize os links
];
```

---

## ✨ Animações Personalizadas

As animações estão configuradas em `tailwind.config.ts`:

- `animate-float` - Flutuação suave
- `animate-pulse-glow` - Pulso com brilho

Para criar novas animações:

```typescript
animation: {
  'sua-animacao': 'sua-animacao 2s ease-in-out infinite',
},
keyframes: {
  'sua-animacao': {
    '0%, 100%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
  },
}
```

---

## 🎯 Alterar CTA Principal

Edite `components/Hero.tsx` no botão principal:

```tsx
<motion.a
  href="SEU_LINK_AQUI"
  className="..."
>
  <span>SEU TEXTO AQUI</span>
</motion.a>
```

---

## 📝 Meta Tags e SEO

Edite `app/layout.tsx` para alterar:

```typescript
export const metadata: Metadata = {
  title: "Seu Título | Seu Subtítulo",
  description: "Sua descrição para SEO",
  keywords: ["palavra1", "palavra2"],
};
```

---

## 🚀 Deploy

### Vercel (Recomendado)
1. Faça push para GitHub
2. Conecte no [vercel.com](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy automático!

### Netlify
1. Faça push para GitHub
2. Conecte no [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`

---

## 📊 Adicionar Analytics

Para Google Analytics, adicione em `app/layout.tsx` antes de `</body>`:

```tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
  `}
</Script>
```

---

## 🎨 Glassmorphism Customizado

Use a classe `.glassmorphism` ou customize em `globals.css`:

```css
.glassmorphism {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 💡 Dicas de Performance

- ✅ As imagens devem estar otimizadas (WebP)
- ✅ Use `loading="lazy"` para imagens
- ✅ Framer Motion já está otimizado
- ✅ Tailwind remove classes não utilizadas automaticamente

---

**Precisa de ajuda?** Consulte a documentação oficial:
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
