import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        red: { DEFAULT: '#C41E3A', dark: '#9B1B30', light: '#E8354F' },
        cream: '#FAF8F5',
        offWhite: '#F5F3F0',
        charcoal: '#2C2C2C',
        brand: { black: '#1A1A1A' },
        gold: '#B8860B',
        green: '#2D7A3A',
        border: { DEFAULT: '#E5E2DD', light: '#F0EDE8' },
        text: { DEFAULT: '#2A2A2A', light: '#666666', muted: '#999999' },
      },
      fontFamily: {
        display: ['var(--font-bebas-neue)', 'sans-serif'],
        nav: ['var(--font-oswald)', 'sans-serif'],
        body: ['var(--font-bitter)', 'Georgia', 'serif'],
        handwritten: ['var(--font-caveat)', 'cursive'],
      },
      boxShadow: {
        DEFAULT: '0 2px 12px rgba(0,0,0,0.08)',
        lg: '0 8px 30px rgba(0,0,0,0.12)',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '201': '201',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(25px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        'fade-up': 'fadeUp 1s ease-out forwards',
        'pulse-dot': 'pulse 1.5s infinite',
      },
    },
  },
  plugins: [],
}

export default config
