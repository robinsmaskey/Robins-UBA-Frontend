/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/TS/JSX/TSX files in src
    "./public/index.html", // Include your HTML file if needed
    "./src/index.css"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          dark: '#1d4ed8' // blue-700
        },
        danger: {
          DEFAULT: '#dc2626', // red-600
          dark: '#b91c1c' // red-700
        }
      },
      spacing: {
        '128': '32rem' // Add custom spacing if needed
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Optional: for better form styling
  ],
}