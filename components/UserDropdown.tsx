"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User, Lock, LogOut } from "lucide-react";

interface UserDropdownProps {
  email: string;
  onChangePassword: () => void;
  onLogout: () => void;
}

export default function UserDropdown({ email, onChangePassword, onLogout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const menuItems = [
    {
      label: "Alterar Senha",
      icon: Lock,
      onClick: () => {
        onChangePassword();
        setIsOpen(false);
      },
    },
    {
      label: "Sair",
      icon: LogOut,
      onClick: () => {
        onLogout();
        setIsOpen(false);
      },
      danger: true,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all group"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10">
          <User className="w-4 h-4 text-vda-light-gray" />
        </div>

        {/* Email (hidden on mobile) */}
        <span className="text-sm text-vda-light-gray hidden sm:block max-w-[150px] truncate">
          {email}
        </span>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-vda-light-gray" />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 glassmorphism-strong rounded-xl border border-white/10 overflow-hidden shadow-2xl z-[100]"
            style={{ 
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(10, 10, 10, 0.95)'
            }}
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-xs text-vda-light-gray/70 mb-1">Conectado como</p>
              <p className="text-sm text-vda-white font-semibold truncate">{email}</p>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full px-4 py-3 flex items-center gap-3 transition-all ${
                    item.danger
                      ? "hover:bg-red-500/10 text-red-400 hover:text-red-300 border-t border-white/5"
                      : "hover:bg-white/5 text-vda-light-gray hover:text-vda-white"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.danger ? "bg-red-500/10" : "bg-white/5"
                  }`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
