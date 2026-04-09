"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  ShoppingBag,
  Gauge,
  Home,
  Headphones,
  LogIn,
} from "lucide-react";

// ─── Master animation orchestration ──────────────────────────────────────────
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

// ─── Hero Component ──────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* ══════════════════════════════════════════════════════════
          LAYER 0 — Deep atmosphere / Living background
          ══════════════════════════════════════════════════════════ */}

      {/* Large breathing aurora blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm gold aurora — upper left */}
        <div className="absolute -top-[20%] -left-[15%] w-[600px] h-[600px] rounded-full bg-[#D4AF37]/[0.06] animate-breathe" />
        {/* Cool silver aurora — lower right */}
        <div
          className="absolute -bottom-[15%] -right-[10%] w-[500px] h-[500px] rounded-full bg-white/[0.04] animate-breathe"
          style={{ animationDelay: "3s" }}
        />
        {/* Central core glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 1 — Orbiting particles (3 different orbits)
          ══════════════════════════════════════════════════════════ */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* Orbit 1 — fastest, closest, brightest */}
        <div className="animate-orbit-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-[0_0_12px_4px_rgba(255,255,255,0.4)]" />
        </div>
        {/* Orbit 2 — medium */}
        <div className="animate-orbit-2">
          <div className="w-1 h-1 rounded-full bg-[#D4AF37]/50 shadow-[0_0_10px_3px_rgba(212,175,55,0.3)]" />
        </div>
        {/* Orbit 3 — slowest, farthest, softest */}
        <div className="animate-orbit-3">
          <div className="w-[3px] h-[3px] rounded-full bg-white/30 shadow-[0_0_8px_2px_rgba(255,255,255,0.2)]" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 2 — Vertical flowing lines (subtle grid lines)
          ══════════════════════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════════════════════
          LAYER 3 — Grain texture overlay
          ══════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundSize: "150px 150px",
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          CONTENT
          ══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-sm mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* ── Floating Logo Block ── */}
          <motion.div
            variants={scaleIn}
            className="mb-10 flex flex-col items-center"
          >
            {/* Floating container */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Multiple concentric glow rings */}
              <div className="absolute -inset-12 rounded-full bg-white/[0.03] blur-[80px] animate-pulse-glow" />
              <div className="absolute -inset-8 rounded-[40px] bg-[#D4AF37]/[0.04] blur-[50px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

              {/* Glass container for logo */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl px-10 py-7 md:px-14 md:py-9 border border-white/[0.12] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
              >
                {/* Aurora sweep inside the container */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent animate-aurora-sweep" />
                </div>

                {/* Inner border glow */}
                <div className="absolute inset-[1px] rounded-3xl border border-white/[0.05] pointer-events-none" />

                {/* Logo image */}
                <Image
                  src="/images/vda-logo.png"
                  alt="VDA – Venda Direta Automática"
                  width={720}
                  height={240}
                  className="relative w-[240px] md:w-[300px] h-auto drop-shadow-[0_0_50px_rgba(255,255,255,0.3)] select-none"
                  priority
                  quality={100}
                />

                {/* Corner accent dots */}
                <div className="absolute top-2 right-3 w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                <div className="absolute bottom-2 left-3 w-1 h-1 rounded-full bg-[#D4AF37]/50 animate-pulse" style={{ animationDelay: "1s" }} />
              </motion.div>
            </motion.div>

            {/* Tagline below logo */}
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

          {/* ── PRIMARY CTA: COMPRAR VDA (with border-beam) ── */}
          <motion.div variants={fadeUp} className="w-full mb-3">
            <motion.a
              href="https://pay.kiwify.com.br/WJb9F4T"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="cta-beam group relative flex items-center gap-4 w-full px-6 py-5 rounded-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.08] border border-white/20 shadow-[0_8px_40px_rgba(255,255,255,0.08)] hover:shadow-[0_16px_60px_rgba(255,255,255,0.14)] transition-all duration-500"
            >
              {/* Hover shimmer */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent rounded-2xl" />
              {/* Golden glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.08] via-transparent to-white/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {/* Icon */}
              <span className="relative z-10 flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/[0.04] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37] drop-shadow-[0_0_6px_rgba(212,175,55,0.5)]" />
              </span>

              {/* Text */}
              <span className="relative z-10 flex-1">
                <span className="block font-bold text-[15px] tracking-wide bg-gradient-to-b from-[#F0F0F0] via-white to-[#D4AF37] bg-clip-text text-transparent">
                  Comprar VDA
                </span>
                <span className="block text-[10px] text-white/30 tracking-wider mt-0.5 font-medium">
                  ACESSO IMEDIATO
                </span>
              </span>

              {/* Arrow */}
              <span className="relative z-10 text-white/25 group-hover:text-[#D4AF37]/60 transition-all duration-300 group-hover:translate-x-1 text-lg">
                →
              </span>
            </motion.a>
          </motion.div>

          {/* ── Separator ── */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 w-full py-2">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          </motion.div>

          {/* ── SECONDARY BUTTONS ── */}
          {[
            {
              href: "https://metodovda.com",
              label: "Página Inicial VDA",
              sub: "LANDING PAGE",
              icon: <Home className="w-5 h-5" />,
              external: true,
            },
            {
              href: "/dashboard",
              label: "Acessar Painel de Aluno",
              sub: "DASHBOARD",
              icon: <Gauge className="w-5 h-5" />,
              external: false,
            },
          ].map((btn) => (
            <motion.div key={btn.label} variants={fadeUp} className="w-full mb-2">
              <motion.a
                href={btn.href}
                target={btn.external ? "_blank" : undefined}
                rel={btn.external ? "noopener noreferrer" : undefined}
                whileHover={{ x: 4, borderColor: "rgba(255,255,255,0.18)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center gap-4 w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/8 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />

                <span className="relative z-10 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/8">
                  <span className="text-white/50 group-hover:text-white/80 transition-colors">
                    {btn.icon}
                  </span>
                </span>

                <span className="relative z-10 flex-1">
                  <span className="block font-semibold text-[14px] text-white/80 group-hover:text-white tracking-tight transition-colors">
                    {btn.label}
                  </span>
                  <span className="block text-[9px] text-white/20 tracking-[0.2em] mt-0.5 font-medium">
                    {btn.sub}
                  </span>
                </span>

                <span className="relative z-10 text-white/15 group-hover:text-white/40 transition-all duration-300 group-hover:translate-x-1">
                  →
                </span>
              </motion.a>
            </motion.div>
          ))}

          {/* ── Separator ── */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 w-full py-2">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/6 to-transparent" />
          </motion.div>

          {/* ── UTILITY ROW: Locked + Ghost ── */}
          {/* Ferramentas Gratuitas — LOCKED */}
          <motion.div variants={fadeUp} className="w-full mb-2">
            <div className="flex items-center gap-4 w-full px-6 py-4 rounded-2xl bg-white/[0.015] border border-white/[0.04] opacity-45 cursor-not-allowed">
              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.04]">
                <Lock className="w-4 h-4 text-white/20" />
              </span>
              <span className="flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-medium text-[13px] text-white/25 tracking-tight">
                    Ferramentas Gratuitas
                  </span>
                  <Lock className="w-3 h-3 text-white/15" />
                </span>
                <span className="block text-[9px] text-white/10 tracking-[0.15em] mt-0.5 font-medium">
                  EM BREVE
                </span>
              </span>
            </div>
          </motion.div>

          {/* Suporte + Login — compact ghost row */}
          <div className="w-full flex gap-2 mb-2">
            <motion.div variants={fadeUp} className="flex-1">
              <motion.a
                href="mailto:sac@metodovda.com"
                whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.12)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] transition-all duration-300"
              >
                <Headphones className="w-4 h-4 text-white/35" />
                <span className="text-[12px] font-medium text-white/40 tracking-tight">
                  Suporte
                </span>
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex-1">
              <Link href="/login">
                <motion.div
                  whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.12)" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2.5 w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] transition-all duration-300"
                >
                  <LogIn className="w-4 h-4 text-white/35" />
                  <span className="text-[12px] font-medium text-white/40 tracking-tight">
                    Login
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* ── Micro footer ── */}
          <motion.div variants={fadeUp} className="mt-8 text-center space-y-1.5">
            <p className="text-[9px] text-white/15 tracking-[0.25em] uppercase font-medium">
              © {new Date().getFullYear()} VDA — Todos os direitos reservados
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
  );
}

export default memo(Hero);
