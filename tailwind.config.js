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
        'pirate-orange': {
          DEFAULT: '#ff6700',
          shadow: '#c44e00',
          light: '#ff8533',
        },
        'pirate-green': {
          DEFAULT: '#1b4332',
          shadow: '#081c15',
          light: '#2d6a4f',
        },
        'yonko-red': {
          DEFAULT: '#c8102e',
          shadow: '#820516',
          light: '#ef233c',
        },
        'yonko-purple': {
          DEFAULT: '#2c1b4d',
          shadow: '#1a0e30',
          light: '#4c337a',
        },
        'scroll-beige': {
          DEFAULT: '#f4ebd0',
          dark: '#e3d5ca',
        },
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
        coc: ['Shojumaru', 'Permanent Marker', 'Supercell-Magic', 'sans-serif'],
        display: ['Shojumaru', 'Permanent Marker', 'Supercell-Magic', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float-char': 'floatChar 4s ease-in-out infinite',
        'float-reverse': 'floatCharReverse 5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
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
