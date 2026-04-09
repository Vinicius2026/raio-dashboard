# 📚 Exemplos de Uso - Componentes VDA

## 🎨 Button Component

### Importação
```tsx
import Button from "@/components/Button";
import { Sparkles, ArrowRight } from "lucide-react";
```

### Variantes

#### Primary (Padrão)
```tsx
<Button>
  Clique Aqui
</Button>
```

#### Secondary
```tsx
<Button variant="secondary">
  Botão Secundário
</Button>
```

#### Outline
```tsx
<Button variant="outline">
  Botão com Borda
</Button>
```

#### Ghost
```tsx
<Button variant="ghost">
  Botão Transparente
</Button>
```

### Tamanhos

```tsx
<Button size="sm">Pequeno</Button>
<Button size="md">Médio</Button>
<Button size="lg">Grande</Button>
```

### Com Ícones

```tsx
// Ícone à esquerda
<Button icon={Sparkles}>
  Com Ícone
</Button>

// Ícone à direita
<Button icon={ArrowRight} iconPosition="right">
  Próximo
</Button>
```

### Estados

```tsx
// Loading
<Button isLoading>
  Carregando...
</Button>

// Disabled
<Button disabled>
  Desabilitado
</Button>

// Full Width
<Button fullWidth>
  Largura Total
</Button>
```

### Exemplo Completo

```tsx
<Button
  variant="primary"
  size="lg"
  icon={Sparkles}
  iconPosition="left"
  onClick={() => console.log("Clicado!")}
  className="shadow-2xl"
>
  Acessar VDA
</Button>
```

---

## 🎴 Card Component

### Importação
```tsx
import Card from "@/components/Card";
import { TrendingUp } from "lucide-react";
```

### Básico

```tsx
<Card
  title="Título do Card"
  description="Descrição do card vai aqui"
/>
```

### Com Ícone

```tsx
<Card
  title="Vendas"
  description="Aumente suas vendas com o método VDA"
  icon={TrendingUp}
/>
```

### Com Gradiente

```tsx
<Card
  title="Premium"
  description="Acesso exclusivo"
  icon={Sparkles}
  gradient="from-purple-500/20 to-pink-500/20"
/>
```

### Clicável

```tsx
<Card
  title="Saiba Mais"
  description="Clique para ver detalhes"
  onClick={() => router.push("/detalhes")}
  gradient="from-blue-500/20 to-cyan-500/20"
/>
```

### Com Conteúdo Personalizado

```tsx
<Card title="Estatísticas" icon={BarChart}>
  <div className="space-y-2">
    <div className="flex justify-between">
      <span>Vendas:</span>
      <span className="font-bold">1.234</span>
    </div>
    <div className="flex justify-between">
      <span>Cliques:</span>
      <span className="font-bold">5.678</span>
    </div>
  </div>
</Card>
```

---

## 🎭 FloatingLogo Component

### Importação
```tsx
import FloatingLogo from "@/components/FloatingLogo";
```

### Uso Básico

```tsx
<FloatingLogo />
```

Este componente é autossuficiente e inclui todas as animações.

---

## 🎯 Header Component

### Importação
```tsx
import Header from "@/components/Header";
```

### Uso Básico

```tsx
<Header />
```

O Header já inclui:
- Menu sticky
- Botão de login
- Menu mobile responsivo
- Animações automáticas

---

## 🦸 Hero Component

### Importação
```tsx
import Hero from "@/components/Hero";
```

### Uso Básico

```tsx
<Hero />
```

Inclui automaticamente:
- FloatingLogo
- Título + descrição
- CTA principal
- Scroll indicator

---

## 🔗 LinkHub Component

### Importação
```tsx
import LinkHub from "@/components/LinkHub";
```

### Uso Básico

```tsx
<LinkHub />
```

### Personalizar Links

Edite `components/LinkHub.tsx`:

```tsx
const links = [
  {
    title: "Meu Novo Link",
    description: "Descrição do link",
    icon: Smartphone, // Qualquer ícone do Lucide
    url: "https://meulink.com",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  // ... mais links
];
```

---

## 👤 Footer Component

### Importação
```tsx
import Footer from "@/components/Footer";
```

### Uso Básico

```tsx
<Footer />
```

### Personalizar Redes Sociais

Edite `components/Footer.tsx`:

```tsx
const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/seu-usuario",
  },
  // ... mais redes
];
```

---

## 📄 Exemplo de Página Completa

```tsx
// app/exemplo/page.tsx
"use client";

import Header from "@/components/Header";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { TrendingUp, Users, DollarSign } from "lucide-react";

export default function ExemploPage() {
  return (
    <main className="min-h-screen bg-vda-black">
      <Header />
      
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-vda-white mb-12 text-center">
          Minha Página Exemplo
        </h1>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card
            title="Vendas"
            description="Total de vendas realizadas"
            icon={DollarSign}
            gradient="from-green-500/20 to-emerald-500/20"
          >
            <p className="text-3xl font-bold text-vda-white">R$ 50.000</p>
          </Card>

          <Card
            title="Clientes"
            description="Clientes ativos"
            icon={Users}
            gradient="from-blue-500/20 to-cyan-500/20"
          >
            <p className="text-3xl font-bold text-vda-white">1.234</p>
          </Card>

          <Card
            title="Conversão"
            description="Taxa de conversão"
            icon={TrendingUp}
            gradient="from-purple-500/20 to-pink-500/20"
          >
            <p className="text-3xl font-bold text-vda-white">37%</p>
          </Card>
        </div>

        {/* Botões */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary" size="lg">
            Botão Principal
          </Button>
          
          <Button variant="secondary">
            Botão Secundário
          </Button>
          
          <Button variant="outline">
            Botão Outline
          </Button>
        </div>
      </section>
    </main>
  );
}
```

---

## 🎨 Exemplos de Animações Customizadas

### Fade In ao Scroll

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Conteúdo que aparece ao rolar
</motion.div>
```

### Stagger Children

```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Hover Scale

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Elemento interativo
</motion.div>
```

---

## 🎯 Dicas de Uso

1. **Componentes Reutilizáveis**: Use Button e Card sempre que possível
2. **Consistência**: Mantenha o mesmo estilo em toda aplicação
3. **Performance**: Use `viewport={{ once: true }}` em animações ao scroll
4. **Acessibilidade**: Sempre adicione aria-labels em ícones sem texto
5. **Responsividade**: Teste em mobile, tablet e desktop

---

## 📚 Recursos Adicionais

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Última atualização:** Janeiro 2026
