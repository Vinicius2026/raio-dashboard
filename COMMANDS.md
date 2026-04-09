# Comandos Úteis - VDA Landing Page

## 🚀 Desenvolvimento

### Iniciar servidor de desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:3000

### Build para produção
```bash
npm run build
```

### Iniciar servidor de produção
```bash
npm run start
```

### Executar linter
```bash
npm run lint
```

---

## 📦 Gerenciamento de Dependências

### Instalar dependências
```bash
npm install
```

### Adicionar nova dependência
```bash
npm install nome-do-pacote
```

### Atualizar dependências
```bash
npm update
```

### Verificar dependências desatualizadas
```bash
npm outdated
```

---

## 🧹 Limpeza

### Limpar cache do Next.js
```bash
rm -rf .next
# Windows PowerShell:
Remove-Item -Recurse -Force .next
```

### Limpar node_modules e reinstalar
```bash
rm -rf node_modules package-lock.json
npm install
# Windows PowerShell:
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

---

## 🔍 Debug

### Verificar build de produção localmente
```bash
npm run build
npm run start
```

### Ver informações do Next.js
```bash
npx next info
```

---

## 🎨 Tailwind CSS

### Gerar arquivo de configuração completo
```bash
npx tailwindcss init --full
```

### Ver classes disponíveis
Acesse: https://tailwindcss.com/docs

---

## 📊 Análise de Bundle

### Analisar tamanho do bundle (adicionar dependência primeiro)
```bash
npm install @next/bundle-analyzer
```

Adicione no `next.config.js`:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

Execute:
```bash
ANALYZE=true npm run build
# Windows PowerShell:
$env:ANALYZE="true"; npm run build
```

---

## 🚀 Deploy

### Vercel (Mais fácil)
```bash
npm install -g vercel
vercel login
vercel
```

### Build estático (para outros hosts)
```bash
npm run build
# O resultado estará em .next/
```

---

## 🔐 Variáveis de Ambiente

### Desenvolvimento
Edite `.env.local`

### Produção (Vercel)
Configure no dashboard do Vercel em Settings > Environment Variables

---

## 📝 Git

### Inicializar repositório
```bash
git init
git add .
git commit -m "Initial commit: VDA Landing Page"
```

### Conectar ao GitHub
```bash
git remote add origin https://github.com/seu-usuario/vda-landing.git
git branch -M main
git push -u origin main
```

---

## 🎯 Testes Rápidos

### Verificar se o projeto está funcionando
```bash
npm run dev
```
Abra http://localhost:3000 e verifique:
- [ ] Header sticky funcionando
- [ ] Logo VDA flutuando
- [ ] Botões do hub clicáveis
- [ ] Página de login acessível
- [ ] Dashboard placeholder

---

## 💡 Dicas

- Use `npm run dev` para desenvolvimento
- Sempre teste com `npm run build` antes de fazer deploy
- Mantenha as dependências atualizadas
- Use Git para versionar o código

---

**Precisa de mais comandos?** Consulte:
- [Documentação NPM](https://docs.npmjs.com/)
- [Documentação Next.js](https://nextjs.org/docs)
