/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#05080D',
          secondary: '#0A111A',
          surface: '#101923',
          card: '#0D1520',
          hover: '#13202E',
        },
        cyan: {
          accent: '#00D9FF',
          glow: 'rgba(0, 217, 255, 0.4)',
          subtle: 'rgba(0, 217, 255, 0.12)',
        },
        blue: {
          accent: '#1687FF',
          glow: 'rgba(22, 135, 255, 0.4)',
        },
        technical: {
          border: 'rgba(0, 217, 255, 0.18)',
          grid: 'rgba(0, 217, 255, 0.06)',
          dim: '#8B9AAA',
          light: '#F5F7FA',
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 217, 255, 0.25)',
        'glow-blue': '0 0 25px rgba(22, 135, 255, 0.25)',
        'glow-cyan-lg': '0 0 50px rgba(0, 217, 255, 0.35)',
        'tech-card': '0 4px 20px -2px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0, 217, 255, 0.15)',
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
