"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  getSession, 
  signOut, 
  isCurrentUserAdmin, 
  getAllUsers, 
  UserProfile,
  getPendingAffiliateRequests,
  getAllAffiliateRequests,
  AffiliateRequest,
  getSelectedProductsByUserId
} from "@/lib/supabase";
import { getProduct } from "@/lib/products-data";
import { 
  Shield, 
  Users, 
  UserCheck, 
  LogOut, 
  Home,
  ChevronRight,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  TrendingUp,
  Calendar
} from "lucide-react";

type AdminTab = "users" | "affiliates";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("users");
  
  // Estados para usuários
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [userProducts, setUserProducts] = useState<any[]>([]);
  const [loadingUserProducts, setLoadingUserProducts] = useState(false);
  
  // Estados para afiliações
  const [affiliateRequests, setAffiliateRequests] = useState<AffiliateRequest[]>([]);
  const [selectedAffiliate, setSelectedAffiliate] = useState<AffiliateRequest | null>(null);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  useEffect(() => {
    if (activeTab === "users" && users.length === 0) {
      loadUsers();
    } else if (activeTab === "affiliates" && affiliateRequests.length === 0) {
      loadAffiliateRequests();
    }
  }, [activeTab]);

  async function checkAdminAuth() {
    try {
      const session = await getSession();
      if (!session) {
        router.push("/admin2626");
        return;
      }

      const isAdmin = await isCurrentUserAdmin();
      if (!isAdmin) {
        router.push("/dashboard");
        return;
      }

      setAdminEmail(session.user?.email || "");
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      router.push("/admin2626");
    } finally {
      setIsLoading(false);
    }
  }

  async function loadUsers() {
    const usersData = await getAllUsers();
    setUsers(usersData);
  }

  async function loadAffiliateRequests() {
    const requests = await getAllAffiliateRequests();
    setAffiliateRequests(requests);
  }

  async function handleUserClick(user: UserProfile) {
    setSelectedUser(user);
    setLoadingUserProducts(true);
    
    const products = await getSelectedProductsByUserId(user.id);
    setUserProducts(products);
    setLoadingUserProducts(false);
  }

  async function handleLogout() {
    await signOut();
    router.push("/admin2626");
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-t-2 border-white/20 rounded-full animate-pulse"></div>
        </div>
        <span className="text-white/40 text-xs tracking-widest uppercase">Carregando Dashboard</span>
      </div>
    );
  }

  const pendingCount = affiliateRequests.filter(r => r.status === 'pending').length;
  const approvedCount = affiliateRequests.filter(r => r.status === 'approved').length;

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex flex-col cursor-default">
              <span className="text-xl font-black tracking-tighter leading-none">VDA ADMIN</span>
              <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Dashboard</span>
            </div>

            <nav className="hidden md:flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/5">
              <button
                onClick={() => setActiveTab("users")}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "users" 
                  ? "bg-white text-black shadow-lg shadow-white/10" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Users className="w-4 h-4" />
                Usuários
              </button>
              <button
                onClick={() => setActiveTab("affiliates")}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "affiliates" 
                  ? "bg-white text-black shadow-lg shadow-white/10" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Afiliações
                {pendingCount > 0 && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-white/40">Administrador</p>
              <p className="text-sm font-medium">{adminEmail}</p>
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              title="Voltar para dashboard de usuário"
            >
              <Home className="w-5 h-5 text-white/60" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        {/* Tab: Usuários */}
        {activeTab === "users" && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Usuários Cadastrados</h1>
              <p className="text-white/50">Total de {users.length} usuários no sistema</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lista de Usuários */}
              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${
                      selectedUser?.id === user.id
                        ? "bg-gradient-to-r from-white/10 to-white/5 border-white/30 shadow-lg"
                        : "bg-white/[0.03] border-white/5 hover:bg-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Avatar Circle */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 flex-shrink-0">
                          <Users className="w-6 h-6 text-white/60" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-bold text-white truncate">
                              {user.full_name || "Sem nome"}
                            </h3>
                            {user.role === "admin" && (
                              <span className="px-2.5 py-0.5 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full border border-red-500/30">
                                ADMIN
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-white/50 truncate mb-2">{user.email}</p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-md">
                              📦 {user.total_products_selected || 0} produtos
                            </span>
                            <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-md">
                              📅 {new Date(user.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30 flex-shrink-0 ml-2" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Detalhes do Usuário Selecionado */}
              <div className="sticky top-24 h-fit">
                {selectedUser ? (
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-1">
                          {selectedUser.full_name || "Sem nome"}
                        </h2>
                        <p className="text-white/50">{selectedUser.email}</p>
                      </div>
                      {selectedUser.role === "admin" && (
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-lg border border-red-500/30 font-medium">
                          ADMIN
                        </span>
                      )}
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-white/40" />
                        <span className="text-white/70">{selectedUser.email}</span>
                      </div>
                      {selectedUser.phone && (
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="w-4 h-4 text-white/40" />
                          <span className="text-white/70">{selectedUser.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-white/40" />
                        <span className="text-white/70">
                          Cadastrado em {new Date(selectedUser.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Produtos com START
                      </h3>
                      
                      {loadingUserProducts ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        </div>
                      ) : userProducts.length === 0 ? (
                        <p className="text-white/40 text-sm text-center py-8">
                          Nenhum produto selecionado
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {userProducts.map((item) => {
                            const product = getProduct(item.product_id.toString());
                            return (
                              <div
                                key={item.product_id}
                                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5"
                              >
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold">
                                  #{item.product_id}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">
                                    {product?.name || `Produto ${item.product_id}`}
                                  </p>
                                  <p className="text-xs text-white/40">
                                    Iniciado em {new Date(item.created_at).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-12 text-center">
                    <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/40">
                      Selecione um usuário para ver os detalhes
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Afiliações */}
        {activeTab === "affiliates" && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Solicitações de Afiliação</h1>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-white/50">
                  {affiliateRequests.length} solicitações totais
                </span>
                <span className="text-white/30">•</span>
                <span className="text-yellow-400">
                  {pendingCount} pendentes
                </span>
                <span className="text-white/30">•</span>
                <span className="text-green-400">
                  {approvedCount} aprovadas
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lista de Solicitações */}
              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {affiliateRequests.map((request) => (
                  <button
                    key={request.id}
                    onClick={() => setSelectedAffiliate(request)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${
                      selectedAffiliate?.id === request.id
                        ? "bg-gradient-to-r from-white/10 to-white/5 border-white/30 shadow-lg"
                        : "bg-white/[0.03] border-white/5 hover:bg-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Status Circle */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                          request.status === 'pending' ? 'bg-yellow-500/10 border-yellow-500/30' :
                          request.status === 'approved' ? 'bg-green-500/10 border-green-500/30' :
                          'bg-red-500/10 border-red-500/30'
                        }`}>
                          {request.status === 'pending' && <Clock className="w-6 h-6 text-yellow-400" />}
                          {request.status === 'approved' && <CheckCircle className="w-6 h-6 text-green-400" />}
                          {request.status === 'rejected' && <XCircle className="w-6 h-6 text-red-400" />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-bold text-white truncate">
                              {request.full_name}
                            </h3>
                            {request.status === 'pending' && (
                              <span className="px-2.5 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full border border-yellow-500/30">
                                PENDENTE
                              </span>
                            )}
                            {request.status === 'approved' && (
                              <span className="px-2.5 py-0.5 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                                APROVADO
                              </span>
                            )}
                            {request.status === 'rejected' && (
                              <span className="px-2.5 py-0.5 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full border border-red-500/30">
                                REJEITADO
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-white/50 truncate mb-2">{request.email}</p>
                          <p className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-md inline-block">
                            📅 {new Date(request.created_at).toLocaleDateString()} às{" "}
                            {new Date(request.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30 flex-shrink-0 ml-2" />
                    </div>
                  </button>
                ))}

                {affiliateRequests.length === 0 && (
                  <div className="text-center py-12 bg-white/[0.03] border border-white/5 rounded-2xl">
                    <UserCheck className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/40">Nenhuma solicitação encontrada</p>
                  </div>
                )}
              </div>

              {/* Detalhes da Solicitação */}
              <div className="sticky top-24 h-fit">
                {selectedAffiliate ? (
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-6">
                      <h2 className="text-2xl font-bold">Detalhes da Solicitação</h2>
                      {selectedAffiliate.status === 'pending' && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-lg border border-yellow-500/30">
                          <Clock className="w-4 h-4" />
                          Pendente
                        </span>
                      )}
                      {selectedAffiliate.status === 'approved' && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-lg border border-green-500/30">
                          <CheckCircle className="w-4 h-4" />
                          Aprovado
                        </span>
                      )}
                      {selectedAffiliate.status === 'rejected' && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-lg border border-red-500/30">
                          <XCircle className="w-4 h-4" />
                          Rejeitado
                        </span>
                      )}
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="text-sm text-white/40 mb-1 block">Nome Completo</label>
                        <p className="text-white font-medium">{selectedAffiliate.full_name}</p>
                      </div>

                      <div>
                        <label className="text-sm text-white/40 mb-1 block">E-mail</label>
                        <p className="text-white font-medium">{selectedAffiliate.email}</p>
                      </div>

                      <div>
                        <label className="text-sm text-white/40 mb-1 block">WhatsApp</label>
                        <p className="text-white font-medium">{selectedAffiliate.whatsapp}</p>
                      </div>

                      <div>
                        <label className="text-sm text-white/40 mb-1 block">Experiência de Vendas</label>
                        <p className="text-white font-medium">
                          {selectedAffiliate.sales_experience === 'ja_vendo' ? 'Já vendo online' : 'Vou começar a vender'}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm text-white/40 mb-1 block">Tipo de Tráfego</label>
                        <p className="text-white font-medium capitalize">
                          {selectedAffiliate.traffic_type === 'ambos' ? 'Pago e Orgânico' : selectedAffiliate.traffic_type}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm text-white/40 mb-1 block">Data da Solicitação</label>
                        <p className="text-white font-medium">
                          {new Date(selectedAffiliate.created_at).toLocaleDateString()} às{" "}
                          {new Date(selectedAffiliate.created_at).toLocaleTimeString()}
                        </p>
                      </div>

                      {selectedAffiliate.admin_notes && (
                        <div>
                          <label className="text-sm text-white/40 mb-1 block">Observações do Admin</label>
                          <p className="text-white/70 text-sm bg-white/5 p-3 rounded-lg">
                            {selectedAffiliate.admin_notes}
                          </p>
                        </div>
                      )}

                      {selectedAffiliate.status === 'pending' && (
                        <div className="flex gap-3 pt-6 border-t border-white/5 mt-6">
                          <button
                            onClick={() => router.push(`/admin2626/dashboard/affiliate/${selectedAffiliate.id}`)}
                            className="group flex-1 relative px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 overflow-hidden shadow-lg shadow-green-500/20"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <div className="relative flex items-center justify-center gap-2">
                              <CheckCircle className="w-5 h-5" />
                              <span>Aprovar</span>
                            </div>
                          </button>
                          <button
                            onClick={() => router.push(`/admin2626/dashboard/affiliate/${selectedAffiliate.id}`)}
                            className="group flex-1 relative px-6 py-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 hover:from-red-500/20 hover:to-orange-500/20 text-red-400 font-bold rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 border-2 border-red-500/30 hover:border-red-500/50 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <div className="relative flex items-center justify-center gap-2">
                              <XCircle className="w-5 h-5" />
                              <span>Rejeitar</span>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-12 text-center">
                    <UserCheck className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/40">
                      Selecione uma solicitação para ver os detalhes
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
