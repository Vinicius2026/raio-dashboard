// ========================================
// DADOS DOS MATERIAIS DE APOIO - VDA
// Centralizados para fácil gerenciamento
// ========================================

export interface Material {
  id: number
  name: string
  description: string
  downloadLink: string
}

export interface MaterialCategory {
  textos: Material[]
  audios: Material[]
  videos: Material[]
  imagens: Material[]
}

// Dados mockados - Substitua com dados reais do banco de dados
export const MATERIAL_DATA: MaterialCategory = {
  textos: [
    { id: 1, name: "BLAYVA Creatina Aditivada", description: "", downloadLink: "#" },
    { id: 2, name: "Weshot Noite", description: "", downloadLink: "#" },
    { id: 3, name: "Weshot Dia", description: "", downloadLink: "#" },
    { id: 4, name: "Eva Skin", description: "", downloadLink: "#" },
    { id: 5, name: "Sonotonina Gummie", description: "", downloadLink: "https://drive.google.com/drive/folders/1tZn7ULbfpSJgqKbP0Uf_yqjWwad58HLa?usp=sharing" },
    { id: 6, name: "Creatina Gummy VitFit", description: "", downloadLink: "#" },
    { id: 7, name: "Articula Life", description: "", downloadLink: "#" },
    { id: 8, name: "Lift Burncore", description: "", downloadLink: "#" },
    { id: 9, name: "Envy Hair", description: "", downloadLink: "#" },
    { id: 10, name: "GlowPro Creatina", description: "", downloadLink: "#" },
    { id: 11, name: "Monjaro HD", description: "", downloadLink: "#" },
    { id: 12, name: "Creatina Caramelos Yummy", description: "", downloadLink: "#" },
    { id: 13, name: "Kit Bronzeador Bimion", description: "", downloadLink: "#" }
  ],
  audios: [
    { id: 1, name: "BLAYVA Creatina Aditivada", description: "", downloadLink: "#" },
    { id: 2, name: "Weshot Noite", description: "", downloadLink: "#" },
    { id: 3, name: "Weshot Dia", description: "", downloadLink: "#" },
    { id: 4, name: "Eva Skin", description: "", downloadLink: "#" },
    { id: 5, name: "Sonotonina Gummie", description: "", downloadLink: "#" },
    { id: 6, name: "Creatina Gummy VitFit", description: "", downloadLink: "#" },
    { id: 7, name: "Articula Life", description: "", downloadLink: "#" },
    { id: 8, name: "Lift Burncore", description: "", downloadLink: "#" },
    { id: 9, name: "Envy Hair", description: "", downloadLink: "#" },
    { id: 10, name: "GlowPro Creatina", description: "", downloadLink: "#" },
    { id: 11, name: "Monjaro HD", description: "", downloadLink: "#" },
    { id: 12, name: "Creatina Caramelos Yummy", description: "", downloadLink: "#" },
    { id: 13, name: "Kit Bronzeador Bimion", description: "", downloadLink: "#" }
  ],
  videos: [
    { id: 1, name: "BLAYVA Creatina Aditivada", description: "", downloadLink: "#" },
    { id: 2, name: "Weshot Noite", description: "", downloadLink: "#" },
    { id: 3, name: "Weshot Dia", description: "", downloadLink: "#" },
    { id: 4, name: "Eva Skin", description: "", downloadLink: "#" },
    { id: 5, name: "Sonotonina Gummie", description: "", downloadLink: "#" },
    { id: 6, name: "Creatina Gummy VitFit", description: "", downloadLink: "#" },
    { id: 7, name: "Articula Life", description: "", downloadLink: "#" },
    { id: 8, name: "Lift Burncore", description: "", downloadLink: "#" },
    { id: 9, name: "Envy Hair", description: "", downloadLink: "#" },
    { id: 10, name: "GlowPro Creatina", description: "", downloadLink: "#" },
    { id: 11, name: "Monjaro HD", description: "", downloadLink: "#" },
    { id: 12, name: "Creatina Caramelos Yummy", description: "", downloadLink: "#" },
    { id: 13, name: "Kit Bronzeador Bimion", description: "", downloadLink: "#" }
  ],
  imagens: [
    { id: 1, name: "BLAYVA Creatina Aditivada", description: "", downloadLink: "#" },
    { id: 2, name: "Weshot Noite", description: "", downloadLink: "#" },
    { id: 3, name: "Weshot Dia", description: "", downloadLink: "#" },
    { id: 4, name: "Eva Skin", description: "", downloadLink: "#" },
    { id: 5, name: "Sonotonina Gummie", description: "", downloadLink: "#" },
    { id: 6, name: "Creatina Gummy VitFit", description: "", downloadLink: "#" },
    { id: 7, name: "Articula Life", description: "", downloadLink: "#" },
    { id: 8, name: "Lift Burncore", description: "", downloadLink: "#" },
    { id: 9, name: "Envy Hair", description: "", downloadLink: "#" },
    { id: 10, name: "GlowPro Creatina", description: "", downloadLink: "#" },
    { id: 11, name: "Monjaro HD", description: "", downloadLink: "#" },
    { id: 12, name: "Creatina Caramelos Yummy", description: "", downloadLink: "#" },
    { id: 13, name: "Kit Bronzeador Bimion", description: "", downloadLink: "#" }
  ]
}

// Funções helper para buscar materiais
export function getTextos(): Material[] {
  return MATERIAL_DATA.textos
}

export function getAudios(): Material[] {
  return MATERIAL_DATA.audios
}

export function getVideos(): Material[] {
  return MATERIAL_DATA.videos
}

export function getImagens(): Material[] {
  return MATERIAL_DATA.imagens
}
