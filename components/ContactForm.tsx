"use client";

import { memo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, User, MessageSquare } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 22 },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao enviar mensagem.");
        setIsSending(false);
        return;
      }

      setIsSending(false);
      setIsSent(true);
      setName("");
      setEmail("");
      setMessage("");

      // Reset after 5s
      setTimeout(() => setIsSent(false), 5000);
    } catch (err) {
      alert("Erro de rede. Verifique sua conexão e tente novamente.");
      setIsSending(false);
    }
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

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
            Fale Conosco
          </span>
          <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-white/15" />
        </motion.div>

        {/* Form card */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[250px] h-[150px] bg-white/[0.03] rounded-full blur-[60px] pointer-events-none" />

          {/* Title */}
          <motion.div variants={fadeUp} className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-vda-white tracking-tight mb-2">
              Entre em contato
            </h2>
            <p className="text-sm text-white/35 font-light">
              Dúvidas, sugestões ou suporte — estamos aqui.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {isSent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-4 py-8"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white mb-1">
                    Mensagem enviada!
                  </p>
                  <p className="text-sm text-white/40">
                    Responderemos o mais breve possível.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Name */}
                <motion.div variants={fadeUp}>
                  <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2 font-medium">
                    Nome
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Seu nome completo"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/80 text-sm placeholder:text-white/15 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all duration-300"
                    />
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div variants={fadeUp}>
                  <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2 font-medium">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="seu@email.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/80 text-sm placeholder:text-white/15 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all duration-300"
                    />
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div variants={fadeUp}>
                  <label className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2 font-medium">
                    Mensagem
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-white/20 pointer-events-none" />
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={4}
                      placeholder="Escreva sua mensagem..."
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/80 text-sm placeholder:text-white/15 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all duration-300 resize-none"
                    />
                  </div>
                </motion.div>

                {/* Submit button */}
                <motion.div variants={fadeUp} className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSending}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="cta-beam group relative w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.08] border border-white/20 hover:border-white/30 shadow-[0_8px_32px_rgba(255,255,255,0.06)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.12)] transition-all duration-500 disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-2xl pointer-events-none" />

                    <Send className="w-4 h-4 text-white/60 relative z-10 group-hover:text-white/80 transition-colors" />
                    <span className="relative z-10 font-bold text-sm tracking-wide text-white/70 group-hover:text-white/90 transition-colors">
                      {isSending ? "Enviando..." : "Enviar Mensagem"}
                    </span>
                  </motion.button>
                </motion.div>

                {/* Contact emails */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-wrap items-center justify-center gap-3 pt-4 text-[10px] text-white/20"
                >
                  {["sac@metodovda.com", "vendas@metodovda.com"].map(
                    (mail) => (
                      <a
                        key={mail}
                        href={`mailto:${mail}`}
                        className="hover:text-white/40 transition-colors"
                      >
                        {mail}
                      </a>
                    )
                  )}
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ContactForm);
