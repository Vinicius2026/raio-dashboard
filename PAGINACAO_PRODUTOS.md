# 🔢 Sistema de Paginação e Numeração - Produtos VDA

## ✅ Funcionalidades Implementadas

### 1. **Paginação Funcional**

A paginação agora funciona de verdade! Não é mais apenas visual.

#### Estados Adicionados:
```typescript
const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 6;
const totalProducts = 18; // Total mockado
const totalPages = Math.ceil(totalProducts / productsPerPage);
```

#### Como Funciona:
- **Produtos por página**: 6 (grid 3x2)
- **Total de produtos**: 18 (mockados)
- **Total de páginas**: 3 páginas
- **Cálculo dinâmico**: Baseado nos produtos disponíveis

---

### 2. **Numeração de Produtos**

Cada produto agora tem um **número único e visível** para fácil identificação.

#### Badge com Número (Canto superior esquerdo):
```jsx
<div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
  <span className="text-white font-bold text-lg">#{productNumber}</span>
</div>
```

**Características:**
- ✅ Número grande e legível
- ✅ Background glassmorphism
- ✅ Borda sutil
- ✅ Posicionamento fixo (top-left)

#### Numeração por Página:
- **Página 1**: Produtos #1 - #6
- **Página 2**: Produtos #7 - #12
- **Página 3**: Produtos #13 - #18

---

### 3. **Contador de Produtos**

Header agora mostra informações úteis:

```jsx
<p className="text-white/50 text-sm">
  Mostrando {start} - {end} de {total} produtos
</p>
<div className="text-white/40 text-sm">
  Página {currentPage} de {totalPages}
</div>
```

**Exemplos:**
- Página 1: "Mostrando 1 - 6 de 18 produtos"
- Página 2: "Mostrando 7 - 12 de 18 produtos"
- Página 3: "Mostrando 13 - 18 de 18 produtos"

---

### 4. **Controles de Navegação**

#### Botão Anterior (←):
```typescript
onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
disabled={currentPage === 1}
```
- Desabilitado na página 1
- Volta para página anterior

#### Botão Próximo (→):
```typescript
onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
disabled={currentPage === totalPages}
```
- Desabilitado na última página
- Avança para próxima página

#### Botões Numéricos:
```typescript
{Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
  <button onClick={() => setCurrentPage(pageNum)}>
    {pageNum}
  </button>
))}
```
- Quantidade dinâmica baseada em `totalPages`
- Página ativa destacada (branco)
- Outras páginas semitransparentes

---

### 5. **Reset Automático**

Ao trocar de aba, a paginação volta para página 1:

```typescript
useEffect(() => {
  setCurrentPage(1);
}, [activeTab]);
```

**Motivo:** Evita confusão ao voltar para "Produtos" depois de ver outra aba.

---

## 🎨 Identificação Visual dos Produtos

### Badge com Número:

```
┌─────────────────────────┐
│ #1         ATIVO        │
│                         │
│    [Ícone Package]      │
│     Produto 1           │
│                         │
└─────────────────────────┘
  CONVERSÃO: [██░] 67%  [ABRIR]
```

### Hierarquia de Identificação:

1. **Badge #N** (top-left) - Identificação primária
2. **"Produto N"** (centro) - Descrição textual
3. **"ATIVO"** (top-right) - Status
4. **Console.log** (ao clicar ABRIR) - Confirmação

---

## 📊 Lógica de Cálculo

### Produtos por Página:

```typescript
const startIndex = (currentPage - 1) * productsPerPage;
const endIndex = startIndex + productsPerPage;

// Exemplo Página 2:
// startIndex = (2 - 1) * 6 = 6
// endIndex = 6 + 6 = 12
// Produtos: #7, #8, #9, #10, #11, #12
```

### Array.from para Gerar Produtos:

```typescript
Array.from({ length: productsPerPage }, (_, index) => {
  const productNumber = (currentPage - 1) * productsPerPage + index + 1;
  if (productNumber > totalProducts) return null;
  return productNumber;
}).filter(Boolean)
```

**Explicação:**
1. Cria array com 6 posições
2. Calcula número do produto para cada posição
3. Retorna `null` se passar do total
4. Filtra valores nulos

---

## 🎯 Como Adicionar Imagens e Informações

### Exemplo de uso dos números:

