/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        police: {
          navy: '#0A192F',
          dark: '#050D1A',
          card: '#0F2444',
          accent: '#1B3B6F',
          blue: '#1E40AF',
          lightBlue: '#3B82F6',
          sky: '#60A5FA',
          red: '#DC2626',
          crimson: '#991B1B',
          gold: '#F59E0B',
          emerald: '#10B981',
          silver: '#E2E8F0',
          muted: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
