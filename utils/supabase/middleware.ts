import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Fetch the user session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isPublicRoute = request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/login')
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')
  // /admin2626 (login page) is public; only /admin2626/dashboard/* requires admin role
  const isAdminLoginPage = request.nextUrl.pathname === '/admin2626'
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin2626/dashboard')

  if (isAdminRoute) {
    if (!user) {
      return NextResponse.redirect(new URL('/admin2626', request.url))
    }
    // Check if the user has admin role
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  } else if (isDashboardRoute) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } else if (isPublicRoute) {
    // optional logic for public pages if user is logged in
    // if (user && request.nextUrl.pathname.startsWith('/login')) {
    //   return NextResponse.redirect(new URL('/dashboard', request.url))
    // }
  }

  return supabaseResponse
}
