"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  isLoading?: boolean;
}

const variants = {
  primary: "bg-vda-white text-vda-black hover:bg-gray-200 font-semibold",
  secondary: "bg-vda-gray text-vda-white hover:bg-vda-light-gray",
  outline: "bg-transparent border-2 border-vda-white text-vda-white hover:bg-white/10",
  ghost: "bg-transparent text-vda-white hover:bg-white/5",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = "rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = variants[variant];
  const sizeClasses = sizes[size];
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}

      {/* Left Icon */}
      {!isLoading && Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}

      {/* Content */}
      {!isLoading && children}

      {/* Right Icon */}
      {!isLoading && Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
    </motion.button>
  );
}
