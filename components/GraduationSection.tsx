"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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

const GraduationSection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-black/50">
      {/* Background ambient glow */}
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

        {/* Graduation Levels Grid */}
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
                {/* Light Aura Effect Behind Image */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#D4AF37]/[0.08] rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-glow" />
                
                {/* Image Container */}
                <div className="relative w-40 h-40 mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  {/* Subtle persistent glow */}
                  <div className="absolute inset-0 rounded-full bg-[#D4AF37]/[0.03] blur-2xl animate-pulse-slow" />
                  
                  <Image
                    src={level.image}
                    alt={level.name}
                    width={200}
                    height={200}
                    className="object-contain relative z-10 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Level Info */}
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

                {/* Bottom line accent */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent group-hover:w-1/2 transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Text */}
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
              "Imagine crescer enquanto fatura, vendendo todos os dias pelo WhatsApp. Conforme seu desempenho evolui, seu círculo de apoio e oportunidades se transforma junto com você."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(GraduationSection);
