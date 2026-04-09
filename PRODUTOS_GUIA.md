# 📦 Guia de Produtos - VDA Dashboard

## ✅ Produto 1 (WESHOT Noite) - IMPLEMENTADO!

### **O Que Foi Criado:**

1. ✅ **Slider de Imagens** - Navegação entre 3 imagens
2. ✅ **Descrição Completa** - Benefícios e informações
3. ✅ **Regras Expandíveis** - 7 regras com accordion
4. ✅ **Informações do Programa** - Cookie, material, etc.
5. ✅ **Link de Afiliação** - Botão "AFILIAR-SE" funcional
6. ✅ **Taxa de Conversão** - 67% real
7. ✅ **Imagens na Galeria** - Mostra em "Produtos" e "Meus Produtos"

---

## 🖼️ **Estrutura de Imagens**

### **Localização:**
```
public/produtos/
├── p1a.png ← Imagem 1 do Produto 1
├── p1b.png ← Imagem 2 do Produto 1
├── p1c.png ← Imagem 3 do Produto 1
├── p2a.png ← Imagem 1 do Produto 2 (futuro)
├── p2b.png ← Imagem 2 do Produto 2 (futuro)
└── ...
```

### **Nomenclatura:**
- `p{número}{letra}.png`
- Exemplo: `p1a.png`, `p1b.png`, `p1c.png`
- Produto 1 = p1x
- Produto 2 = p2x
- Produto 15 = p15x

### **Formato Recomendado:**
- **Tipo:** PNG ou JPG
- **Tamanho:** Max 1MB por imagem
- **Dimensões:** 1200x900px ou similar (ratio 4:3)
- **Background:** Preferencialmente transparente ou branco

---

## 🎯 **Como Adicionar Um Novo Produto**

### **Passo 1: Adicionar Imagens**
```
1. Coloque as imagens em: public/produtos/
2. Nomeie: p2a.png, p2b.png, p2c.png (para produto 2)
```

### **Passo 2: Editar products-data.ts**

Abra: `lib/products-data.ts`

Encontre a seção do produto (ex: '2'):

```typescript
'2': {
  id: '2',
  name: 'Nome do Produto 2',  // ← Mudar aqui
  images: [
    '/produtos/p2a.png',  // ← Adicionar imagens
    '/produtos/p2b.png',
    '/produtos/p2c.png'
  ],
  description: `Descrição completa do produto...

Benefícios:
• Benefício 1
• Benefício 2
• Benefício 3`,  // ← Adicionar descrição
  rules: [
    {
      title: '1) Regra 1',
      content: 'Conteúdo da regra...'
    },
    // ... mais regras
  ],  // ← Adicionar regras
  lastClick: null,  // ou data
  supportMaterial: 'Link do material',  // ou null
  autoAffiliation: true,  // true ou false
  cookie: '30 dias',  // duração do cookie
  otherProducts: true,  // tem outros produtos?
  affiliationLink: 'https://link-afiliacao.com',  // ← Link real
  conversion: 72,  // ← Taxa real
  status: 'ATIVO'
}
```

### **Passo 3: Salvar e Testar**
```
1. Salve o arquivo
2. Recarregue a dashboard
3. Veja o produto na galeria
4. Clique em "ABRIR"
5. Navegue pelo slider
6. Clique em "AFILIAR-SE"
```

---

## 📝 **Template para Novo Produto**

```typescript
'X': {  // ← Trocar X pelo número do produto
  id: 'X',
  name: 'Nome do Produto X',
  images: [
    '/produtos/pXa.png',
    '/produtos/pXb.png',
    '/produtos/pXc.png'
  ],
  description: `Descrição completa aqui...

