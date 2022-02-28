module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    fontFamily: {
      "header": ["Calistoga"],
      "body": ["Poppins"],
    },
    extend: {
      keyframes: {
        "appear": {
          "0%": {opacity: 0},
          "100%": {opacity: 1},
        },
        "fadeOut": {
          "0%": {top: 0, opacity: 1},
          "100%": {top: 20, opacity: 0},
        },
        "fadeIn": {
          "0%": {top: 40, opacity: 0},
          "100%": {top: 0, opacity: 1},
        }
      },
      animation: {
        "appear": "appear 0.3s linear 1",
        "animateStart": "fadeOut 0.3s linear 1",
        "animateStats": "fadeIn 0.3s linear 1",
      }
    },
  },
  plugins: [],
}
