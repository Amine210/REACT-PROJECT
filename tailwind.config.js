// tailwind.config.js

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Define the files Tailwind should scan for classes
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}, // Extend or override default theme values
  },
  variants: {
    extend: {}, // Extend or override default variants
  },
  plugins: [], // Add any custom plugins
}
