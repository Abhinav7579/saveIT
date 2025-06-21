/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple:{
          600:"#6c0ec9",
          200:"#c8acff"
        },
        grey:{
          100:"#f9fafb",
          200:"#e5e7eb",
          400:"#3f3f46"
        }
      }
    },
  },
  plugins: [],
}

