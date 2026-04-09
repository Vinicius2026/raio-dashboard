"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
  onClick?: () => void;
  gradient?: string;
  className?: string;
}

export default function Card({
  title,
  description,
  icon: Icon,
  children,
  onClick,
  gradient,
  className = "",
}: CardProps) {
  const isClickable = !!onClick;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={isClickable ? { scale: 1.02 } : {}}
      whileTap={isClickable ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        glassmorphism rounded-2xl p-6 relative overflow-hidden
        ${isClickable ? "cursor-pointer group" : ""}
        ${className}
      `}
    >
      {/* Gradient Background on Hover */}
      {gradient && (
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />
      )}

      {/* Content */}
      <div className="relative space-y-4">
        {/* Icon + Title */}
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-vda-white" />
            </div>
          )}
          <h3 className="text-xl font-bold text-vda-white">{title}</h3>
        </div>

        {/* Description */}
        {description && (
          <p className="text-vda-light-gray text-sm">{description}</p>
        )}

        {/* Children */}
        {children}
      </div>
    </motion.div>
  );
}
