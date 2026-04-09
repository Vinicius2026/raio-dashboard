"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Package, CheckCircle2, PlayCircle, ChevronLeft, ChevronRight, ExternalLink, Clock, FileText, Cookie, ShoppingBag, AlertCircle, ChevronDown } from "lucide-react";
import { getSession, addSelectedProduct, removeSelectedProduct, isProductSelected } from "@/lib/supabase";
import { getProduct } from "@/lib/products-data";
import Image from "next/image";

export default function ProdutoPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedRules, setExpandedRules] = useState<number[]>([]);
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  // Buscar dados reais do produto
  const product = getProduct(productId);

  useEffect(() => {
    loadProductStatus();
  }, [productId]);

  async function loadProductStatus() {
    try {
      const session = await getSession();
      if (session?.user) {
        setUserId(session.user.id);
        const selected = await isProductSelected(session.user.id, productId);
        setIsSelected(selected);
      }
    } catch (error) {
      console.error("Erro ao carregar status do produto:", error);
    }
  }

  async function handleStartClick() {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      if (isSelected) {
        const { error } = await removeSelectedProduct(userId, productId);
        if (!error) {
          setIsSelected(false);
        }
      } else {
        const { error } = await addSelectedProduct(userId, productId);
        if (!error) {
          setIsSelected(true);
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function nextImage() {
    if (!product?.images.length) return;
    const nextIndex = (currentImageIndex + 1) % product.images.length;
    // Resetar estado de erro se necessário
    if (imageError[nextIndex]) {
      setImageError(prev => {
        const newState = { ...prev };
        delete newState[nextIndex];
        return newState;
      });
    }
    setCurrentImageIndex(nextIndex);
  }

  function previousImage() {
    if (!product?.images.length) return;
    const prevIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
    // Resetar estado de erro se necessário
    if (imageError[prevIndex]) {
      setImageError(prev => {
        const newState = { ...prev };
        delete newState[prevIndex];
        return newState;
      });
    }
    setCurrentImageIndex(prevIndex);
  }

  function toggleRule(index: number) {
    setExpandedRules(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/40">Produto não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Background limpo */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(100,100,255,0.03),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,100,200,0.03),transparent_50%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header com Botão Voltar */}
        <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard?tab=produtos')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Voltar</span>
            </button>
            <div className="h-6 w-px bg-white/10"></div>
            <div>
              <h1 className="text-lg font-bold">{product.name}</h1>
              <p className="text-xs text-white/40">Detalhes do produto e programa de afiliados</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          {/* Card Principal com Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Coluna Esquerda - Slider + Botões de Ação */}
            <div className="lg:col-span-2 space-y-6">
              {/* Slider de Imagens */}
              <div className="bg-neutral-900/80 border border-white/5 rounded-3xl overflow-hidden">
                <div className="aspect-[16/9] bg-gradient-to-br from-neutral-800 to-neutral-900 relative overflow-hidden">
                  {product.images.length > 0 ? (
                    <>
                      {/* Imagem atual visível */}
                      <div className="relative w-full h-full">
                        {imageLoading[currentImageIndex] && (
                          <div className="absolute inset-0 flex items-center justify-center z-20 bg-neutral-900/50">
                            <div className="w-12 h-12 border-4 border-white/20 border-t-white/60 rounded-full animate-spin" />
                          </div>
                        )}
                        {!imageError[currentImageIndex] ? (
                          <Image
                            key={`${product.id}-img-${currentImageIndex}`}
                            src={product.images[currentImageIndex]}
                            alt={`${product.name} - Imagem ${currentImageIndex + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                            className="object-contain transition-opacity duration-300"
                            priority={currentImageIndex === 0}
                            loading="eager"
                            quality={85}
                            onLoadStart={() => {
                              setImageLoading(prev => ({ ...prev, [currentImageIndex]: true }));
                            }}
                            onLoad={() => {
                              setImageLoading(prev => ({ ...prev, [currentImageIndex]: false }));
                            }}
                            onError={(e) => {
                              console.error(`Erro ao carregar imagem ${currentImageIndex}:`, product.images[currentImageIndex], e);
                              setImageError(prev => ({ ...prev, [currentImageIndex]: true }));
                              setImageLoading(prev => ({ ...prev, [currentImageIndex]: false }));
                            }}
                          />
                        ) : (
                          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
                            <Package className="w-24 h-24 text-white/10" />
                            <div className="text-center">
                              <p className="text-white/30 text-sm mb-1">ERRO AO CARREGAR IMAGEM</p>
                              <p className="text-white/20 text-xs">Imagem não disponível</p>
                              <button
                                onClick={() => {
                                  setImageError(prev => {
                                    const newState = { ...prev };
                                    delete newState[currentImageIndex];
                                    return newState;
                                  });
                                }}
                                className="mt-2 px-4 py-2 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                              >
                                Tentar novamente
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Pré-carregar imagens adjacentes */}
                      {product.images.map((image, index) => {
                        if (index === currentImageIndex) return null;
                        const isNext = index === (currentImageIndex + 1) % product.images.length;
                        const isPrev = index === (currentImageIndex - 1 + product.images.length) % product.images.length;
                        if (!isNext && !isPrev) return null;
                        
                        return (
                          <div key={`preload-${index}`} className="hidden">
                            <Image
                              src={image}
                              alt={`${product.name} - Pré-carregar ${index + 1}`}
                              width={1}
                              height={1}
                              loading="lazy"
                              quality={85}
                            />
                          </div>
                        );
                      })}

                      {/* Botões de Navegação */}
                      {product.images.length > 1 && (
                        <>
                          <button
                            onClick={previousImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all group z-10"
                          >
                            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all group z-10"
                          >
                            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                          </button>
                        </>
                      )}

                      {/* Indicadores */}
                      {product.images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                          {product.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                // Resetar erro se necessário
                                if (imageError[index]) {
                                  setImageError(prev => {
                                    const newState = { ...prev };
                                    delete newState[index];
                                    return newState;
                                  });
                                }
                                setCurrentImageIndex(index);
                              }}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImageIndex
                                  ? 'bg-white w-8'
                                  : 'bg-white/30 hover:bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
                      <Package className="w-24 h-24 text-white/10" />
                      <div className="text-center">
                        <p className="text-white/30 text-sm mb-1">IMAGEM DO PRODUTO</p>
                        <p className="text-white/20 text-xs">Imagem será adicionada em breve</p>
                      </div>
                    </div>
                  )}

                  {/* Badge de número */}
                  <div className="absolute top-6 left-6 flex items-center justify-center w-12 h-12 rounded-xl bg-black/50 backdrop-blur-sm border border-white/20">
                    <span className="text-white font-bold text-xl">#{productId}</span>
                  </div>

                  {/* Badge de status */}
                  <span className="absolute top-6 right-6 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30 backdrop-blur-sm">
                    {product.status}
                  </span>
                </div>
              </div>

              {/* Descrição do Produto */}
              <div className="bg-neutral-900/80 border border-white/5 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">Descrição do Produto</h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/70 text-sm whitespace-pre-line leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Regras do Produto */}
              {product.rules && product.rules.length > 0 && (
                <div className="bg-neutral-900/80 border border-white/5 rounded-3xl p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <AlertCircle className="w-5 h-5 text-orange-400" />
                    <h3 className="text-2xl font-bold">Regras do Produto</h3>
                  </div>
                  <div className="space-y-3">
                    {product.rules.map((rule: any, index: number) => (
                      <div
                        key={index}
                        className="bg-black/30 border border-white/5 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleRule(index)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                        >
                          <span className="text-white font-semibold text-left">{rule.title}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-white/40 transition-transform ${
                              expandedRules.includes(index) ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {expandedRules.includes(index) && (
                          <div className="px-6 pb-4">
                            <p className="text-white/60 text-sm whitespace-pre-line leading-relaxed">
                              {rule.content}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                    <p className="text-orange-400 text-sm flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Observação importante:</strong> A violação de qualquer regra pode resultar na remoção automática da sua afiliação.
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Coluna Direita - Ações e Informações */}
            <div className="lg:col-span-1 space-y-6">
              {/* Card de Ações */}
              <div className="bg-neutral-900/80 border border-white/5 rounded-3xl p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Ações</h3>
                
                {/* Taxa de Conversão */}
                <div className="mb-6 pb-6 border-b border-white/5">
                  <span className="text-sm font-semibold text-white/70 block mb-3">
                    Taxa de Conversão
                  </span>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                        style={{ width: `${product.conversion}%` }}
                      ></div>
                    </div>
                    <span className="text-2xl font-bold text-white">
                      {product.conversion}%
                    </span>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="space-y-4">
                  {/* Botão START */}
                  <div>
                    <button
                      onClick={handleStartClick}
                      disabled={isLoading}
                      className={`w-full flex items-center justify-center gap-3 px-6 py-4 font-bold text-base rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                        isSelected 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'bg-white hover:bg-white/90 text-black'
                      }`}
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : isSelected ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          INICIADO
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-5 h-5" />
                          START
                        </>
                      )}
                    </button>
                    <p className="text-white/30 text-xs text-center mt-2">
                      {isSelected ? 'Produto ativo em "Meus Produtos"' : 'Inicie o projeto com este produto'}
                    </p>
                  </div>

                  {/* Botão Afiliar */}
                  {product.affiliationLink && product.affiliationLink !== '#' && (
                    <a
                      href={product.affiliationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-base rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                    >
                      AFILIAR-SE
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Informações do Programa */}
              <div className="bg-neutral-900/80 border border-white/5 rounded-3xl p-6">
                <h3 className="text-xl font-bold mb-6">Informações do Programa</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-white/40 mt-0.5" />
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Último Clique</p>
                      <p className="text-white text-sm font-semibold">{product.lastClick || 'Não disponível'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-white/40 mt-0.5" />
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Material de Apoio</p>
                      <p className="text-white text-sm font-semibold">{product.supportMaterial || 'Não disponível'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Cookie className="w-5 h-5 text-white/40 mt-0.5" />
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Cookie</p>
                      <p className="text-white text-sm font-semibold">{product.cookie}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/40 mt-0.5" />
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Afiliação Automática</p>
                      <p className="text-white text-sm font-semibold">{product.autoAffiliation ? 'Sim' : 'Não'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShoppingBag className="w-5 h-5 text-white/40 mt-0.5" />
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Outros Produtos</p>
                      <p className="text-white text-sm font-semibold">{product.otherProducts ? 'Sim' : 'Não'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
