// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or false
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'), // Optional, but helpful for form styling
    // require('@tailwindcss/aspect-ratio'), // Optional
    // require('@tailwindcss/typography'), // Optional
  ],
}