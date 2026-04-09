import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// Rate-limit: basic in-memory map (resets on cold start)
const rateLimit = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + 60_000 }); // 1-minute window
    return false;
  }

  entry.count++;
  if (entry.count > 5) return true; // Max 5 per minute
  return false;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas tentativas. Aguarde um minuto." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Nome inválido (mín. 2 caracteres)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "E-mail inválido." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Mensagem muito curta (mín. 10 caracteres)." },
        { status: 400 }
      );
    }

    if (name.length > 200 || email.length > 300 || message.length > 5000) {
      return NextResponse.json(
        { error: "Dados excedem o tamanho máximo permitido." },
        { status: 400 }
      );
    }

    // Sanitize
    const sanitized = {
      name: name.trim().slice(0, 200),
      email: email.trim().toLowerCase().slice(0, 300),
      message: message.trim().slice(0, 5000),
      ip_address: ip,
      user_agent: (request.headers.get("user-agent") || "").slice(0, 500),
    };

    const supabase = createClient();

    const { data, error } = await supabase
      .from("contact_messages")
      .insert(sanitized)
      .select("id")
      .single();

    if (error) {
      console.error("Supabase contact insert error:", error);
      return NextResponse.json(
        { error: "Erro ao enviar mensagem. Tente novamente." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, id: data.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Contact API unexpected error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
