/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nbb: {
          red: "#c20e1a",
          dark: "#1a1a1a"
        }
      }
    },
  },
  plugins: [],
};
