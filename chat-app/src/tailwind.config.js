// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable dark mode support
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: '#00bcd4',
        sky: '#e0f7fa',
        glass: 'rgba(85, 74, 74, 0.2)',
      },
      boxShadow: {
        glow: '0 0 15px rgba(0, 191, 255, 0.6)',
      },
      backdropBlur: {
        md: '12px',
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out"
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        
      }
    },
  },
  plugins: [],
}