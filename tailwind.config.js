/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // African-Inspired Theme Palette
        primary: {
          50: '#fefbf0',
          100: '#fef5d9',
          200: '#fde9b3',
          300: '#fcd983',
          400: '#fbc451',
          500: '#FDB833', // Kente Gold
          600: '#e6a42e',
          700: '#cc9129',
          800: '#b37e24',
          900: '#996b1f',
        },
        secondary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#D9381E', // Maasai Red
          600: '#c3321b',
          700: '#ad2c18',
          800: '#972615',
          900: '#812012',
        },
        earth: {
          50: '#f7f3f0',
          100: '#ede5dd',
          200: '#dbc8b8',
          300: '#c9ab93',
          400: '#b78e6e',
          500: '#5C3A21', // Warm Earth Brown
          600: '#53341e',
          700: '#4a2e1b',
          800: '#412818',
          900: '#382215',
        },
        sandstone: {
          50: '#ffffff',
          100: '#fffef9',
          200: '#fffcf2',
          300: '#fffaeb',
          400: '#fff6e1',
          500: '#FFF2D8', // Sandstone Beige
          600: '#e6dac2',
          700: '#ccc2ac',
          800: '#b3aa96',
          900: '#999280',
        },
        charcoal: {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#808080',
          500: '#4d4d4d',
          600: '#404040',
          700: '#333333',
          800: '#262626',
          900: '#1C1C1C', // Charcoal Black
        },
        savanna: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#9cd89c',
          400: '#7ccb7c',
          500: '#4CAF50', // Savanna Green
          600: '#449e48',
          700: '#3c8d40',
          800: '#347c38',
          900: '#2c6b30',
        },
        baobab: {
          50: '#e6f3ff',
          100: '#cce7ff',
          200: '#99cfff',
          300: '#66b7ff',
          400: '#339fff',
          500: '#0077B6', // Baobab Blue
          600: '#006ba4',
          700: '#005f92',
          800: '#005380',
          900: '#00476e',
        },
        // Keep neutral for flexibility
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        'header-brown': '#b78e6e', // Light brown for headers
        'brand-bg': '#8C1C13', // Brand background color
      },
      fontFamily: {
        'header': ['Montserrat', 'sans-serif'], // For headers and subheaders
        'serif': ['Cormorant Garamond', 'serif'],
        'sans': ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'knit': 'knit 2s ease-in-out infinite',
        'stitch': 'stitch 0.8s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        knit: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
        stitch: {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      backgroundImage: {
        'african-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FDB833\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'kente-pattern': "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23D9381E\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M0 0h20v20H0V0zm20 20h20v20H20V20z\"/%3E%3C/g%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
};