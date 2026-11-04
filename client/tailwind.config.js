/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'Noto Sans Tamil', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        hindi: ['Noto Sans Devanagari', 'Inter', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'Inter', 'sans-serif'],
      },
      colors: {
        surface: {
          950: '#060911',
          900: '#090D16',
          850: '#0F1626',
          800: '#141D32',
          700: '#1E293B',
          600: '#334155',
        },
      },
    },
  },
  plugins: [],
};

