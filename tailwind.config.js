/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        'nun': ['Nunito','Sans-serif'],
        'pops': ['Poppins','Sans-serif'],
        'sans': ['Open Sans','Sans-serif'],
      },
    },
  },
  plugins: [],
}