import { createClient } from '@supabase/supabase-js'

// Validação das variáveis de ambiente (apenas em runtime, não em build time)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validação só acontece quando o código executar (não durante o build)
function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Em desenvolvimento, mostra erro claro
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Variáveis de ambiente do Supabase não configuradas!')
      console.error('Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY')
    }
    // Retorna cliente com valores vazios (vai falhar em runtime, mas não quebra o build)
    return createClient('', '')
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = getSupabaseClient()

// Função de login (exemplo)
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  return { data, error }
}

// Função de logout
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Função para verificar sessão
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Função para mudar senha
export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  
  return { data, error }
}

// ========== PRODUTOS SELECIONADOS ==========

// Buscar produtos selecionados pelo usuário
export async function getSelectedProducts(userId: string) {
  const { data, error } = await supabase
    .from('selected_products')
    .select('product_id')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Erro ao buscar produtos selecionados:', error)
    return []
  }
  
  return data.map(item => item.product_id.toString())
}

// Adicionar produto à lista de selecionados
export async function addSelectedProduct(userId: string, productId: string) {
  const { data, error } = await supabase
    .from('selected_products')
    .insert({
      user_id: userId,
      product_id: parseInt(productId)
    })
    .select()
  
  return { data, error }
}

// Remover produto da lista de selecionados
export async function removeSelectedProduct(userId: string, productId: string) {
  const { data, error } = await supabase
    .from('selected_products')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', parseInt(productId))
  
  return { data, error }
}

// Verificar se produto está selecionado
export async function isProductSelected(userId: string, productId: string) {
  const { data, error } = await supabase
    .from('selected_products')
    .select('product_id')
    .eq('user_id', userId)
    .eq('product_id', parseInt(productId))
    .single()
  
  return !error && data !== null
}

// ========== PERFIL DO USUÁRIO ==========

// Tipos para o perfil
export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  phone: string | null
  subscription_status: 'free' | 'premium' | 'vip'
  total_products_selected: number
  last_login_at: string | null
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface UpdateProfileData {
  full_name?: string
  avatar_url?: string
  phone?: string
}

// Buscar perfil do usuário
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Erro ao buscar perfil:', error)
    return null
  }
  
  return data as UserProfile
}

// Atualizar perfil do usuário
export async function updateUserProfile(userId: string, updates: UpdateProfileData) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  return { data, error }
}

// Atualizar avatar do usuário
export async function updateUserAvatar(userId: string, file: File) {
  // 1. Upload da imagem para o storage
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}-${Math.random()}.${fileExt}`
  const filePath = `avatars/${fileName}`
  
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file)
  
  if (uploadError) {
    return { data: null, error: uploadError }
  }
  
  // 2. Obter URL pública da imagem
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)
  
  // 3. Atualizar perfil com a URL
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', userId)
    .select()
    .single()
  
  return { data, error }
}

// ========== SISTEMA DE PERMISSÕES (ADMIN) ==========

// Verificar se usuário é admin
export async function isUserAdmin(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', userId)
    .single()
  
  return data?.role === 'admin'
}

// Verificar se usuário atual (logado) é admin
export async function isCurrentUserAdmin(): Promise<boolean> {
  const session = await getSession()
  if (!session?.user) return false
  
  return await isUserAdmin(session.user.id)
}

// Listar todos os usuários (apenas para admins)
export async function getAllUsers() {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Erro ao buscar usuários:', error)
    return []
  }
  
  return data as UserProfile[]
}

// Listar apenas admins
export async function getAllAdmins() {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('role', 'admin')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Erro ao buscar admins:', error)
    return []
  }
  
  return data as UserProfile[]
}

// Promover usuário a admin (apenas admins podem fazer)
export async function promoteToAdmin(targetUserId: string) {
  const { data, error } = await supabase.rpc('promote_to_admin', {
    target_user_id: targetUserId
  })
  
  return { data, error }
}

// Rebaixar admin a usuário normal (apenas admins podem fazer)
export async function demoteToUser(targetUserId: string) {
  const { data, error } = await supabase.rpc('demote_to_user', {
    target_user_id: targetUserId
  })
  
  return { data, error }
}

// Atualizar role manualmente (para casos especiais)
export async function updateUserRole(userId: string, role: 'user' | 'admin') {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ role })
    .eq('id', userId)
    .select()
    .single()
  
  return { data, error }
}

// ========== SISTEMA DE AFILIAÇÃO ==========

export interface AffiliateRequest {
  id: number
  user_id: string | null
  full_name: string
  email: string
  whatsapp: string
  sales_experience: 'ja_vendo' | 'vou_comecar'
  traffic_type: 'pago' | 'organico' | 'ambos'
  status: 'pending' | 'approved' | 'rejected'
  reviewed_by: string | null
  reviewed_at: string | null
  admin_notes: string | null
  created_at: string
  updated_at: string
}

export interface CreateAffiliateRequestData {
  full_name: string
  email: string
  whatsapp: string
  sales_experience: 'ja_vendo' | 'vou_comecar'
  traffic_type: 'pago' | 'organico' | 'ambos'
}

// Criar solicitação de afiliação
export async function createAffiliateRequest(data: CreateAffiliateRequestData) {
  const session = await getSession()
  if (!session?.user) {
    return { data: null, error: { message: 'Usuário não autenticado' } }
  }

  const { data: result, error } = await supabase
    .from('affiliate_requests')
    .insert({
      user_id: session.user.id,
      ...data,
      status: 'pending'
    })
    .select()
    .single()
  
  return { data: result, error }
}

// Buscar solicitações do usuário logado
export async function getUserAffiliateRequests() {
  const session = await getSession()
  if (!session?.user) return []

  const { data, error } = await supabase
    .from('affiliate_requests')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Erro ao buscar solicitações:', error)
    return []
  }
  
  return data as AffiliateRequest[]
}

// Buscar todas as solicitações (apenas admin)
export async function getAllAffiliateRequests() {
  const { data, error } = await supabase
    .from('affiliate_requests')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Erro ao buscar solicitações:', error)
    return []
  }
  
  return data as AffiliateRequest[]
}

// Buscar solicitações pendentes (apenas admin)
export async function getPendingAffiliateRequests() {
  const { data, error } = await supabase
    .from('affiliate_requests')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Erro ao buscar solicitações pendentes:', error)
    return []
  }
  
  return data as AffiliateRequest[]
}

// Buscar uma solicitação específica por ID
export async function getAffiliateRequestById(id: number) {
  const { data, error } = await supabase
    .from('affiliate_requests')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Erro ao buscar solicitação:', error)
    return null
  }
  
  return data as AffiliateRequest
}

// Atualizar status de solicitação (apenas admin)
export async function updateAffiliateRequestStatus(
  requestId: number, 
  status: 'approved' | 'rejected',
  adminNotes?: string
) {
  const session = await getSession()
  if (!session?.user) {
    return { data: null, error: { message: 'Usuário não autenticado' } }
  }

  const { data, error } = await supabase
    .from('affiliate_requests')
    .update({
      status,
      reviewed_by: session.user.id,
      reviewed_at: new Date().toISOString(),
      admin_notes: adminNotes || null
    })
    .eq('id', requestId)
    .select()
    .single()
  
  return { data, error }
}

// Buscar produtos selecionados por um usuário específico (para admin)
export async function getSelectedProductsByUserId(userId: string) {
  const { data, error } = await supabase
    .from('selected_products')
    .select('product_id, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Erro ao buscar produtos selecionados:', error)
    return []
  }
  
  return data
}
