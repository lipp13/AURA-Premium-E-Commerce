/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#090909',
          card: '#121212',
          surface: '#18181b',
          border: '#27272a',
          hover: '#202023',
        },
        light: {
          bg: '#FFFFFF',
          card: '#FBFBFB',
          surface: '#F4F4F5',
          border: '#E4E4E7',
          hover: '#F0F0F3',
        },
        apple: {
          dark: '#090909',
          gray: '#86868b',
          lightgray: '#f5f5f7',
          border: 'rgba(255, 255, 255, 0.1)',
          blue: '#0071e3',
          blueHover: '#0077ed',
          green: '#10b981',
          red: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'apple-sm': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'apple-md': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'apple-lg': '0 16px 40px rgba(0, 0, 0, 0.12)',
        'dark-sm': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'dark-md': '0 8px 24px rgba(0, 0, 0, 0.5)',
        'dark-lg': '0 16px 40px rgba(0, 0, 0, 0.6)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.75 },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
