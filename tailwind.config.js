/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean-blue': '#4A90E2',
        'light-ocean': '#87CEEB',
      },
    },
  },
  plugins: [],
} 