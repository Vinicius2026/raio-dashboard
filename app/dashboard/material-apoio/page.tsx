"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, Mic, Video, Image as ImageIcon } from "lucide-react";

export default function MaterialApoioPage() {
  const router = useRouter();

  const categories = [
    {
      id: 'texto',
      title: 'Texto',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      id: 'audio',
      title: 'Áudio',
      icon: Mic,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    },
    {
      id: 'video',
      title: 'Vídeo',
      icon: Video,
      color: 'from-pink-500 to-pink-600',
      hoverColor: 'hover:from-pink-600 hover:to-pink-700'
    },
    {
      id: 'imagens',
      title: 'Imagens',
      icon: ImageIcon,
      color: 'from-cyan-500 to-cyan-600',
      hoverColor: 'hover:from-cyan-600 hover:to-cyan-700'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(100,100,255,0.03),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,100,200,0.03),transparent_50%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard?tab=material')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Voltar</span>
            </button>
            <div className="h-6 w-px bg-white/10"></div>
            <div>
              <h1 className="text-lg font-bold">Material de Apoio</h1>
              <p className="text-xs text-white/40">Escolha o tipo de material que deseja acessar</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          {/* Aviso de Direitos */}
          <div className="mb-10 bg-neutral-900/80 border border-white/5 rounded-3xl p-6">
            <p className="text-sm text-white/60 text-center">
              Todo conteúdo é de direito autoral da VDA e autorizamos os alunos a utilização para vendas. 
              <span className="text-white/40"> Não autorizamos a venda desse material.</span>
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => router.push(`/dashboard/material-apoio/${category.id}`)}
                  className="group relative bg-neutral-900/80 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl`}></div>
                  
                  {/* Content */}
                  <div className="relative flex flex-col items-center text-center gap-4">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>

                    {/* Arrow */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
