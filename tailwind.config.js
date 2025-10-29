/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        acadYellowBlack: "#302711",
        acadBrown: "666666",
        acadBrony: "#4b5563",
        acadB: "#D9F5FF",
        acadBlue: "#3b82f6",
      },
    },
  },
  plugins: [],
};
