/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium dark theme colors
        primary: {
          DEFAULT: '#3B82F6', // Blue for primary actions
          dark: '#2563EB',
          light: '#60A5FA',
        },
        secondary: {
          DEFAULT: '#10B981', // Green for secondary actions
          dark: '#059669',
          light: '#34D399',
        },
        accent: {
          DEFAULT: '#F59E0B', // Orange/gold for accents
          dark: '#D97706',
          light: '#FBBF24',
        },
        dark: {
          DEFAULT: '#111827', // Main background
          lighter: '#1F2937', // Cards, sidebars
          lightest: '#374151', // Elevated components
        },
        light: {
          DEFAULT: '#F9FAFB', // Light text
          darker: '#E5E7EB', // Secondary text
          darkest: '#9CA3AF', // Muted text
        },
        // Cricket specific colors
        pitch: {
          DEFAULT: '#15803D', // Cricket pitch green
          light: '#22C55E',
        },
        boundary: {
          DEFAULT: '#EF4444', // Red for boundaries
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      height: {
        'header': '60px',
      },
      spacing: {
        'header': '60px', // Adjust this value to match your header height
      },
      keyframes: {
        // Add other keyframes you have
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
      },
      animation: {
        // Add other animations you have
        'fade-in': 'fade-in 0.2s ease-out forwards',
        'scale-in': 'scale-in 0.2s ease-out forwards',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add this for markdown styling
  ],
  darkMode: 'class', // Enable dark mode with class
}