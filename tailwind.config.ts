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
        accbcf: {
          blue: '#0064B4',
          'blue-dark': '#004B87',
          'blue-deep': '#002E54',
          gold: '#F0B428',
          'gold-light': '#FCEFC7',
          'gold-dark': '#C99115',
          red: '#DC0000',
          orange: '#F07828',
          yellow: '#F0DC50',
          charcoal: '#1A1A1A',
          gray: '#6B7280',
          'gray-light': '#E5E7EB',
          light: '#F7F8FA',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Merriweather', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Source Sans 3', 'system-ui', 'sans-serif'],
        chinese: ['var(--font-noto-sc)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
export default config
