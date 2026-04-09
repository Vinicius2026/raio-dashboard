"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  getSession, 
  isCurrentUserAdmin, 
  getAffiliateRequestById,
  updateAffiliateRequestStatus,
  AffiliateRequest
} from "@/lib/supabase";
import { 
  Shield, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  TrendingUp,
  Calendar,
  User
} from "lucide-react";

export default function AffiliateDetailPage() {
  const router = useRouter();
  const params = useParams();
  const requestId = parseInt(params.id as string);
  
  const [isLoading, setIsLoading] = useState(true);
  const [request, setRequest] = useState<AffiliateRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkAuthAndLoadRequest();
  }, []);

  async function checkAuthAndLoadRequest() {
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

      const requestData = await getAffiliateRequestById(requestId);
      if (!requestData) {
        alert("Solicitação não encontrada");
        router.push("/admin2626/dashboard");
        return;
      }

      setRequest(requestData);
      setAdminNotes(requestData.admin_notes || "");
    } catch (error) {
      console.error("Erro ao carregar solicitação:", error);
      router.push("/admin2626/dashboard");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleStatusUpdate(status: 'approved' | 'rejected') {
    if (!request) return;

    const confirmMessage = status === 'approved' 
      ? "Tem certeza que deseja APROVAR esta solicitação?"
      : "Tem certeza que deseja REJEITAR esta solicitação?";

    if (!confirm(confirmMessage)) return;

    setIsSubmitting(true);

    try {
      const { error } = await updateAffiliateRequestStatus(
        requestId,
        status,
        adminNotes
      );

      if (error) {
        alert("Erro ao atualizar status: " + error.message);
        return;
      }

      alert(status === 'approved' ? "Solicitação aprovada com sucesso!" : "Solicitação rejeitada.");
      router.push("/admin2626/dashboard?tab=affiliates");
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-t-2 border-white/20 rounded-full animate-pulse"></div>
        </div>
        <span className="text-white/40 text-xs tracking-widest uppercase">Carregando</span>
      </div>
    );
  }

  if (!request) {
    return null;
  }

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
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/admin2626/dashboard?tab=affiliates")}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-400" />
              <span className="font-bold">Revisar Solicitação #{requestId}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10 relative z-10">
        <div className="animate-in fade-in duration-500">
          {/* Header Card */}
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{request.full_name}</h1>
                <p className="text-white/50">Solicitação de Afiliação VDA</p>
              </div>
              {request.status === 'pending' && (
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-lg border border-yellow-500/30 font-medium">
                  Pendente
                </span>
              )}
              {request.status === 'approved' && (
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-lg border border-green-500/30 font-medium">
                  Aprovado
                </span>
              )}
              {request.status === 'rejected' && (
                <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-lg border border-red-500/30 font-medium">
                  Rejeitado
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-white/40 mt-0.5" />
                  <div>
                    <p className="text-xs text-white/40 mb-1">Nome Completo</p>
                    <p className="text-white font-medium">{request.full_name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-white/40 mt-0.5" />
                  <div>
                    <p className="text-xs text-white/40 mb-1">E-mail</p>
                    <p className="text-white font-medium">{request.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-white/40 mt-0.5" />
                  <div>
                    <p className="text-xs text-white/40 mb-1">WhatsApp</p>
                    <p className="text-white font-medium">{request.whatsapp}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-white/40 mt-0.5" />
                  <div>
                    <p className="text-xs text-white/40 mb-1">Experiência</p>
                    <p className="text-white font-medium">
                      {request.sales_experience === 'ja_vendo' ? 'Já vende online' : 'Vai começar a vender'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-white/40 mt-0.5" />
                  <div>
                    <p className="text-xs text-white/40 mb-1">Tipo de Tráfego</p>
                    <p className="text-white font-medium capitalize">
                      {request.traffic_type === 'ambos' ? 'Pago e Orgânico' : request.traffic_type}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-white/40 mt-0.5" />
                  <div>
                    <p className="text-xs text-white/40 mb-1">Data da Solicitação</p>
                    <p className="text-white font-medium">
                      {new Date(request.created_at).toLocaleDateString()} às{" "}
                      {new Date(request.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 mb-6">
            <label htmlFor="admin_notes" className="block text-lg font-semibold mb-3">
              Observações do Administrador
            </label>
            <textarea
              id="admin_notes"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={4}
              disabled={request.status !== 'pending'}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Adicione observações sobre esta solicitação (opcional)"
            />
            <p className="text-xs text-white/40 mt-2">
              Essas observações ficarão registradas no sistema.
            </p>
          </div>

          {/* Ações */}
          {request.status === 'pending' && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleStatusUpdate('approved')}
                disabled={isSubmitting}
                className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Aprovar Afiliação
                  </>
                )}
              </button>

              <button
                onClick={() => handleStatusUpdate('rejected')}
                disabled={isSubmitting}
                className="px-6 py-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-red-500/30"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    Rejeitar Solicitação
                  </>
                )}
              </button>
            </div>
          )}

          {request.status !== 'pending' && (
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-center">
              <p className="text-white/60">
                Esta solicitação já foi {request.status === 'approved' ? 'aprovada' : 'rejeitada'}.
              </p>
              {request.reviewed_at && (
                <p className="text-white/40 text-sm mt-2">
                  Revisada em {new Date(request.reviewed_at).toLocaleDateString()} às{" "}
                  {new Date(request.reviewed_at).toLocaleTimeString()}
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
