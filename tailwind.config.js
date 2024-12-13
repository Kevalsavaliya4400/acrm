/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'app-bg': '#F5F7FA',
        'glass': 'rgba(255, 255, 255, 0.8)',
        'glass-darker': 'rgba(255, 255, 255, 0.95)',
        'glass-border': 'rgba(255, 255, 255, 0.18)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.05)',
        'float': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'scale-up': {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        'fade-up': 'fade-up 0.5s ease-out',
        'scale-up': 'scale-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};