/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gold-coin': {
          DEFAULT: '#ffd700',
          shadow: '#d4a017',
          light: '#fbee90',
        },
        'elixir-pink': {
          DEFAULT: '#ee3a8c',
          shadow: '#a31d58',
          light: '#f587b7',
        },
        'dark-elixir': {
          DEFAULT: '#a855f7',
          bg: '#120a2a',
          dark: '#0b041a',
        },
        'clash-bronze': '#b8860b',
        'clash-wood': '#8b6914',
      },
      fontFamily: {
        coc: ['Supercell-Magic', 'sans-serif'],
        display: ['Supercell-Magic', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float-char': 'floatChar 4s ease-in-out infinite',
        'float-reverse': 'floatCharReverse 5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        floatChar: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatCharReverse: {
          '0%, 100%': { transform: 'translateY(0) scaleX(-1)' },
          '50%': { transform: 'translateY(-15px) scaleX(-1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 0.5, scale: 1 },
          '50%': { opacity: 0.8, scale: 1.05 },
        }
      }
    },
  },
  plugins: [],
}
