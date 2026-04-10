"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-8 px-4 border-t border-white/5 overflow-hidden">
      {/* Background gradient */}
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
            <span aria-hidden="true">·</span>
            <a
              href="mailto:sac@metodovda.com"
              className="hover:text-white transition-colors"
            >
              sac@metodovda.com
            </a>
          </div>

          <p className="text-[10px] text-vda-light-gray/30 max-w-2xl mx-auto leading-relaxed">
            Este site não faz parte dos websites da Meta, do Facebook ou Instagram, nem possui qualquer endosso dessas plataformas. Todo o conteúdo deste site é de responsabilidade exclusiva dos representantes do metodovda.com.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default memo(Footer);
