// tailwind.config.js
module.exports = {
  darkMode: 'class', // ✅ Enable dark mode with class strategy
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",  // ✅ React files
    "./public/index.html"               // ✅ Main HTML file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
