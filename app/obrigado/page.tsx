"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/meta-pixel";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function ObrigadoPage() {
    useEffect(() => {
        // Dispara o evento de Purchase via Pixel + CAPI ao carregar a página
        trackEvent("Purchase", {
            value: 97.00,
            currency: "BRL",
            content_name: "VDA Premium",
        });
    }, []);

    return (
        <main className="min-h-screen bg-[#05080f] flex items-center justify-center p-4">
            <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#21c55e_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#21c55e]/10 rounded-full blur-[100px] pointer-events-none z-0" />

            <div className="max-w-md w-full relative z-10 text-center space-y-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#21c55e]/20 border border-[#21c55e]/40 flex items-center justify-center animate-pulse-glow mb-2">
                    <CheckCircle2 className="w-10 h-10 text-[#21c55e]" strokeWidth={2.5} />
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                    Compra Aprovada!
                </h1>

                <p className="text-slate-400 text-[15px] leading-relaxed">
                    Entre em contato com o suporte caso tenha qualquer problema no seu login. Verifique seu e-mail cadastrado no momento da compra para visualizar seu acesso e links úteis.
                </p>

                <div className="w-full h-[1px] bg-white/10 my-4" />

                <Link
                    href="https://thiagolima.metodovda.com/login"
                    className="block w-full py-4 px-6 rounded-xl font-bold tracking-wide text-black uppercase bg-[#21c55e] hover:bg-[#1daf52] transition-all transform hover:scale-[1.03]"
                >
                    Acessar Plataforma
                </Link>
            </div>
        </main>
    );
}
