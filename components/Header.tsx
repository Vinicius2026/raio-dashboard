"use client";

import { motion } from "framer-motion";
import { User, Menu, X, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - mesma estrutura do dashboard */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-9 h-9 bg-white flex items-center justify-center rounded-lg group-hover:rotate-6 transition-transform">
                <LayoutDashboard className="w-5 h-5 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none text-vda-white">VDA</span>
                <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Premium Hub</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-5 py-2 rounded-full transition-all border border-white/10 hover:border-white/20 hover:bg-white/5"
            >
              <span className="text-sm font-medium">Suporte</span>
            </motion.button>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-5 py-2 rounded-full transition-all border border-white/10 hover:border-white/20 hover:bg-white/5"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Login</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-vda-white rounded-lg hover:bg-white/5"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-white/5 space-y-2"
          >
            <motion.button
              onClick={() => setIsMenuOpen(false)}
              whileHover={{ x: 5 }}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-all text-left"
            >
              <span className="font-medium">Suporte</span>
            </motion.button>
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-all"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Login</span>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
