"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Download,
  Search,
  ShieldCheck,
  ArrowUpDown
} from "lucide-react";
import { getTextos, type Material } from "@/lib/material-apoio-data";

const RIGHTS_TEXT =
  "Todo conteúdo é de direito autoral da VDA e autorizamos os alunos a utilização para vendas. Não autorizamos a venda desse material.";

type SortOrder = "az" | "za";

function PageHeader({ onBack }: { onBack: () => void }) {
  return (
    <header className="border-b border-white/10 bg-black/60 backdrop-blur-2xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center gap-2 sm:gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs sm:text-sm font-medium hidden sm:inline">Voltar</span>
        </button>
        <div className="h-4 sm:h-6 w-px bg-white/10"></div>
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/90 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.15em] sm:tracking-[0.2em] hidden sm:block">Material de Apoio</div>
            <h1 className="text-base sm:text-xl md:text-2xl font-semibold tracking-tight text-white truncate">Material de Texto</h1>
            <p className="text-[10px] sm:text-xs md:text-sm text-white/50 hidden sm:block">Documentos e materiais escritos</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function NoticeBanner() {
  return (
    <div className="mb-4 sm:mb-6 md:mb-8 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-start gap-2 sm:gap-3">
        <div className="mt-0 flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-blue-500/15 border border-blue-500/20 text-blue-400 flex-shrink-0">
          <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </div>
        <p className="text-[11px] sm:text-xs md:text-sm text-white/70 leading-relaxed">{RIGHTS_TEXT}</p>
      </div>
    </div>
  );
}

function Toolbar({
  total,
  results,
  query,
  sort,
  onQueryChange,
  onSortChange
}: {
  total: number;
  results: number;
  query: string;
  sort: SortOrder;
  onQueryChange: (value: string) => void;
  onSortChange: (value: SortOrder) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-white">Arquivos disponíveis</h2>
        <p className="text-xs sm:text-sm text-white/50">
          Exibindo {results} de {total} arquivo{total === 1 ? "" : "s"}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center">
        <div className="relative">
          <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Buscar arquivo..."
            className="w-full sm:w-64 pl-8 sm:pl-9 pr-2.5 sm:pr-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
          />
        </div>
        <div className="relative">
          <ArrowUpDown className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40" />
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOrder)}
            className="w-full sm:w-44 pl-8 sm:pl-9 pr-7 sm:pr-8 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
          >
            <option value="az">A–Z</option>
            <option value="za">Z–A</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function FileRow({ doc, isLast }: { doc: Material; isLast: boolean }) {
  const hasDescription = doc.description?.trim();
  const description = hasDescription || null;

  return (
    <div
      className={`flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-4 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 transition-colors group ${
        isLast ? "" : "border-b border-white/5"
      } odd:bg-white/[0.01] hover:bg-white/[0.04]`}
    >
      <div className="col-span-12 md:col-span-6 flex items-center gap-2 sm:gap-3">
        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
          <FileText className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <a
            href={doc.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white text-xs sm:text-sm truncate hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded block"
            aria-label={`Abrir ${doc.name}`}
          >
            {doc.name}
          </a>
          {description && (
            <p className="text-[10px] sm:text-xs text-white/40 md:hidden mt-0.5 sm:mt-1 line-clamp-1">{description}</p>
          )}
        </div>
      </div>

      <div className="hidden md:flex md:col-span-4 items-center">
        <p className="text-sm text-white/55 line-clamp-2">{description || "—"}</p>
      </div>

      <div className="col-span-12 md:col-span-2 flex items-center justify-start md:justify-end">
        <a
          href={doc.downloadLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 w-full sm:w-auto justify-center sm:justify-start"
          aria-label={`Download de ${doc.name}`}
        >
          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Download</span>
        </a>
      </div>
    </div>
  );
}

export default function TextoMaterialPage() {
  const router = useRouter();
  const materials = getTextos();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOrder>("az");

  const filteredMaterials = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = materials.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(normalizedQuery);
      const descriptionMatch = item.description?.toLowerCase().includes(normalizedQuery);
      return normalizedQuery ? nameMatch || descriptionMatch : true;
    });

    return [...result].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name, "pt-BR");
      return sort === "az" ? comparison : -comparison;
    });
  }, [materials, query, sort]);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(100,100,255,0.06),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,100,200,0.06),transparent_50%)]"></div>
      </div>

      <div className="relative z-10">
        <PageHeader onBack={() => router.push("/dashboard/material-apoio")} />

        <main className="max-w-6xl mx-auto px-4 sm:px-5 md:px-6 py-4 sm:py-6 md:py-10">
          <NoticeBanner />

          <Toolbar
            total={materials.length}
            results={filteredMaterials.length}
            query={query}
            sort={sort}
            onQueryChange={setQuery}
            onSortChange={setSort}
          />

          <div className="mt-4 sm:mt-5 md:mt-6 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_40px_rgba(0,0,0,0.4)]">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white/[0.03] border-b border-white/5 text-[10px] sm:text-xs font-semibold text-white/50 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
              <div className="col-span-12 md:col-span-6">Arquivo</div>
              <div className="hidden md:block md:col-span-4">Descrição</div>
              <div className="hidden md:block md:col-span-2 text-right">Ação</div>
            </div>

            {filteredMaterials.map((doc, index) => (
              <FileRow key={doc.id} doc={doc} isLast={index === filteredMaterials.length - 1} />
            ))}
          </div>

          {materials.length === 0 && (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-white/10 mx-auto mb-4" />
              <p className="text-white/40">Nenhum material de texto disponível no momento.</p>
            </div>
          )}

          {materials.length > 0 && filteredMaterials.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-white/10 mx-auto mb-3" />
              <p className="text-white/50 text-sm">Nenhum arquivo encontrado para essa busca.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
