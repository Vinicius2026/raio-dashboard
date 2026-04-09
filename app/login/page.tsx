"use client";

import { useState } from "react";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) {
        setError(signInError.message === "Invalid login credentials" 
          ? "Email ou senha incorretos" 
          : "Erro ao fazer login. Tente novamente.");
        setIsLoading(false);
        return;
      }
      
      if (data?.session) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Erro inesperado. Tente novamente.");
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen app-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8">
          <div className="text-4xl font-bold text-vda-white hover:scale-105 transition-transform duration-200">
            VDA
          </div>
        </Link>

        {/* Card de Login */}
        <div className="glassmorphism rounded-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-vda-white">Bem-vindo de volta</h1>
            <p className="text-vda-light-gray">Entre para acessar sua dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-vda-light-gray">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vda-light-gray" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-vda-gray rounded-xl pl-12 pr-4 py-3 text-vda-white placeholder-vda-light-gray focus:outline-none focus:border-vda-white transition-colors"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-vda-light-gray">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vda-light-gray" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-vda-gray rounded-xl pl-12 pr-4 py-3 text-vda-white placeholder-vda-light-gray focus:outline-none focus:border-vda-white transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-vda-white text-vda-black font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{isLoading ? "Entrando..." : "Entrar"}</span>
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          {/* Link para voltar */}
          <div className="text-center pt-4 border-t border-vda-gray">
            <Link
              href="/"
              className="text-sm text-vda-light-gray hover:text-vda-white transition-colors"
            >
              Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
