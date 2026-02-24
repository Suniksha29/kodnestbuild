/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // KodNest Premium Design System Colors
        primary: '#0052CC',      // Deep Blue (Accent)
        'primary-light': '#0066FF',
        'primary-dark': '#003D82',
        background: '#F7F6F3',   // Off-white
        accent: '#0052CC',       // Deep Blue
        success: '#2D5016',      // Muted Green
        warning: '#8B7500',      // Muted Amber
        border: '#E8E7E4',       // Subtle Border
        surface: '#FFFFFF',      // White
        text: {
          primary: '#111111',    // Dark Text
          secondary: '#5A5A5A',  // Muted Text
        },
      },
      fontFamily: {
        serif: ['"Georgia"', '"Garamond"', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'sans-serif'],
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '40px',
        'xl': '64px',
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'md': '18px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '40px',
        '3xl': '48px',
      },
      lineHeight: {
        tight: '1.4',
        base: '1.6',
        relaxed: '1.8',
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'sm': '0 2px 4px rgba(0, 0, 0, 0.08)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'subtle': '0 0 0 1px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}

