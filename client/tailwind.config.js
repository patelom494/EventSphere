/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          foreground: '#FFFFFF',
          hover: '#1D4ED8',
        },
        secondary: {
          DEFAULT: '#0F172A',
          foreground: '#FFFFFF',
          hover: '#1E293B',
        },
        accent: {
          DEFAULT: '#22C55E',
          foreground: '#FFFFFF',
        },
        background: '#F8FAFC',
        card: '#FFFFFF',
        text: {
          primary: '#111827',
          secondary: '#6B7280',
        },
        border: '#E2E8F0',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'card': '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