#### Para adicionar imagem no Produto #5:
```typescript
const productData = {
  5: {
    image: '/images/produto-5.jpg',
    name: 'Produto Premium VDA',
    conversion: 78,
    status: 'ATIVO'
  }
}
```

#### Para modificar Produto #12:
```typescript
if (productNumber === 12) {
  return (
    <ProductCard
      image={productData[12].image}
      name={productData[12].name}
      // ...
    />
  );
}
```

---

## 🔄 Estados da Paginação

### Estado Inicial:
```typescript
currentPage: 1
totalPages: 3
productsPerPage: 6
totalProducts: 18
```

### Ao Clicar em "Próximo":
```typescript
currentPage: 1 → 2
// Mostra produtos #7-#12
```

### Ao Clicar no número "3":
```typescript
currentPage: 2 → 3
// Mostra produtos #13-#18
```

### Ao Clicar em "Anterior":
```typescript
currentPage: 3 → 2
// Mostra produtos #7-#12
```

---

## 🎨 Estilos dos Botões

### Botão Ativo (Página atual):
```css
bg-white text-black
```

### Botões Inativos:
```css
bg-white/5 hover:bg-white/10
text-white/60 hover:text-white
```

### Botões Desabilitados:
```css
disabled:opacity-30
disabled:cursor-not-allowed
```

---

## 📱 Responsividade

A paginação funciona em todos os dispositivos:

- **Desktop**: Todos os botões visíveis
- **Tablet**: Todos os botões visíveis
- **Mobile**: Pode precisar scroll horizontal (futuro: dots para muitas páginas)

---

## 🚀 Melhorias Futuras

### 1. Dots para Muitas Páginas:
```jsx
// Se totalPages > 7, mostrar:
[1] [2] [3] [...] [8] [9] [10]
```

### 2. Input para Ir Direto:
```jsx
<input 
  type="number" 
  placeholder="Ir para..."
  onChange={(e) => setCurrentPage(Number(e.target.value))}
/>
```

### 3. Produtos por Página Configurável:
```jsx
<select onChange={(e) => setProductsPerPage(Number(e.target.value))}>
  <option value="6">6 por página</option>
  <option value="12">12 por página</option>
  <option value="18">18 por página</option>
</select>
```

---

## 📝 Checklist de Funcionalidades

### Implementado:
- [x] Paginação funcional
- [x] Numeração de produtos (#1-#18)
- [x] Badge visual com número
- [x] Contador de produtos
- [x] Botões anterior/próximo
- [x] Botões numéricos dinâmicos
- [x] Desabilitar botões nas extremidades
- [x] Reset ao trocar de aba
- [x] Destaque da página ativa
- [x] Console.log com número do produto
- [x] Cálculo dinâmico de páginas

### Próximos Passos:
- [ ] Integração com API real
- [ ] Adicionar imagens reais
- [ ] Sistema de busca/filtro
- [ ] Ordenação por conversão
- [ ] Favoritar produtos

---

## 🎯 Exemplo de Console.log

Ao clicar em "ABRIR" em qualquer produto:

```javascript
// Produto #1
console.log("Abrir produto #1")

// Produto #8
console.log("Abrir produto #8")

// Produto #15
console.log("Abrir produto #15")
```

Facilita debugar e identificar qual produto foi clicado!

---

## ✅ Resultado Final

### Página 1:
```
Mostrando 1 - 6 de 18 produtos    |    Página 1 de 3

┌────────┐  ┌────────┐  ┌────────┐
│ #1     │  │ #2     │  │ #3     │
└────────┘  └────────┘  └────────┘

┌────────┐  ┌────────┐  ┌────────┐
│ #4     │  │ #5     │  │ #6     │
└────────┘  └────────┘  └────────┘

    ← [1] [2] [3] →
```

### Página 2:
```
Mostrando 7 - 12 de 18 produtos   |    Página 2 de 3

┌────────┐  ┌────────┐  ┌────────┐
│ #7     │  │ #8     │  │ #9     │
└────────┘  └────────┘  └────────┘

┌────────┐  ┌────────┐  ┌────────┐
│ #10    │  │ #11    │  │ #12    │
└────────┘  └────────┘  └────────┘

    ← [1] [2] [3] →
```

---

**Criado em**: 27/01/2026  
**Versão**: 2.0.0  
**Status**: ✅ Totalmente Funcional  
**Total de Produtos**: 18 (3 páginas)
