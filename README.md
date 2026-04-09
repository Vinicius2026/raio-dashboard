# VDA - Venda Direta Automática 🚀

Landing Page Premium desenvolvida em Next.js com design dark mode minimalista e de alta autoridade.

## 🎨 Stack Tecnológica

- **Framework:** Next.js 14 (App Router)
- **Estilização:** Tailwind CSS
- **Animações:** Framer Motion
- **Ícones:** Lucide React
- **Autenticação/DB:** Supabase (integração futura)
- **Linguagem:** TypeScript

## 🎯 Características

- ✨ Design Dark Mode Minimalista
- 🎭 Animações fluidas e profissionais
- 📱 100% Responsivo (Mobile First)
- ⚡ Performance otimizada
- 🔒 Rotas de autenticação preparadas
- 🎨 Glassmorphism e efeitos modernos

## 🚀 Como Iniciar

1. **Instale as dependências:**
```bash
npm install
```

2. **Configure as variáveis de ambiente:**
   - Renomeie `.env.local` e adicione suas credenciais do Supabase (quando disponíveis)

3. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Acesse no navegador:**
   - Abra [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
vda-landing-page/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página inicial
│   ├── login/
│   │   └── page.tsx        # Página de login
│   ├── dashboard/
│   │   └── page.tsx        # Dashboard placeholder
│   └── globals.css         # Estilos globais
├── components/
│   ├── Header.tsx          # Cabeçalho sticky
│   ├── Hero.tsx            # Seção hero
│   ├── FloatingLogo.tsx    # Logo animado
│   ├── LinkHub.tsx         # Hub de links
│   └── Footer.tsx          # Rodapé com bio
└── ...
```

## 🎨 Conceito Visual

- **Cores:**
  - Fundo: #000000 (Preto absoluto)
  - Acentos: Cinza Chumbo e Branco Puro
  - Efeitos: Glassmorphism com bordas gradientes

- **Tipografia:**
  - Fonte: Inter (Google Fonts)
  - Estilo: Clean e moderno

- **Animações:**
  - Logo flutuante (float infinito)
  - Efeitos de hover sofisticados
  - Transições suaves entre elementos

## 🔗 Rotas Disponíveis

- `/` - Landing page principal
- `/login` - Página de autenticação
- `/dashboard` - Dashboard (placeholder)

## 📝 Próximos Passos

- [ ] Integrar Supabase para autenticação real
- [ ] Adicionar foto real do Thiago Lima
- [ ] Conectar links aos destinos reais
- [ ] Implementar analytics
- [ ] Adicionar SEO avançado
- [ ] Configurar OG images

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Gera build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa linter
```

## 📱 Seções da Landing Page

1. **Header:** Menu sticky com backdrop blur
2. **Hero:** Logo animado + CTA principal
3. **Link Hub:** Cards de acesso aos recursos
4. **Footer:** Bio do especialista + redes sociais

## 🎯 Filosofia de Design

Este projeto foi desenvolvido seguindo os princípios de:
- Minimalismo funcional
- Alta autoridade visual
- Experiência mobile-first
- Performance e acessibilidade

---

**Desenvolvido com ❤️ para o método VDA**
