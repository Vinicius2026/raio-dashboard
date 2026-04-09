# Material de Apoio - Documentação

Sistema completo de Material de Apoio para a plataforma VDA.

## 📁 Estrutura de Arquivos

```
app/dashboard/material-apoio/
├── page.tsx                 # Página principal com 4 categorias
├── texto/
│   └── page.tsx            # Página de materiais de texto
├── audio/
│   └── page.tsx            # Página de materiais de áudio
├── video/
│   └── page.tsx            # Página de materiais de vídeo
└── imagens/
    └── page.tsx            # Página de materiais de imagens

lib/
└── material-apoio-data.ts   # Dados centralizados dos materiais
```

## 🎨 Design

- **Dark Theme**: Segue o padrão visual do site
- **UI/UX Moderno**: Cards com hover effects e transições suaves
- **Responsivo**: Layout adaptado para mobile, tablet e desktop
- **Acessível**: Botões e navegação intuitivos

## 🔗 Navegação

### Acesso ao Material de Apoio:

1. **Dashboard** → Seção "Material de Apoio"
2. Clique em uma das 4 categorias:
   - 📄 **Texto** (azul) - Documentos e PDFs
   - 🎤 **Áudio** (roxo) - Podcasts e gravações
   - 🎥 **Vídeo** (rosa) - Tutoriais e webinars
   - 🖼️ **Imagens** (ciano) - Banners e criativos

### URLs:

- Principal: `/dashboard/material-apoio`
- Texto: `/dashboard/material-apoio/texto`
- Áudio: `/dashboard/material-apoio/audio`
- Vídeo: `/dashboard/material-apoio/video`
- Imagens: `/dashboard/material-apoio/imagens`

## ➕ Como Adicionar Novos Materiais

Edite o arquivo: `lib/material-apoio-data.ts`

### Exemplo - Adicionar um novo documento:

```typescript
export const MATERIAL_DATA: MaterialCategory = {
  textos: [
    // ... materiais existentes
    {
      id: 4, // Incrementar o ID
      name: "Novo Material de Texto",
      description: "Descrição do material",
      downloadLink: "https://drive.google.com/file/d/..."
    }
  ],
  // ...
}
```

### Exemplo - Adicionar um novo áudio:

```typescript
audios: [
  // ... materiais existentes
  {
    id: 4,
    name: "Novo Podcast",
    description: "Episódio sobre...",
    downloadLink: "https://drive.google.com/file/d/..."
  }
]
```

## 📥 Links de Download

Os links de download devem apontar para:
- **Google Drive** (recomendado)
- **Dropbox**
- **OneDrive**
- Ou qualquer serviço de armazenamento em nuvem

### Como obter o link do Google Drive:

1. Faça upload do arquivo no Google Drive
2. Clique com botão direito → "Compartilhar"
3. Altere para "Qualquer pessoa com o link"
4. Copie o link e cole no campo `downloadLink`

## ⚖️ Aviso Legal

Todas as páginas incluem o aviso de direitos autorais:

> "Todo conteúdo é de direito autoral da VDA e autorizamos os alunos a utilização para vendas. Não autorizamos a venda desse material."

## 🎯 Recursos

- ✅ Layout padronizado em todas as páginas
- ✅ Dados centralizados para fácil manutenção
- ✅ Sistema de cores por categoria
- ✅ Botões de download funcionais
- ✅ Empty states para quando não houver materiais
- ✅ Navegação breadcrumb com botão voltar
- ✅ Hover effects e animações suaves
- ✅ Responsivo para todos dispositivos

## 🔮 Futuras Melhorias

- [ ] Integração com banco de dados
- [ ] Sistema de upload de arquivos
- [ ] Controle de acesso por produto
- [ ] Analytics de downloads
- [ ] Preview de arquivos antes do download
- [ ] Sistema de busca e filtros
- [ ] Categorias personalizadas
- [ ] Versionamento de materiais

## 📝 Notas

- Os dados atuais são **mockados** (exemplos)
- Substitua os links `"#"` por links reais do Google Drive
- Mantenha a estrutura de dados ao adicionar novos materiais
- IDs devem ser únicos dentro de cada categoria
