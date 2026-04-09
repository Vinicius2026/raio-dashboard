# 🎨 Guia de Estilo - VDA Landing Page

## 📏 Convenções de Código

### TypeScript
```typescript
// ✅ BOM - Use interfaces para props
interface ButtonProps {
  title: string;
  onClick: () => void;
}

// ✅ BOM - Use type para unions
type Status = 'pending' | 'active' | 'completed';

// ❌ EVITAR - any type
const data: any = fetchData(); // Evite usar 'any'
```

### Componentes React
```tsx
// ✅ BOM - Componentes funcionais com TypeScript
export default function ComponentName({ prop }: Props) {
  return <div>...</div>
}

// ✅ BOM - Use 'use client' quando necessário
"use client";

import { useState } from "react";
```

### Nomenclatura

#### Arquivos
- Componentes: `PascalCase.tsx` (ex: `FloatingLogo.tsx`)
- Utilitários: `camelCase.ts` (ex: `supabase.ts`)
- Páginas: `page.tsx`, `layout.tsx` (padrão Next.js)

#### Variáveis
```typescript
// ✅ BOM
const userName = "João";
const isActive = true;
const itemCount = 10;

// ❌ EVITAR
const user_name = "João";
const active = true;
const count = 10;
```

#### Funções
```typescript
// ✅ BOM - Verbos no início
function fetchUserData() {}
function handleClick() {}
function validateEmail() {}

// ❌ EVITAR
function userData() {}
function click() {}
function email() {}
```

---

## 🎨 Tailwind CSS

### Classes Ordenadas
```tsx
// ✅ BOM - Ordem lógica: Layout → Spacing → Visual → Interação
<div className="flex items-center justify-between px-4 py-2 bg-vda-black text-vda-white rounded-xl hover:bg-vda-gray transition-colors">
  ...
</div>

// Ordem recomendada:
// 1. Display/Position (flex, grid, absolute)
// 2. Layout (w-, h-, items-, justify-)
// 3. Spacing (p-, m-, space-)
// 4. Typography (text-, font-)
// 5. Visual (bg-, border-, shadow-)
// 6. States (hover:, focus:, active:)
// 7. Transitions (transition-)
```

### Cores
```tsx
// ✅ BOM - Use variáveis customizadas
<div className="bg-vda-black text-vda-white">

// ❌ EVITAR - Valores hardcoded
<div className="bg-[#000000] text-[#FFFFFF]">
```

### Responsividade
```tsx
// ✅ BOM - Mobile first
<div className="text-base md:text-lg lg:text-xl">

// ❌ EVITAR - Desktop first
<div className="text-xl md:text-lg sm:text-base">
```

---

## 🎭 Framer Motion

### Animações Básicas
```tsx
// ✅ BOM - Animações suaves e propositais
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Conteúdo
</motion.div>

// ❌ EVITAR - Animações exageradas
<motion.div
  animate={{ rotate: 360, scale: [1, 2, 1] }}
  transition={{ duration: 10, repeat: Infinity }}
>
  Conteúdo (muito)
</motion.div>
```

### Performance
```tsx
// ✅ BOM - Use whileHover/whileTap para interações
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Clique
</motion.button>

// ✅ BOM - Use layout animations quando apropriado
<motion.div layout>...</motion.div>
```

---

## 📁 Organização de Arquivos

### Estrutura de Componente
```tsx
// ComponentName.tsx

"use client"; // Se usar hooks ou eventos

import { motion } from "framer-motion";
import { Icon } from "lucide-react";

// 1. Tipos/Interfaces
interface ComponentProps {
  title: string;
}

// 2. Constantes
const ANIMATION_DURATION = 0.6;

// 3. Componente
export default function ComponentName({ title }: ComponentProps) {
  // 3.1 Hooks
  const [state, setState] = useState();
  
  // 3.2 Funções auxiliares
  const handleAction = () => {};
  
  // 3.3 Render
  return (
    <div>
      {title}
    </div>
  );
}
```

---

## 🔍 Boas Práticas

### Performance

#### Imagens
```tsx
// ✅ BOM - Use Next Image
import Image from "next/image";

<Image
  src="/images/photo.jpg"
  alt="Descrição"
  width={400}
  height={400}
  loading="lazy"
/>

// ❌ EVITAR - img tag
<img src="/images/photo.jpg" />
```

#### Lazy Loading
```tsx
// ✅ BOM - Lazy load componentes pesados
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Carregando...</p>
});
```

### Acessibilidade

```tsx
// ✅ BOM - Alt text, aria-labels, roles
<button aria-label="Fechar menu">
  <X />
</button>

<img src="..." alt="Logo VDA" />

// ✅ BOM - Navegação por teclado
<button
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
```

### SEO

```tsx
// ✅ BOM - Meta tags em cada página
export const metadata: Metadata = {
  title: "Página | VDA",
  description: "Descrição específica",
}

// ✅ BOM - Semantic HTML
<header>...</header>
<main>...</main>
<footer>...</footer>
<section>...</section>
<article>...</article>
```

---

## 🚨 Evitar

### ❌ Inline Styles
```tsx
// ❌ EVITAR
<div style={{ color: 'white', padding: '20px' }}>

// ✅ BOM - Use Tailwind
<div className="text-white p-5">
```

### ❌ Magic Numbers
```tsx
// ❌ EVITAR
setTimeout(() => {}, 3000);

// ✅ BOM - Use constantes
const ANIMATION_DELAY = 3000;
setTimeout(() => {}, ANIMATION_DELAY);
```

### ❌ Nested Ternaries
```tsx
// ❌ EVITAR
{status === 'loading' ? <Loading /> : status === 'error' ? <Error /> : <Content />}

// ✅ BOM - Use funções auxiliares
function renderContent() {
  if (status === 'loading') return <Loading />;
  if (status === 'error') return <Error />;
  return <Content />;
}
```

---

## ✅ Checklist de Código

Antes de commitar, verifique:

- [ ] Código formatado corretamente
- [ ] Sem console.logs esquecidos
- [ ] Sem comentários desnecessários
- [ ] Imports organizados
- [ ] TypeScript sem erros
- [ ] Responsive em mobile
- [ ] Alt text nas imagens
- [ ] Animações suaves
- [ ] Sem magic numbers
- [ ] Nomenclatura consistente

---

## 📚 Recursos

- [Next.js Best Practices](https://nextjs.org/docs)
- [React Best Practices](https://react.dev/)
- [Tailwind Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [Framer Motion Docs](https://www.framer.com/motion/)

---

**Última atualização:** Janeiro 2026
