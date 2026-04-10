"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 22 },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

function AboutSection() {
  const [isVdaOpen, setIsVdaOpen] = useState(false);

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background accent glow */}
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
          {/* Inner glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[#D4AF37]/[0.05] rounded-full blur-[80px] pointer-events-none" />

          {/* Profile photo */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center mb-8"
          >
            <div className="relative w-36 h-36 md:w-44 md:h-44 mb-4">
              {/* Glow behind photo */}
              <div className="absolute inset-0 -m-4 rounded-full bg-[#D4AF37]/[0.08] blur-[40px] animate-pulse-glow" />
              {/* Photo with gradient fade at bottom */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
                <Image
                  src="/images/thiago-vda.webp"
                  alt="Thiago Lima — Fundador VDA"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 144px, 176px"
                  loading="lazy"
                />
                {/* Bottom gradient fade */}
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

          {/* Bio text */}
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
                    ease: [0.16, 1, 0.3, 1], // Custom exponential out ease
                    opacity: { duration: 0.3 }
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
                    <p className="text-white/60 font-medium">
                      Clique em comprar ou tire suas dúvidas com o suporte.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* CTA Button — Comprar Acesso VDA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 22 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://metodovda.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#f5d76e] to-[#D4AF37] text-black font-black text-base md:text-lg tracking-wide shadow-[0_8px_40px_rgba(212,175,55,0.25)] hover:shadow-[0_12px_50px_rgba(212,175,55,0.4)] transition-all duration-500 hover:scale-[1.03] active:scale-[0.97] overflow-hidden"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl pointer-events-none" />
            <span className="relative z-10">Comprar Acesso VDA</span>
            <svg className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(AboutSection);
