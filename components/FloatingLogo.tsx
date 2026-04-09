"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function FloatingLogo() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, -40]);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div style={{ y: parallaxY }} className="inline-block">
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Outer glow - equilibrado */}
          <div className="absolute -inset-6 bg-white/6 rounded-[40px] blur-3xl" />
          <div className="absolute -inset-8 bg-white/3 rounded-[48px] blur-[60px]" />
          
          {/* Logo container - apenas borda, sem fundo - padding reduzido */}
          <div className="relative rounded-3xl px-8 py-6 md:px-12 md:py-8 border border-white/15">
            
            <motion.div
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="relative select-none flex items-center justify-center"
            >
              {!imageError ? (
                <Image
                  src="/images/vda-logo.png"
                  alt="VDA - Venda Direta Automática"
                  width={720}
                  height={240}
                  className="w-[280px] md:w-[360px] h-auto drop-shadow-[0_0_40px_rgba(255,255,255,0.35)]"
                  priority
                  quality={100}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                  VDA
                </div>
              )}
            </motion.div>
          </div>

          {/* Accent dots - proporcionais */}
          <motion.div
            animate={{ 
              opacity: [0.3, 0.75, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white/65 rounded-full blur-[0.5px]"
          />
          <motion.div
            animate={{ 
              opacity: [0.25, 0.65, 0.25],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            className="absolute -bottom-1.5 -left-1.5 w-2 h-2 bg-white/55 rounded-full blur-[0.5px]"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