Benefícios:
• Benefício 1
• Benefício 2
• Benefício 3`,
  rules: [
    {
      title: '1) Conteúdo original',
      content: 'Todo conteúdo deve ser original...'
    },
    {
      title: '2) Foque nos benefícios',
      content: 'Mantenha a comunicação focada...'
    }
  ],
  lastClick: null,
  supportMaterial: null,
  autoAffiliation: true,
  cookie: '30 dias',
  otherProducts: true,
  affiliationLink: 'https://...',
  conversion: 65,
  status: 'ATIVO'
}
```

---

## 🎨 **Recursos do Slider**

### **Navegação:**
- ✅ Setas esquerda/direita
- ✅ Indicadores de página (bolinhas)
- ✅ Clique nos indicadores
- ✅ Navegação por teclado (futuro)

### **Visual:**
- ✅ Transição suave
- ✅ Background escuro
- ✅ Imagens em `object-contain` (não distorcem)
- ✅ Badges flutuantes (número e status)
- ✅ Hover effects

---

## 📊 **Seções da Página do Produto**

### **1. Header**
- Botão "Voltar" → Produtos
- Nome do produto
- Subtítulo

### **2. Slider de Imagens**
- Imagens grandes (aspect 21:9)
- Navegação lateral
- Indicadores embaixo
- Badges de número e status

### **3. Informações do Programa**
4 cards com:
- Último clique
- Material de apoio
- Cookie
- Outros produtos

### **4. Descrição do Produto**
- Texto formatado
- Benefícios em lista
- Whitespace preservado

### **5. Regras (Accordion)**
- 7 regras expandíveis
- Clique para abrir/fechar
- Ícone rotativo
- Alerta no final

### **6. Footer**
- Taxa de conversão (termômetro)
- Botão START (adicionar a "Meus Produtos")
- Botão AFILIAR-SE (link externo)

---

## 🔗 **Links de Afiliação**

### **Formato:**
```typescript
affiliationLink: 'https://dash.b4you.com.br/vitrine/produto/nome-produto/uuid'
```

### **Comportamento:**
- Abre em nova aba
- `target="_blank"`
- `rel="noopener noreferrer"`
- Ícone de link externo

### **Visual:**
```
[AFILIAR-SE 🔗]
```
- Gradiente azul→ciano
- Hover com scale
- Shadow para profundidade

---

## 🎯 **Status do Produto**

### **Valores Possíveis:**
- `'ATIVO'` → Verde, disponível
- `'INATIVO'` → Cinza, não disponível
- `'PAUSADO'` → Amarelo, temporário

### **Onde Aparece:**
- Badge no slider
- Card de informações
- Galeria de produtos

---

## 📈 **Taxa de Conversão**

### **Visual:**
- Barra de progresso horizontal
- Gradiente azul→ciano
- Percentual grande ao lado
- Animação suave

### **Uso:**
```typescript
conversion: 67  // 0-100
```

---

## 🚀 **Exemplo Completo - Produto 2**

```typescript
'2': {
  id: '2',
  name: 'WESHOT Dia',
  images: [
    '/produtos/p2a.png',
    '/produtos/p2b.png',
    '/produtos/p2c.png'
  ],
  description: `WESHOT Dia é sua dose de energia natural para o dia.

Formulado para aumentar disposição e foco sem causar agitação.

Benefícios:
• Aumenta energia natural
• Melhora foco e concentração
• Aumenta produtividade
• Não causa dependência
• Sabor agradável`,
  rules: [
    {
      title: '1) Conteúdo original',
      content: 'Todo conteúdo deve ser original, criado por você. Não copie conteúdos de outros creators.'
    },
    {
      title: '2) Foque nos benefícios permitidos',
      content: `Mantenha a comunicação focada nos benefícios do produto, como:
• Aumenta energia natural
• Melhora foco
• Aumenta produtividade
• Ajuda no desempenho físico`
    },
    {
      title: '3) Evite promessas de milagres',
      content: 'Não divulgue que o produto faz milagres. Não prometa resultados extremos.'
    },
    {
      title: '4) Não afirme cura',
      content: 'É proibido dizer que o produto cura doenças ou condições.'
    },
    {
      title: '5) Não fixe prazos irrealistas',
      content: 'Não prometa resultado em tempo garantido.'
    },
    {
      title: '6) Frases proibidas',
      content: `É proibido usar mensagens como:
