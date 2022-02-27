module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      keyframes: {
        "appear": {
          "0%": {opacity: 0},
          "100%": {opacity: 1},
        } 
      },
      animation: {
        "appear": "appear 0.3s linear 1",
      }
    },
  },
  plugins: [],
}
