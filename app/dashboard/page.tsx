"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  Package, 
  TrendingUp, 
  Headphones,
  Award,
  FileText,
  Mic,
  Video,
  Image as ImageIcon,
  Play,
  Sparkles,
  Target,
  Zap,
  Calendar,
  ChevronRight,
  LayoutDashboard,
  CheckCircle2,
  DollarSign,
  Users,
  TrendingUp as TrendingUpIcon,
  Send,
  Menu,
  X,
  Lock,
  LogOut
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, signOut, getSelectedProducts, createAffiliateRequest } from "@/lib/supabase";
import { getProduct } from "@/lib/products-data";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import Image from "next/image";

type MenuTab = "home" | "produtos" | "rev-vda" | "suporte" | "minhas-placas";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MenuTab>("home");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const totalProducts = 18; // Total de produtos mockados
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Estados para formulário de afiliação
  const [affiliateForm, setAffiliateForm] = useState({
    full_name: "",
    email: "",
    whatsapp: "",
    sales_experience: "" as "ja_vendo" | "vou_comecar" | "",
    traffic_type: "" as "pago" | "organico" | "ambos" | ""
  });
  const [isSubmittingAffiliate, setIsSubmittingAffiliate] = useState(false);
  const [affiliateSuccess, setAffiliateSuccess] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    // Ler parâmetro 'tab' da URL e setar activeTab
    const tabParam = searchParams.get('tab');
    if (tabParam && ['home', 'produtos', 'rev-vda', 'suporte', 'minhas-placas'].includes(tabParam)) {
      setActiveTab(tabParam as MenuTab);
    }
  }, [searchParams]);

  useEffect(() => {
    // Reset página ao mudar de aba
    setCurrentPage(1);
  }, [activeTab]);

  async function checkAuth() {
    try {
      const session = await getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      setUserEmail(session.user?.email || "");
      
      // Carregar produtos selecionados
      const products = await getSelectedProducts(session.user.id);
      setSelectedProducts(products);
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    await signOut();
    router.push("/");
  }

  async function handleAffiliateSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validações
    if (!affiliateForm.full_name || !affiliateForm.email || !affiliateForm.whatsapp || 
        !affiliateForm.sales_experience || !affiliateForm.traffic_type) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    setIsSubmittingAffiliate(true);

    try {
      const { data, error } = await createAffiliateRequest({
        full_name: affiliateForm.full_name,
        email: affiliateForm.email,
        whatsapp: affiliateForm.whatsapp,
        sales_experience: affiliateForm.sales_experience as "ja_vendo" | "vou_comecar",
        traffic_type: affiliateForm.traffic_type as "pago" | "organico" | "ambos"
      });

      if (error) {
        alert("Erro ao enviar solicitação: " + error.message);
        return;
      }

      // Sucesso!
      setAffiliateSuccess(true);
      setAffiliateForm({
        full_name: "",
        email: "",
        whatsapp: "",
        sales_experience: "",
        traffic_type: ""
      });

      // Resetar sucesso após 5 segundos
      setTimeout(() => {
        setAffiliateSuccess(false);
      }, 5000);

    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
      alert("Erro ao enviar solicitação. Tente novamente.");
    } finally {
      setIsSubmittingAffiliate(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-t-2 border-white/20 rounded-full animate-pulse"></div>
        </div>
        <span className="text-white/40 text-xs tracking-widest uppercase">Carregando Ecossistema</span>
      </div>
    );
  }

  const menuItems = [
    { id: "home" as MenuTab, label: "Home", icon: Home },
    { id: "produtos" as MenuTab, label: "Produtos", icon: Package },
    { id: "rev-vda" as MenuTab, label: "Rev VDA", icon: TrendingUp },
    { id: "minhas-placas" as MenuTab, label: "Minhas Placas", icon: Award },
    { id: "suporte" as MenuTab, label: "Suporte", icon: Headphones },
  ];

  const driveFiles = [
    { id: "texto", label: "Texto", icon: FileText, color: "text-blue-400" },
    { id: "audio", label: "Áudio", icon: Mic, color: "text-emerald-400" },
    { id: "video", label: "Vídeo", icon: Video, color: "text-rose-400" },
    { id: "imagens", label: "Imagens", icon: ImageIcon, color: "text-amber-400" },
  ];

  const lives = [
    { 
      id: "imersao", 
      title: "Live Imersão", 
      icon: Sparkles,
      gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
      accent: "bg-purple-500"
    },
    { 
      id: "posicionamento", 
      title: "Live Posicionamento", 
      icon: Target,
      gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
      accent: "bg-blue-500"
    },
    { 
      id: "trafego", 
      title: "Live Tráfego", 
      icon: Zap,
      gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
      accent: "bg-orange-500"
    },
    { 
      id: "eventos", 
      title: "Live Eventos", 
      icon: Calendar,
      gradient: "from-green-500/10 via-green-500/5 to-transparent",
      accent: "bg-green-500"
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/10 relative overflow-hidden">
      {/* Background - Base escura sempre presente */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>
      
      {/* Névoa Animada com Cores Neon - APENAS NA HOME */}
      {activeTab === "home" && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Rosa Neon - Principal */}
          <div className="absolute top-[15%] left-[8%] w-[650px] h-[650px] bg-[#FF0066] opacity-[0.22] blur-[160px] rounded-full animate-float-slow mix-blend-screen"></div>
          <div className="absolute top-[55%] left-[2%] w-[480px] h-[480px] bg-[#FF1744] opacity-[0.18] blur-[140px] rounded-full animate-float-reverse"></div>
          <div className="absolute bottom-[10%] left-[30%] w-[420px] h-[420px] bg-[#EC4899] opacity-[0.15] blur-[135px] rounded-full animate-float-horizontal"></div>
          
          {/* Azul Ciano - Contraste */}
          <div className="absolute top-[25%] right-[12%] w-[580px] h-[580px] bg-[#00D9FF] opacity-[0.28] blur-[170px] rounded-full animate-float-diagonal mix-blend-screen"></div>
          <div className="absolute bottom-[18%] right-[3%] w-[520px] h-[520px] bg-[#00FFFF] opacity-[0.24] blur-[150px] rounded-full animate-float-slow-reverse"></div>
          <div className="absolute top-[70%] right-[35%] w-[380px] h-[380px] bg-[#06B6D4] opacity-[0.20] blur-[130px] rounded-full animate-float-vertical"></div>
          
          {/* Roxo/Magenta - Meio */}
          <div className="absolute top-[45%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-[#A855F7] opacity-[0.18] blur-[180px] rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-[35%] left-[18%] w-[440px] h-[440px] bg-[#C026D3] opacity-[0.20] blur-[145px] rounded-full animate-float-horizontal"></div>
          <div className="absolute top-[5%] left-[40%] w-[360px] h-[360px] bg-[#9333EA] opacity-[0.16] blur-[125px] rounded-full animate-float-diagonal-reverse"></div>
          
          {/* Vermelho Profundo - Acentos */}
          <div className="absolute top-[8%] right-[28%] w-[480px] h-[480px] bg-[#DC2626] opacity-[0.14] blur-[155px] rounded-full animate-float-vertical"></div>
          <div className="absolute bottom-[42%] right-[38%] w-[400px] h-[400px] bg-[#EF4444] opacity-[0.17] blur-[140px] rounded-full animate-float-diagonal-reverse"></div>
          
          {/* Camadas adicionais para profundidade */}
          <div className="absolute top-[35%] left-[65%] w-[340px] h-[340px] bg-[#F472B6] opacity-[0.12] blur-[110px] rounded-full animate-float-reverse"></div>
          <div className="absolute bottom-[25%] left-[55%] w-[300px] h-[300px] bg-[#0EA5E9] opacity-[0.15] blur-[120px] rounded-full animate-float-slow"></div>
          
          {/* Overlay gradiente para profundidade dark */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
          
          {/* Vinheta sutil nas bordas */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
        </div>
      )}
      
      {/* Background simples e limpo para outras páginas */}
      {activeTab !== "home" && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(100,100,255,0.03),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,100,200,0.03),transparent_50%)]"></div>
        </div>
      )}

      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8 flex-1">
            <div className="flex items-center gap-2 group cursor-default">
              <div className="w-9 h-9 bg-white flex items-center justify-center rounded-lg group-hover:rotate-6 transition-transform">
                <LayoutDashboard className="w-5 h-5 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none">VDA</span>
                <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Premium Hub</span>
              </div>
            </div>

          </div>
          
          <div className="flex items-center gap-4">
            {/* Menu Button - único ícone para menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-t border-white/10 bg-black/30 backdrop-blur-2xl bg-gradient-to-b from-white/[0.04] to-transparent"
          >
            <div className="px-6 py-4 space-y-2">
              {/* Informação do usuário */}
              <div className="px-4 py-3 mb-2 border-b border-white/10">
                <p className="text-xs text-white/50 mb-1">Conectado como</p>
                <p className="text-sm text-white font-semibold truncate">{userEmail}</p>
              </div>

              {/* Itens de navegação */}
              {menuItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${
                      activeTab === item.id
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <ItemIcon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}

              {/* Separador */}
              <div className="border-t border-white/10 my-2"></div>

              {/* Alterar Senha */}
              <button
                onClick={() => {
                  setIsPasswordModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left text-white/60 hover:text-white hover:bg-white/5"
              >
                <Lock className="w-5 h-5" />
                <span className="font-medium">Alterar Senha</span>
              </button>

              {/* Sair */}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sair</span>
              </button>
            </div>
          </motion.div>
        )}
      </header>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        {activeTab === "home" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Seção Produtos */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  Meus Produtos
                </h2>
              </div>
              
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 backdrop-blur-sm min-h-[200px] flex flex-col items-center justify-center text-center">
                {selectedProducts.length === 0 ? (
                  <>
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 ring-1 ring-white/10">
                      <Package className="w-8 h-8 text-white/20" />
                    </div>
                    <h3 className="text-lg font-medium text-white/80">Vitrine Vazia</h3>
                    <p className="text-white/40 text-sm max-w-xs mt-1">
                      Personalize seu dashboard selecionando produtos na aba de produtos.
                    </p>
                    <button
                      onClick={() => setActiveTab("produtos")}
                      className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold tracking-wide text-white bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 border border-white/30 hover:border-white/40 shadow-lg shadow-white/10 hover:shadow-white/20 backdrop-blur-xl transition-all active:scale-95 hover:scale-105"
                    >
                      Acessar Todos Produtos
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full text-left">
                    {selectedProducts.map((productId) => {
                      const product = getProduct(productId);
                      return (
                        <div 
                          key={productId}
                          className="group relative bg-neutral-900/60 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer"
                          onClick={() => router.push(`/dashboard/produto/${productId}`)}
                        >
                          {/* Imagem menor */}
                          <div className="aspect-[16/9] bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center relative overflow-hidden">
                            {product?.images && product.images.length > 0 ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <div className="relative z-10 flex flex-col items-center gap-2">
                                <Package className="w-10 h-10 text-white/10" />
                                <span className="text-white/20 text-xs font-medium">Produto {productId}</span>
                              </div>
                            )}
                            <div className="absolute top-2 left-2 flex items-center justify-center w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20">
                              <span className="text-white font-bold text-sm">#{productId}</span>
                            </div>
                          </div>
                          
                          {/* Footer compacto */}
                          <div className="p-3 flex items-center justify-between bg-black/20">
                            {/* Conversão compacta */}
                            <div className="flex items-center gap-2">
                              <div className="relative w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div 
                                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                  style={{ width: `${product?.conversion || 50}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-semibold text-white/80">{product?.conversion || 50}%</span>
                            </div>
                            
                            {/* Badge ATIVO */}
                            <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded">
                              ATIVO
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            {/* Drives Section */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50 mb-6">Material de Apoio</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {driveFiles.map((drive) => {
                  const DriveIcon = drive.icon;
                  return (
                    <button
                      key={drive.id}
                      onClick={() => router.push(`/dashboard/material-apoio/${drive.id}`)}
                      className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-500 overflow-hidden hover:scale-105 active:scale-95"
                    >
                      <div className={`mb-4 w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                        <DriveIcon className={`w-6 h-6 ${drive.color}`} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white/90 tracking-tight">{drive.label}</span>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-transform" />
                      </div>
                      {/* Subtile Glow */}
                      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Banner Principal ACESSAR LIVES */}
            <section>
              <button className="group relative w-full overflow-hidden rounded-[2rem] p-[1px] transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]">
                {/* Border Gradient Animated */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                <div className="relative bg-neutral-900 rounded-[2rem] py-12 px-8 flex flex-col items-center gap-6 overflow-hidden">
                   {/* Background Decorative Circles */}
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                   <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/[0.02] rounded-full translate-y-1/2 -translate-x-1/2"></div>
                   
                   <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      <Play className="w-6 h-6 text-black fill-black ml-1" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-3xl font-black tracking-tighter">ACESSAR LIVES</h3>
                      <p className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase">Exclusivo Post N3</p>
                    </div>
                   </div>
                </div>
              </button>
            </section>

            {/* Lives Grid */}
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {lives.map((live) => {
                  const LiveIcon = live.icon;
                  return (
                    <button
                      key={live.id}
                      className="group relative h-48 rounded-2xl border border-white/5 bg-neutral-900/50 p-6 flex flex-col justify-between items-start transition-all duration-500 hover:-translate-y-1 hover:border-white/10 overflow-hidden"
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${live.gradient} opacity-40 group-hover:opacity-100 transition-opacity`}></div>
                      
                      <div className="relative z-10 w-10 h-10 rounded-lg bg-black/50 flex items-center justify-center backdrop-blur-md border border-white/5">
                        <LiveIcon className="w-5 h-5 text-white/80" />
                      </div>
                      
                      <div className="relative z-10 flex flex-col items-start">
                        <div className={`h-1 w-8 rounded-full ${live.accent} mb-3 group-hover:w-16 transition-all duration-500`}></div>
                        <h3 className="text-lg font-bold tracking-tight text-white/90">
                          {live.title}
                        </h3>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* Página de Produtos */}
        {activeTab === "produtos" && (
          <div className="animate-in fade-in duration-500">
            {/* Header da Seção */}
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Produtos VDA</h1>
                <p className="text-white/50 text-sm">
                  Mostrando {((currentPage - 1) * productsPerPage) + 1} - {Math.min(currentPage * productsPerPage, totalProducts)} de {totalProducts} produtos
                </p>
              </div>
              <div className="text-white/40 text-sm">
                Página {currentPage} de {totalPages}
              </div>
            </div>

            {/* Grid de Produtos - 3x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: productsPerPage }, (_, index) => {
                const productNumber = (currentPage - 1) * productsPerPage + index + 1;
                if (productNumber > totalProducts) return null;
                return productNumber;
              }).filter(Boolean).map((productNumber) => {
                const product = getProduct(productNumber!.toString());
                return (
                <div
                  key={productNumber}
                  className="group relative bg-neutral-900/80 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
                >
                  {/* Imagem do Produto */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center relative overflow-hidden">
                    {product?.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <>
                        {/* Grid pattern sutil */}
                        <div className="absolute inset-0 opacity-5" style={{
                          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
                          backgroundSize: '20px 20px'
                        }}></div>
                        
                        <div className="relative z-10 flex flex-col items-center gap-3">
                          <Package className="w-16 h-16 text-white/10" />
                          <span className="text-white/20 text-xs font-medium">Produto {productNumber}</span>
                        </div>
                      </>
                    )}
                    
                    {/* Número grande do produto */}
                    <div className="absolute top-3 left-3 flex items-center justify-center w-10 h-10 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20">
                      <span className="text-white font-bold text-lg">#{productNumber}</span>
                    </div>

                    {/* Badge de status e seleção */}
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                      {selectedProducts.includes(productNumber!.toString()) && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-md shadow-lg">
                          <CheckCircle2 className="w-3 h-3" />
                          INICIADO
                        </span>
                      )}
                      <span className="text-green-200 text-xs font-semibold px-2 py-0.5 rounded-md bg-green-500/20 border border-green-400/30 backdrop-blur-sm shadow-sm">
                        ATIVO
                      </span>
                    </div>
                  </div>

                  {/* Footer do Card */}
                  <div className="p-4 flex items-center justify-between">
                    {/* Termômetro de Conversão */}
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">
                          Conversão
                        </span>
                        <div className="flex items-center gap-2">
                          {/* Termômetro Visual */}
                          <div className="relative w-16 h-2 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                              style={{ width: `${product?.conversion || 50}%` }}
                            ></div>
                          </div>
                          {/* Valor */}
                          <span className="text-sm font-bold text-white">
                            {product?.conversion || 50}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Botão ABRIR */}
                    <button
                      onClick={() => router.push(`/dashboard/produto/${productNumber}`)}
                      className="px-5 py-2 bg-white text-black font-semibold text-sm rounded-lg hover:bg-white/90 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      ABRIR
                    </button>
                  </div>
                </div>
              );
              })}
            </div>

            {/* Paginação */}
            <div className="mt-12 flex items-center justify-center gap-2">
              {/* Botão Anterior */}
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              
              {/* Números das páginas */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-lg font-semibold text-sm transition-colors ${
                      currentPage === pageNum
                        ? 'bg-white text-black'
                        : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              
              {/* Botão Próximo */}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Página Minhas Placas */}
        {activeTab === "minhas-placas" && (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="max-w-2xl mx-auto mt-16 text-center">
              <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-10 backdrop-blur-sm">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 mx-auto ring-1 ring-white/10">
                  <Award className="w-8 h-8 text-white/30" />
                </div>
                <h2 className="text-2xl font-semibold text-white/90">
                  Você ainda não tem placas adquiridas!
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* Página Rev VDA - Formulário de Afiliação */}
        {activeTab === "rev-vda" && (
          <div className="animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto">
              {/* Header da Seção */}
              <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 mb-6">
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  Programa de Afiliação VDA
                </h1>
                <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto">
                  Solicite sua afiliação no VDA e receba <span className="text-green-400 font-bold">até 80%</span> do valor da afiliação. 
                  Você pode vender nosso produto VDA que hoje com desconto custa de <span className="line-through text-white/40">R$297</span> por <span className="text-green-400 font-bold">R$97</span>. 
                  Você também recebe sua % caso o cliente compre orderbump e upsell. Qualquer produto que seu cliente compre da VDA você recebe a sua porcentagem de afiliação.
                </p>
              </div>

              {/* Cards com Benefícios */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-bold text-white mb-1">Até 80%</h3>
                  <p className="text-white/40 text-sm">de comissão</p>
                </div>

                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUpIcon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white mb-1">Upsells</h3>
                  <p className="text-white/40 text-sm">% em tudo que vender</p>
                </div>

                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="font-bold text-white mb-1">Suporte</h3>
                  <p className="text-white/40 text-sm">Material completo</p>
                </div>
              </div>

              {/* Mensagem de Sucesso */}
              {affiliateSuccess && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-green-400 text-sm font-medium">
                    Solicitação enviada com sucesso! Nossa equipe analisará em breve.
                  </p>
                </div>
              )}

              {/* Formulário */}
              <form onSubmit={handleAffiliateSubmit} className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6">Solicitar Afiliação</h2>

                <div className="space-y-5">
                  {/* Nome */}
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-white/80 mb-2">
                      Seu nome completo
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      value={affiliateForm.full_name}
                      onChange={(e) => setAffiliateForm(prev => ({ ...prev, full_name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
                      placeholder="Digite seu nome completo"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      Seu e-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={affiliateForm.email}
                      onChange={(e) => setAffiliateForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-white/80 mb-2">
                      Seu WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      value={affiliateForm.whatsapp}
                      onChange={(e) => setAffiliateForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>

                  {/* Experiência de vendas */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">
                      Você já vende online?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAffiliateForm(prev => ({ ...prev, sales_experience: "ja_vendo" }))}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          affiliateForm.sales_experience === "ja_vendo"
                            ? "bg-white text-black"
                            : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        Já vendo online
                      </button>
                      <button
                        type="button"
                        onClick={() => setAffiliateForm(prev => ({ ...prev, sales_experience: "vou_comecar" }))}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          affiliateForm.sales_experience === "vou_comecar"
                            ? "bg-white text-black"
                            : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        Vou começar a vender
                      </button>
                    </div>
                  </div>

                  {/* Tipo de tráfego */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">
                      Que tipo de tráfego você utiliza?
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setAffiliateForm(prev => ({ ...prev, traffic_type: "pago" }))}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          affiliateForm.traffic_type === "pago"
                            ? "bg-white text-black"
                            : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        Pago
                      </button>
                      <button
                        type="button"
                        onClick={() => setAffiliateForm(prev => ({ ...prev, traffic_type: "organico" }))}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          affiliateForm.traffic_type === "organico"
                            ? "bg-white text-black"
                            : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        Orgânico
                      </button>
                      <button
                        type="button"
                        onClick={() => setAffiliateForm(prev => ({ ...prev, traffic_type: "ambos" }))}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          affiliateForm.traffic_type === "ambos"
                            ? "bg-white text-black"
                            : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        Ambos
                      </button>
                    </div>
                  </div>

                  {/* Botão Submit */}
                  <button
                    type="submit"
                    disabled={isSubmittingAffiliate}
                    className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                  >
                    {isSubmittingAffiliate ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Solicitar Afiliação
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab Empty State - Apenas Suporte */}
        {activeTab === "suporte" && (
          <div className="max-w-xl mx-auto mt-20 text-center animate-in fade-in zoom-in duration-500">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-white/[0.03] border border-white/5 mb-8 rotate-12">
               <Headphones className="w-8 h-8 text-white/20 -rotate-12" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Suporte
            </h2>
            <p className="text-white/40 leading-relaxed">
              Estamos preparando uma experiência única para esta seção. <br />
              Em breve você terá acesso total aos recursos.
            </p>
            <button 
              onClick={() => setActiveTab("home")}
              className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-t-2 border-white/20 rounded-full animate-pulse"></div>
        </div>
        <span className="text-white/40 text-xs tracking-widest uppercase">Carregando Ecossistema</span>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}