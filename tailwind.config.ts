import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'vda-black': '#030303',
        'vda-dark': '#0A0A0A',
        'vda-gray': '#1A1A1A',
        'vda-light-gray': '#9CA3AF',
        'vda-white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.6s ease-out',
        'zoom-in': 'zoom-in 0.5s ease-out',
        'in': 'in 0.5s ease-out',
        'float-slow': 'float-slow 25s ease-in-out infinite',
        'float-reverse': 'float-reverse 20s ease-in-out infinite',
        'float-diagonal': 'float-diagonal 30s ease-in-out infinite',
        'float-slow-reverse': 'float-slow-reverse 28s ease-in-out infinite',
        'float-horizontal': 'float-horizontal 22s ease-in-out infinite',
        'float-vertical': 'float-vertical 26s ease-in-out infinite',
        'float-diagonal-reverse': 'float-diagonal-reverse 24s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 15s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-25px) rotate(1deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2)',
            filter: 'brightness(1)',
          },
          '50%': { 
            boxShadow: '0 0 50px rgba(255, 255, 255, 0.6), 0 0 100px rgba(255, 255, 255, 0.3)',
            filter: 'brightness(1.2)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-from-bottom': {
          '0%': { transform: 'translateY(1rem)' },
          '100%': { transform: 'translateY(0)' },
        },
        'zoom-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'in': {
          '0%': { opacity: '0', transform: 'translateY(1rem) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'float-slow': {
          '0%, 100%': { 
            transform: 'translate(0px, 0px) scale(1)',
            opacity: '0.2'
          },
          '33%': { 
            transform: 'translate(30px, -50px) scale(1.1)',
            opacity: '0.25'
          },
          '66%': { 
            transform: 'translate(-20px, -30px) scale(0.95)',
            opacity: '0.18'
          },
        },
        'float-reverse': {
          '0%, 100%': { 
            transform: 'translate(0px, 0px) scale(1)',
            opacity: '0.15'
          },
          '33%': { 
            transform: 'translate(-40px, 40px) scale(1.15)',
            opacity: '0.2'
          },
          '66%': { 
            transform: 'translate(25px, 20px) scale(0.9)',
            opacity: '0.12'
          },
        },
        'float-diagonal': {
          '0%, 100%': { 
            transform: 'translate(0px, 0px) rotate(0deg)',
            opacity: '0.25'
          },
          '50%': { 
            transform: 'translate(-60px, 60px) rotate(5deg)',
            opacity: '0.3'
          },
        },
        'float-slow-reverse': {
          '0%, 100%': { 
            transform: 'translate(0px, 0px) scale(1)',
            opacity: '0.2'
          },
          '50%': { 
            transform: 'translate(50px, -40px) scale(1.2)',
            opacity: '0.25'
          },
        },
        'float-horizontal': {
          '0%, 100%': { 
            transform: 'translateX(0px) scale(1)',
            opacity: '0.18'
          },
          '50%': { 
            transform: 'translateX(80px) scale(1.1)',
            opacity: '0.22'
          },
        },
        'float-vertical': {
          '0%, 100%': { 
            transform: 'translateY(0px) scale(1)',
            opacity: '0.12'
          },
          '50%': { 
            transform: 'translateY(-70px) scale(1.15)',
            opacity: '0.16'
          },
        },
        'float-diagonal-reverse': {
          '0%, 100%': { 
            transform: 'translate(0px, 0px) rotate(0deg)',
            opacity: '0.15'
          },
          '50%': { 
            transform: 'translate(60px, -50px) rotate(-3deg)',
            opacity: '0.2'
          },
        },
        'pulse-slow': {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: '0.15'
          },
          '50%': { 
            transform: 'scale(1.3)',
            opacity: '0.25'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      blur: {
        '4xl': '120px',
      },
    },
  },
  plugins: [],
};
export default config;
