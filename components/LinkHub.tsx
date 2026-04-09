"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  CreditCard,
  MessageCircle,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

type WhiteCard = {
  title: string;
  description: string;
  url: string;
  iconBg: string;
  image?: string;
  icon?: LucideIcon | null;
};

const whiteCards: WhiteCard[] = [
  {
    title: "CONCORRA A UM iPHONE NOVO",
    description: "Sorteio 100% gratuito. Clique aqui e participe!",
    image: "/images/photo_2024-09-29_18-07-16.jpg",
    url: "#",
    iconBg: "bg-gradient-to-br from-sky-400 to-blue-600",
    icon: null,
  },
  {
    title: "ANO DOS SONHOS: R$1.000 EM COMPRAS PRA VOCÊ",
    description: "Sorteio 100% gratuito. Clique aqui e participe!",
    image: "/images/4527.jpeg",
    url: "#",
    iconBg: "bg-gradient-to-br from-orange-400 to-orange-600",
    icon: null,
  },
  {
    title: "MIL PARA CARTÃO OU COMPRAS ONLINE",
    description: "Sorteio 100% gratuito. Clique aqui e participe!",
    image: "/images/PHOTO-2024-10-16-06-56-00-1-1152x1536.jpg",
    url: "#",
    iconBg: "bg-gradient-to-br from-emerald-400 to-green-600",
    icon: null,
  },
];

const greenCards = [
  {
    title: "COMUNIDADE NO WHATSAPP 💰🎁",
    description: "Concorra a PIX e prêmios incríveis na minha comunidade 100% gratuita.",
    icon: MessageCircle,
    url: "#",
  },
  {
    title: "GRUPO DE SUPER ODD ⚽🏆",
    description: "Receba dicas para fazer um extra e concorra a prêmios no meu grupo.",
    icon: TrendingUp,
    url: "#",
  },
];

function LinkHub() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150, damping: 20 },
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="space-y-2"
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="text-center pb-1">
          <h2 className="text-xl md:text-2xl font-black text-vda-white tracking-tight">
            Prêmios pra você: 👇
          </h2>
        </motion.div>

        {/* White Cards - botões mais juntos */}
        <div className="space-y-2">
            {whiteCards.map((card) => (
              <motion.a
                key={card.title}
                href={card.url}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="block group"
              >
                  <div className="bg-white rounded-2xl p-4 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      {/* Image */}
                      <div className={`w-16 h-16 rounded-2xl ${card.iconBg} flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden relative`}>
                        {card.image && (
                          <Image
                            src={card.image}
                            alt={card.title}
                            width={64}
                            height={64}
                            className="absolute inset-0 w-full h-full object-cover rounded-2xl scale-125 object-[50%_40%]"
                          />
                        )}
                      </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] md:text-base font-extrabold text-gray-900 leading-snug mb-0.5">
                        {card.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 leading-snug">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Green Cards (WhatsApp) - botões mais juntos */}
          <div className="space-y-2">
            {greenCards.map((card) => (
              <motion.a
                key={card.title}
                href={card.url}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="block group"
              >
                <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-2xl p-4 shadow-lg shadow-green-900/30 hover:shadow-xl hover:shadow-green-800/40 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 ring-1 ring-white/30">
                      <card.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] md:text-base font-extrabold text-white leading-snug mb-0.5">
                        {card.title}
                      </h3>
                      <p className="text-xs md:text-sm text-white/90 leading-snug">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Bottom Note */}
          <motion.div variants={itemVariants} className="text-center pt-1">
            <p className="text-xs text-vda-light-gray">
              Todos os sorteios e benefícios são{" "}
              <span className="text-white font-bold">100% gratuitos</span>
            </p>
          </motion.div>
        </motion.div>
    </div>
  );
}

export default memo(LinkHub);