• "Com WESHOT, você terá energia infinita."
• "Tome WESHOT e nunca mais se canse."`
    },
    {
      title: '7) Proibições adicionais',
      content: `É proibido:
• Escrever seu link de afiliado no conteúdo de outros creators
• Criar perfis falsos em nome da marca`
    }
  ],
  lastClick: '26/01/2026 15:30',
  supportMaterial: 'https://drive.google.com/material-weshot-dia',
  autoAffiliation: true,
  cookie: '30 dias',
  otherProducts: true,
  affiliationLink: 'https://dash.b4you.com.br/vitrine/produto/weshot-dia/uuid-aqui',
  conversion: 72,
  status: 'ATIVO'
}
```

---

## 🎨 **Galeria de Produtos**

### **Grid:**
- 3 colunas (desktop)
- 2 colunas (tablet)
- 1 coluna (mobile)

### **Card do Produto:**
- Imagem: aspect 4:3
- Badge número: #X
- Badge status: ATIVO/INICIADO
- Termômetro de conversão
- Botão "ABRIR"

### **Comportamento:**
- Hover: borda brilha
- Click: vai para página individual
- Badge "INICIADO" se estiver selecionado

---

## 🏠 **Meus Produtos (HOME)**

### **Grid:**
- 3 colunas (desktop)
- 2 colunas (tablet)
- 1 coluna (mobile)

### **Card Compacto:**
- Imagem: aspect 16:9 (menor)
- Badge número: #X (menor)
- Conversão compacta
- Badge "ATIVO"
- Click: vai para página

### **Se Vazio:**
```
┌─────────────────────────────┐
│        📦                   │
│    Vitrine Vazia            │
│  Selecione produtos...      │
└─────────────────────────────┘
```

---

## ✅ **Checklist de Novo Produto**

### **Preparação:**
- [ ] Escolher número do produto (1-18)
- [ ] Preparar 2-3 imagens
- [ ] Escrever descrição
- [ ] Definir regras
- [ ] Obter link de afiliação

### **Implementação:**
- [ ] Adicionar imagens em `public/produtos/`
- [ ] Editar `lib/products-data.ts`
- [ ] Preencher todos os campos
- [ ] Salvar arquivo

### **Teste:**
- [ ] Recarregar dashboard
- [ ] Ver na galeria "Produtos"
- [ ] Clicar em "ABRIR"
- [ ] Testar slider
- [ ] Expandir regras
- [ ] Clicar em "START"
- [ ] Ver em "Meus Produtos"
- [ ] Clicar em "AFILIAR-SE"

---

## 🎯 **Dicas de UX**

### **Descrição:**
- Use quebras de linha para separar seções
- Liste benefícios com bullets (•)
- Seja claro e direto
- Máximo 300 palavras

### **Regras:**
- Mantenha consistência com outras
- Use exemplos quando necessário
- Seja específico
- Divida em seções

### **Imagens:**
- Use boa qualidade
- Background limpo
- Produto centralizado
- Iluminação adequada

---

## 🚀 **Próximos Passos**

### **Para adicionar Produto 2:**
1. Coloque `p2a.png`, `p2b.png`, `p2c.png` em `public/produtos/`
2. Edite a chave `'2'` em `lib/products-data.ts`
3. Preencha todos os dados
4. Salve e teste!

### **Para adicionar Produto 15:**
1. Coloque `p15a.png`, `p15b.png`, `p15c.png`
2. Edite a chave `'15'`
3. Preencha
4. Teste!

**É só isso!** 🎉

---

**Arquivo de dados:** `lib/products-data.ts`  
**Pasta de imagens:** `public/produtos/`  
**Tempo por produto:** 5-10 minutos  
**Dificuldade:** ⭐⭐ Fácil
