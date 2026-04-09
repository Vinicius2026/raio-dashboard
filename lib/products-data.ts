// ========================================
// DADOS DOS PRODUTOS - VDA
// Centralizados para fácil gerenciamento
// ========================================

export interface ProductRule {
  title: string
  content: string
}

export interface Product {
  id: string
  name: string
  images: string[]
  description: string
  rules: ProductRule[]
  lastClick: string | null
  supportMaterial: string | null
  autoAffiliation: boolean
  cookie: string
  otherProducts: boolean
  affiliationLink: string
  conversion: number
  status: 'ATIVO' | 'INATIVO' | 'PAUSADO'
}

export const PRODUCTS: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'WESHOT Noite',
    images: [
      '/produtos/p1a.png',
      '/produtos/p1b.png',
      '/produtos/p1c.png'
    ],
    description: `Este produto foi desenvolvido para melhorar a qualidade do seu sono e recuperação muscular.

WESHOT Noite é a sua dose diária de saúde, formulado com ingredientes naturais que auxiliam no relaxamento e proporcionam um sono mais reparador.

Benefícios:
• Melhora a recuperação muscular
• Proporciona sono mais reparador
• Fortalece a imunidade
• Ajuda a regular o relógio biológico
• Melhora o metabolismo`,
    rules: [
      {
        title: '1) Conteúdo original',
        content: 'Todo conteúdo deve ser original, criado por você. Não copie conteúdos de outros creators.'
      },
      {
        title: '2) Foque nos benefícios permitidos',
        content: `Mantenha a comunicação focada nos benefícios do produto, como:
• Melhora a recuperação muscular
• Sono mais reparador
• Melhora a imunidade
• Ajuda a regular o relógio biológico
• Ajuda a melhorar o sono
• Ajuda a melhorar o metabolismo`
      },
      {
        title: '3) Evite promessas de milagres',
        content: 'Não divulgue que o produto faz milagres. Não prometa resultados extremos (ex.: "emagrece X quilos em tantos dias").'
      },
      {
        title: '4) Não afirme cura',
        content: 'É proibido dizer que o produto cura doenças ou condições.'
      },
      {
        title: '5) Não fixe prazos irrealistas',
        content: 'Não prometa resultado em tempo garantido (ex.: "em 7 dias você…").'
      },
      {
        title: '6) Frases proibidas (exemplos)',
        content: `É proibido usar mensagens como:
• "Com WESHOT, você nunca mais terá problemas de saúde."
• "Tome WESHOT e emagreça sem esforço."`
      },
      {
        title: '7) Proibições adicionais',
        content: `É proibido:
• Escrever seu link de afiliado no conteúdo de outros creators ou nos perfis oficiais da Weshot.
• Criar perfis no TikTok ou Instagram com os termos:
  - "Weshot Dia" / "Weshot"
  - "Weshot + Oficial" (ex.: "WeshotOficial", "Weshot Oficial")`
      }
    ],
    lastClick: null,
    supportMaterial: null,
    autoAffiliation: true,
    cookie: '30 dias',
    otherProducts: true,
    affiliationLink: 'https://dash.b4you.com.br/vitrine/produto/weshot-noite/f235b9bd-5a37-4bb1-b455-8845fdbecfe9',
    conversion: 67,
    status: 'ATIVO'
  },
  '2': {
    id: '2',
    name: 'WESHOT Dia',
    images: [
      '/produtos/p2a.png',
      '/produtos/p2b.png',
      '/produtos/p2c.png'
    ],
    description: `Este produto não possui descrição cadastrada no momento.`,
    rules: [
      {
        title: '1) Conteúdo original',
        content: 'Todo conteúdo deve ser original, criado por você.\n\nNão copie conteúdos de outros creators.'
      },
      {
        title: '2) Foque nos benefícios permitidos',
        content: `Mantenha a comunicação focada nos benefícios do produto, como:

• Ajuda a reduzir a inflamação do corpo
• Ação antioxidante
• Melhora a imunidade
• Ajuda a melhorar o intestino
• Mais disposição
• Ajuda a diminuir inchaço/estufamento`
      },
      {
        title: '3) Evite promessas de milagres',
        content: 'Não divulgue que o produto faz milagres.\n\nNão prometa resultados extremos (ex.: "emagrece X quilos em tantos dias").'
      },
      {
        title: '4) Não afirme cura',
        content: 'É proibido dizer que o produto cura doenças ou condições.'
      },
      {
        title: '5) Não fixe prazos irrealistas',
        content: 'Não prometa resultado em tempo garantido (ex.: "em 7 dias você…").'
      },
      {
        title: '6) Frases proibidas (exemplos)',
        content: `É proibido usar mensagens como:

• "Com WESHOT, você nunca mais terá problemas de saúde."
• "Tome WESHOT e emagreça sem esforço."`
      },
      {
        title: '7) Proibições adicionais',
        content: `É proibido:

• Escrever seu link de afiliado no conteúdo de outros creators ou nos perfis oficiais da Weshot.
• Criar perfis no TikTok ou Instagram com os termos:
  - "Weshot Dia" / "Weshot"
  - "Weshot + Oficial" (ex.: "WeshotOficial", "Weshot Oficial")`
      }
    ],
    lastClick: null,
    supportMaterial: null,
    autoAffiliation: true,
    cookie: '30 dias',
    otherProducts: true,
    affiliationLink: 'https://dash.b4you.com.br/vitrine/produto/weshot-dia/4343f53e-db51-47cd-a7ce-73ba601e7d11',
    conversion: 72,
    status: 'ATIVO'
  },
  '3': {
    id: '3',
    name: 'Sérum Miraculous Íntimo',
    images: [
      '/produtos/p3a.png',
      '/produtos/p3b.png',
      '/produtos/p3c.png',
      '/produtos/p3d.jpg'
    ],
    description: `Cuidado avançado para a pele íntima, áreas de escurecimento, atrito e ressecamento. Uniformiza visivelmente o tom de áreas escurecidas, mantendo o equilíbrio íntimo, ação antiressecamento e equilíbrio naturalmente odores. + de 7 benefícios

Cientificamente elaborado com lipídios nobres de Óleo de Rosa-Mosqueta Selvagem, Amêndoa-Doce e Coconut Fruit Extract, e enriquecido com Vitamina E e Squalane vegetal, o Sérum Miraculous Íntimo foi desenvolvido para oferecer um cuidado avançado para a pele íntima e para áreas que sofrem atrito, escurecimento ou ressecamento.`,
    rules: [
      {
        title: '1) Conteúdo original',
        content: 'Todo conteúdo deve ser original e criado por você.\n\nNão copie conteúdos de outros creators.'
      },
      {
        title: '2) Foque nos benefícios permitidos',
        content: `Mantenha a comunicação focada nos benefícios do Sérum Miraculous Íntimo:

• Corrige áreas escurecidas
• Equilibra odores naturalmente
• Hidrata profundamente
• Nutre a pele íntima
• Reduz ressecamento
• Melhora a tonicidade
• Melhora a transpiração`
      },
      {
        title: '3) Evite promessas exageradas',
        content: 'Não faça promessas de resultados exagerados ou imediatos.\n\nEvite afirmações como "resultados instantâneos" ou "transformação em poucos dias".'
      },
      {
        title: '4) Não afirme cura ou eliminação',
        content: 'É proibido dizer que o produto cura ou elimina condições de saúde.\n\nO produto oferece cuidados e benefícios, não cura.'
      },
      {
        title: '5) Não estabeleça prazos fixos',
        content: 'Não prometa resultados em tempo garantido.\n\nEvite frases como "em 7 dias você verá resultados" ou "em 1 semana".'
      },
      {
        title: '6) Linguagem adequada e respeitosa',
        content: `O uso é externo. Comunique-se com leveza e destaque a segurança:

• Evite termos técnicos excessivos
• Não use linguagem sexualizada
• Fale com naturalidade sobre o tema
• Não trate o assunto com constrangimento
• Destaque que é um produto de cuidado íntimo seguro`
      },
      {
        title: '7) Proibições adicionais',
        content: `É estritamente proibido:

• Publicar seu link de afiliado nos perfis oficiais da Eva Skin ou de outros afiliados
• Usar vídeos, imagens ou trechos oficiais da marca em seu conteúdo
• Usar conteúdo criado por outros Creators
• Criar perfis no TikTok ou Instagram com os nomes:
  - "Eva Skin"
  - "Eva Skin Oficial"
  - Ou qualquer variação com o nome da marca

⚠️ O descumprimento de qualquer regra resultará na remoção imediata da afiliação.`
      }
    ],
    lastClick: null,
    supportMaterial: null,
    autoAffiliation: true,
    cookie: '30 dias',
    otherProducts: false,
    affiliationLink: 'https://dash.b4you.com.br/vitrine/produto/loja-eva-skin/18eb6388-864b-46fa-bbe4-8fdf85482f69',
    conversion: 78,
    status: 'ATIVO'
  },
  '4': {
    id: '4',
    name: 'Sonotonina em Gummie',
    images: [
      '/produtos/p4a.jpg',
      '/produtos/p4b.jpg'
    ],
    description: `A Sonotonina em goma foi adaptada para conter exclusivamente melatonina, mantendo o foco em um ingrediente principal que auxilia na regulação do ciclo do sono.

Benefícios da Melatonina:

• Regulação do Ciclo Circadiano: A melatonina ajuda a sincronizar o relógio biológico, facilitando o sono em horários corretos e combatendo a insônia.

• Melhora da Qualidade do Sono: Estudos indicam que a melatonina pode reduzir o tempo necessário para adormecer e aumentar a profundidade do sono.

• Ação Antioxidante: A melatonina é um poderoso antioxidante, combatendo os radicais livres e protegendo o corpo contra o envelhecimento celular.

• Não Causa Dependência: Por ser um hormônio natural produzido pelo corpo, a melatonina não gera dependência, permitindo o uso regular sem riscos.

• Auxílio no Jet Lag: A melatonina é amplamente utilizada para regular o ciclo do sono em viagens internacionais, ajudando a ajustar o relógio biológico ao novo fuso horário.`,
    rules: [
      {
        title: '1) Proibição de uso da marca em domínios',
        content: 'Não é permitido utilizar a palavra-chave da marca do Produto em seu domínio.'
      },
      {
        title: '2) Restrições em anúncios do Google',
        content: 'Não é permitido rodar anúncios na rede de pesquisa do Google com a palavra-chave da marca do Produto: "Bluue Sleep".'
      },
      {
        title: '3) Criação de usernames e fanpages',
        content: `Não é permitido criar username do Instagram e fanpages com a palavra-chave principal da marca.

❌ Exemplos proibidos:
• @bluuesleepoficial
• @bluuetravesseiro
• Não pode usar "Bluue e Sleep" junto ou invertido

✅ Só é permitido criar usernames com nomes do nicho:
• Saúde do Sono
• Sono em Dia
• Dr Sono
• Representante Oficial Bluue Sleep
• Bluue Sleep Parceiro Oficial`
      },
      {
        title: '4) Informações adicionais',
        content: `As outras informações sobre a afiliação se encontram nas aulas e com o suporte.

⚠️ Atenção: A sua afiliação pode ser desativada caso você não siga as regras de afiliação. Essas regras são criadas para zelar o bem da marca e conseguirmos continuar vendendo mais.`
      }
    ],
    lastClick: 'Último Click',
    supportMaterial: 'Material de Apoio',
    autoAffiliation: true,
    cookie: '60 dias',
    otherProducts: false,
    affiliationLink: 'https://dash.b4you.com.br/vitrine/produto/sonotonina-em-gummie/9bc21397-c88e-4162-a3d6-af73661e54f9',
    conversion: 75,
    status: 'ATIVO'
  },
  '5': {
    id: '5',
    name: 'Vit Fit Creatina Gummy',
    images: [
      '/produtos/p5a.png',
      '/produtos/p5b.png',
      '/produtos/p5c.png',
      '/produtos/p5d.jpg'
    ],
    description: `A Vit Fit Creatina Gummy é a revolução no uso de creatina. Um suplemento de alta performance em formato de goma mastigável, feito pra quem quer mais força, mais foco e mais resultado, sem complicação e sem gosto ruim.

Enquanto a creatina em pó exige scoop, shaker e tolerância pro gosto amargo, a Gummy entrega tudo isso com sabor incrível, fórmula pura e 100% praticidade.

Sabor marcante e gostoso que transforma o momento da suplementação numa experiência prazerosa.

Cada unidade foi pensada pra oferecer eficiência máxima na absorção, com qualidade e segurança alimentar.

Segundo estudos:

• Aumenta a força muscular
• Melhora o desempenho físico em treinos intensos
• Contribui para ganho de massa magra
• Acelera a recuperação pós-exercício
• Ajuda no foco e clareza mental durante o treino

Ou seja: você treina melhor, evolui mais rápido e recupera com uso potencializador de um produto incrível!`,
    rules: [
      {
        title: '1) Conteúdo 100% autoral',
        content: 'Crie conteúdo 100% autoral. Nada de copiar outros criadores.\n\nUse sua linguagem e criatividade para criar materiais únicos e originais.'
      },
      {
        title: '2) Sem promessas milagrosas',
        content: 'Suplemento ajuda, mas não faz mágica. Resultados levam tempo.\n\nNão prometa transformações impossíveis ou resultados instantâneos.'
      },
      {
        title: '3) Não afirme cura',
        content: 'O produto auxilia na performance e recuperação, mas não substitui orientação médica.\n\nNão faça afirmações de cura ou tratamento de doenças.'
      },
      {
        title: '4) Seja transparente',
        content: 'Mostre os benefícios reais, sem exagerar ou inventar.\n\nMantenha a honestidade na comunicação sobre o produto e seus efeitos.'
      },
      {
        title: '5) Proibições importantes',
        content: `É estritamente proibido:

❌ Comentar link de afiliado em perfis de outros criadores ou da Vit Fit
❌ Criar perfis com "Vit Fit" ou "Vit Fit Oficial"
❌ Fazer anúncios pagos (só vale impulsionar seus próprios vídeos)

⚠️ O descumprimento dessas regras pode resultar na remoção imediata da sua afiliação.

Ficou na dúvida? Entre em contato! Estamos juntos para ganhar junto.`
      }
    ],
    lastClick: 'Último Click',
    supportMaterial: 'Material de Apoio',
    autoAffiliation: true,
    cookie: '30 dias',
    otherProducts: false,
    affiliationLink: 'https://dash.b4you.com.br/vitrine/produto/creatina-gummy-vitfit/87b041de-875b-4451-a6c9-405ed04b8fee',
    conversion: 70,
    status: 'ATIVO'
  },
  '6': {
    id: '6',
    name: 'BLÄYVA - Creatina Aditivada',
    images: [
      '/produtos/p6a.png',
      '/produtos/p6b.png',
      '/produtos/p6c.png',
      '/produtos/p6d.png'
    ],
    description: `BLÄYVA é a primeira creatina aditivada do mundo, unindo creatina HCL + pré-treino + termogênico em um único produto.

Ela acelera o metabolismo, aumenta energia e foco, ajuda a definir o corpo, reduzir inchaço e potencializar os resultados — mesmo para quem não treina todos os dias.

Com fórmula exclusiva e sabor de maçã verde, é hoje a mais potente e completa do mercado, sinônimo de força, beleza e alta performance.

Benefícios da BLÄYVA:

• Acelera o metabolismo
• Aumenta energia e foco
• Ajuda a definir o corpo
• Reduz inchaço
• Potencializa resultados no treino
• Fórmula 3 em 1 exclusiva
• Sabor delicioso de maçã verde`,
    rules: [
      {
        title: '1) Comissão e Remuneração',
        content: 'Comissão mínima de 40% para todos os afiliados.\n\nPrograma de remuneração competitivo e justo para valorizar seu trabalho.'
      },
      {
        title: '2) Material para Afiliado',
        content: 'Material de apoio atualizado disponível para todos os afiliados.\n\nAcesso a recursos visuais, textos, vídeos e criativos para suas campanhas.'
      },
      {
        title: '3) Transparência Total',
        content: `Enviamos código de rastreio para TODOS os clientes.

Dados de compra liberados para afiliado, garantindo total transparência nas suas vendas e comissões.`
      },
      {
        title: '4) Alta Performance em Vendas',
        content: `Página de vendas de alta conversão e desempenho.

Upsell e Downsell ativos para maximizar suas comissões por venda.

Sistema otimizado para converter mais visitantes em compradores.`
      },
      {
        title: '5) Suporte e Reconhecimento',
        content: `Suporte total ao afiliado - estamos juntos no seu sucesso!

Placas de reconhecimento da mentoria:
• 15k em vendas
• 30k em vendas
• 50k em vendas
• 100k em vendas
• 200k em vendas

Ranking mensal dos Top Afiliados do mês.`
      }
    ],
    lastClick: 'Último Click',
    supportMaterial: 'Material de Apoio',
    autoAffiliation: true,
    cookie: '30 dias',
    otherProducts: false,
    affiliationLink: 'https://dash.b4you.com.br/vitrine/produto/blayva-a-primeira-creatina-aditivada-do-brasil/fc42394a-c05c-4b6d-91f2-c39bd97c0de5',
    conversion: 82,
    status: 'ATIVO'
  },
  // Outros produtos mockados (sem dados ainda)
  ...Object.fromEntries(
    Array.from({ length: 12 }, (_, i) => {
      const id = (i + 7).toString();
      return [
        id,
        {
          id,
          name: `Produto ${id}`,
          images: [],
          description: 'A descrição do produto será adicionada futuramente. Este espaço será preenchido com informações detalhadas sobre o produto, benefícios, características e diferenciais.',
          rules: [],
          lastClick: null,
          supportMaterial: null,
          autoAffiliation: false,
          cookie: '-',
          otherProducts: false,
          affiliationLink: '#',
          conversion: Math.floor(Math.random() * 40 + 40),
          status: 'ATIVO' as const
        }
      ];
    })
  )
};

// Função helper para buscar produto
export function getProduct(id: string): Product | null {
  return PRODUCTS[id] || null;
}

// Função helper para listar todos produtos
export function getAllProducts(): Product[] {
  return Object.values(PRODUCTS);
}
