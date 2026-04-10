"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Zap } from "lucide-react";
import { trackEvent } from "@/lib/meta-pixel";

// ─── Animation presets ───────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 22 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 18, delay: 0.1 },
  },
};

// ─── Graduation levels data ─────────────────────────────────────────────────
const levels = [
  {
    image: "/elo1234 vda/elio1.png",
    name: "Starter",
    portuguese: "Centelha",
    description: "O início da sua ignição no mercado digital.",
  },
  {
    image: "/elo1234 vda/elio2.png",
    name: "Player",
    portuguese: "Corrente",
    description: "Em movimento constante, gerando tração real.",
  },
  {
    image: "/elo1234 vda/elio3.png",
    name: "Elite",
    portuguese: "Alta Voltagem",
    description: "Alta performance e escala nos seus resultados.",
  },
  {
    image: "/elo1234 vda/elio4.png",
    name: "Legend",
    portuguese: "Meteórico",
    description: "O topo da maestria em vendas e influência.",
  },
];

// ─── Main Page Component ─────────────────────────────────────────────────────
function AulasMeteoricoPage() {
  const [isVdaOpen, setIsVdaOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen app-bg">
      {/* ════════════════════════════════════════════════════════════════════
          HERO — Logo + CTA "Entrar na Turma"
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
        {/* Living background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -left-[15%] w-[600px] h-[600px] rounded-full bg-[#D4AF37]/[0.06] animate-breathe" />
          <div
            className="absolute -bottom-[15%] -right-[10%] w-[500px] h-[500px] rounded-full bg-white/[0.04] animate-breathe"
            style={{ animationDelay: "3s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[120px]" />
        </div>

        {/* Orbiting particles */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="animate-orbit-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-[0_0_12px_4px_rgba(255,255,255,0.4)]" />
          </div>
          <div className="animate-orbit-2">
            <div className="w-1 h-1 rounded-full bg-[#D4AF37]/50 shadow-[0_0_10px_3px_rgba(212,175,55,0.3)]" />
          </div>
          <div className="animate-orbit-3">
            <div className="w-[3px] h-[3px] rounded-full bg-white/30 shadow-[0_0_8px_2px_rgba(255,255,255,0.2)]" />
          </div>
        </div>

        {/* Flowing lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          {[15, 35, 55, 75, 85].map((left, i) => (
            <div
              key={i}
              className="absolute top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent animate-line-flow"
              style={{
                left: `${left}%`,
                animationDelay: `${i * 1.6}s`,
                animationDuration: `${8 + i * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
            backgroundSize: "150px 150px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-sm mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            {/* ── Floating Logo ── */}
            <motion.div variants={scaleIn} className="mb-10 flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="absolute -inset-12 rounded-full bg-white/[0.03] blur-[80px] animate-pulse-glow" />
                <div className="absolute -inset-8 rounded-[40px] bg-[#D4AF37]/[0.04] blur-[50px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-3xl px-10 py-7 md:px-14 md:py-9 border border-white/[0.12] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
                >
                  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                    <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent animate-aurora-sweep" />
                  </div>
                  <div className="absolute inset-[1px] rounded-3xl border border-white/[0.05] pointer-events-none" />

                  <Image
                    src="/images/vda-logo.png"
                    alt="VDA – Venda Direta Automática"
                    width={720}
                    height={240}
                    className="relative w-[240px] md:w-[300px] h-auto drop-shadow-[0_0_50px_rgba(255,255,255,0.3)] select-none"
                    priority
                    quality={100}
                  />

                  <div className="absolute top-2 right-3 w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                  <div className="absolute bottom-2 left-3 w-1 h-1 rounded-full bg-[#D4AF37]/50 animate-pulse" style={{ animationDelay: "1s" }} />
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-6 text-center space-y-2">
                <p className="text-[11px] font-semibold tracking-[0.4em] uppercase text-white/30">
                  Venda Direta Automática
                </p>
                <div className="flex items-center gap-3 justify-center">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/60" />
                  <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
                </div>
              </motion.div>
            </motion.div>

            {/* ── Title: Entrar VDA Gratuito ── */}
            <motion.div variants={fadeUp} className="w-full text-center mb-4">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                Entrar{" "}
                <span className="bg-gradient-to-r from-[#D4AF37] to-white bg-clip-text text-transparent">
                  VDA Gratuito
                </span>
              </h1>
              <p className="text-xs text-white/30 mt-2 tracking-wide font-medium">
                Acesse agora as aulas gratuitas do método Meteórico
              </p>
            </motion.div>

            {/* ── PRIMARY CTA: Entrar na Turma ── */}
            <motion.div variants={fadeUp} className="w-full mb-6">
              <motion.a
                href="https://chat.whatsapp.com/HasGl6O2FvcCOJp3RxG8Pm?mode=gi_t"
                onClick={() => trackEvent("Lead", { content_name: "VDA Gratuito Meteórico" })}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="cta-beam group relative flex items-center justify-center gap-3 w-full px-8 py-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#f5d76e] to-[#D4AF37] text-black font-black text-lg md:text-xl tracking-wide shadow-[0_8px_50px_rgba(212,175,55,0.35)] hover:shadow-[0_16px_70px_rgba(212,175,55,0.55)] transition-all duration-500 overflow-hidden cursor-pointer"
              >
                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-2xl pointer-events-none" />
                
                {/* Pulsing glow behind */}
                <div className="absolute inset-0 rounded-2xl bg-[#D4AF37]/20 blur-[20px] animate-pulse-glow pointer-events-none" />

                <Zap className="relative z-10 w-6 h-6 fill-current" />
                <span className="relative z-10">Entrar na Turma</span>
                <svg className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
            </motion.div>

            {/* ── Micro footer inside hero ── */}
            <motion.div variants={fadeUp} className="mt-4 text-center space-y-1.5">
              <p className="text-[9px] text-white/15 tracking-[0.25em] uppercase font-medium">
                © {year} VDA — Todos os direitos reservados
              </p>
              <Link
                href="/politica-de-privacidade"
                className="inline-block text-[9px] text-white/10 hover:text-white/30 transition-colors underline underline-offset-2 decoration-white/[0.06]"
              >
                Política de Privacidade
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          GRADUATION SECTION
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-4 overflow-hidden bg-black/50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4AF37]/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.4em]">
                Sua Evolução
              </span>
              <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6"
            >
              Evolua seu Nível: A Jornada de{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-white bg-clip-text text-transparent">
                Crescimento na VDA
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-white/50 text-base md:text-lg font-light leading-relaxed"
            >
              Nosso sistema de acompanhamento pontua seus resultados, liberando acesso a grupos exclusivos de elite e networking de alto nível à medida que você avança.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {levels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="group relative"
              >
                <div className="relative rounded-3xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm p-6 flex flex-col items-center transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.1] hover:-translate-y-2">
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#D4AF37]/[0.08] rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-glow" />

                  <div className="relative w-40 h-40 mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 rounded-full bg-[#D4AF37]/[0.03] blur-2xl animate-pulse-slow" />
                    <Image
                      src={level.image}
                      alt={level.name}
                      width={200}
                      height={200}
                      className="object-contain relative z-10 transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="text-center relative z-10">
                    <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                      {level.name}{" "}
                      <span className="text-xs font-medium text-[#D4AF37]/70 block uppercase tracking-wider mt-1">
                        ({level.portuguese})
                      </span>
                    </h3>
                    <p className="text-sm text-white/40 leading-snug font-light mt-3">
                      {level.description}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent group-hover:w-1/2 transition-all duration-700" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-[#D4AF37]/10 blur-[60px] rounded-full" />
              <p className="relative z-10 max-w-2xl mx-auto px-6 py-4 rounded-2xl border border-white/[0.03] bg-white/[0.01] text-white/60 text-sm md:text-base italic leading-relaxed">
                &ldquo;Imagine crescer enquanto fatura, vendendo todos os dias pelo WhatsApp. Conforme seu desempenho evolui, seu círculo de apoio e oportunidades se transforma junto com você.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ABOUT SECTION — Quem é o Thiago + O que é a VDA
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#D4AF37]/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-lg mx-auto relative z-10">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-white/15" />
            <span className="text-[9px] font-bold text-white/25 uppercase tracking-[0.35em]">
              Sobre o Fundador
            </span>
            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-white/15" />
          </motion.div>

          {/* Card */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 overflow-hidden"
          >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[#D4AF37]/[0.05] rounded-full blur-[80px] pointer-events-none" />

            {/* Profile photo */}
            <motion.div variants={fadeUp} className="flex flex-col items-center mb-8">
              <div className="relative w-36 h-36 md:w-44 md:h-44 mb-4">
                <div className="absolute inset-0 -m-4 rounded-full bg-[#D4AF37]/[0.08] blur-[40px] animate-pulse-glow" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
                  <Image
                    src="/images/thiago-vda.webp"
                    alt="Thiago Lima — Fundador VDA"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 144px, 176px"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>
              </div>
              <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-medium">
                Thiago Lima · Fundador VDA
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl font-black text-center text-vda-white tracking-tight leading-tight mb-6"
            >
              Quem é o{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-white bg-clip-text text-transparent">
                Thiago da VDA
              </span>
            </motion.h2>

            {/* Bio */}
            <motion.div
              variants={fadeUp}
              className="space-y-4 text-sm text-white/50 leading-relaxed font-light text-center"
            >
              <p>
                Especialista em vendas digitais pelo WhatsApp, Thiago Lima
                construiu o método <strong className="text-white/70 font-medium">VDA – Venda Direta Automática</strong>{" "}
                a partir de sua própria experiência no campo.
              </p>
              <p>
                Uma trajetória real, construída no dia a dia e na vivência do digital.
                Múltiplos 7 dígitos faturados. Especialista em monetização de redes sociais.
                Hoje sua dedicação está nas ações sociais que realiza e no método VDA,
                que ensina a vender produtos selecionados diretamente pelo WhatsApp.
              </p>
            </motion.div>

            {/* O que é a VDA? — Collapsible */}
            <motion.div
              variants={fadeUp}
              className="mt-10 pt-8 border-t border-white/[0.06]"
            >
              <button
                onClick={() => setIsVdaOpen(!isVdaOpen)}
                className="w-full group flex flex-col items-center justify-center cursor-pointer rounded-2xl px-4 py-6 -mx-4 hover:bg-white/[0.03] transition-all duration-500"
              >
                <h3 className="text-2xl md:text-3xl font-black text-vda-white tracking-tight leading-tight mb-4 text-center">
                  O que é a{" "}
                  <span className="bg-gradient-to-r from-[#D4AF37] to-white bg-clip-text text-transparent">
                    VDA
                  </span>
                  ?
                </h3>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-medium group-hover:text-white/40 transition-colors">
                    {isVdaOpen ? "Fechar" : "Saiba mais"}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-white/10 group-hover:border-white/25 flex items-center justify-center transition-all duration-500 group-hover:bg-white/[0.05] ${isVdaOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isVdaOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, scale: 0.98 }}
                    animate={{ height: "auto", opacity: 1, scale: 1 }}
                    exit={{ height: 0, opacity: 0, scale: 0.98 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      opacity: { duration: 0.3 },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 text-sm text-white/50 leading-relaxed font-light text-center pt-5 pb-2">
                      <p>
                        Na <strong className="text-white/70 font-medium">VDA — Venda Direta Automática</strong>,
                        ensinamos como vender diariamente pelo WhatsApp. Temos os produtos
                        selecionados, sabemos atrair clientes interessados e realizamos
                        a venda de forma manual e automática.
                      </p>
                      <p>
                        Essa modalidade é uma das de maior acerto, pois o contato com
                        o cliente é imediato. Estude com uma das maiores companhias
                        de venda direta via WhatsApp no Brasil.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STICKY BOTTOM CTA — Always visible
          ════════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pointer-events-none">
        <div className="max-w-sm mx-auto pointer-events-auto">
          <motion.a
            href="https://chat.whatsapp.com/HasGl6O2FvcCOJp3RxG8Pm?mode=gi_t"
            onClick={() => trackEvent("Lead", { content_name: "VDA Gratuito Meteórico" })}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex items-center justify-center gap-3 w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#f5d76e] to-[#D4AF37] text-black font-black text-base tracking-wide shadow-[0_8px_50px_rgba(212,175,55,0.4)] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-2xl pointer-events-none" />
            <Zap className="relative z-10 w-5 h-5 fill-current" />
            <span className="relative z-10">Entrar na Turma</span>
          </motion.a>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER — Minimal
          ════════════════════════════════════════════════════════════════════ */}
      <footer className="relative py-8 px-4 border-t border-white/5 overflow-hidden pb-24">
        <div className="absolute inset-0 bg-gradient-to-t from-vda-dark/50 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="text-center space-y-3"
          >
            <p className="text-sm text-vda-light-gray">
              © {year} VDA – Venda Direta Automática. Todos os direitos reservados.
            </p>

            <div className="flex items-center justify-center gap-4 text-xs text-vda-light-gray/70">
              <Link
                href="/politica-de-privacidade"
                className="hover:text-white transition-colors underline underline-offset-2 decoration-white/20 hover:decoration-white/60"
              >
                Política de Privacidade
              </Link>
            </div>

            <p className="text-[10px] text-vda-light-gray/30 max-w-2xl mx-auto leading-relaxed">
              Este site não faz parte dos websites da Meta, do Facebook ou Instagram, nem possui qualquer endosso dessas plataformas. Todo o conteúdo deste site é de responsabilidade exclusiva dos representantes do metodovda.com.
            </p>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}

export default memo(AulasMeteoricoPage);
