module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    fontFamily: {
      "header": ["Patua One"],
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
          "0%": {top: 20, opacity: 0},
          "100%": {top: 0, opacity: 1},
        },
        "rotateOpen": { 
          "0%": {transform: "rotate(0deg)"},
          "100%": {transform: "rotate(-90deg)"},
        }, 
        "rotateClose": { 
          "0%": {transform: "rotate(-90deg)"},
          "100%": {transform: "rotate(0deg)"},
        }
      },
      animation: {
        "appear": "appear 0.3s linear 1",
        "welcomeFadeOut": "fadeOut 0.2s linear 1",
        "welcomeFadeIn": "fadeIn 0.2s linear 1",
        "statsFadeIn": "fadeIn 0.2s linear 1",
        "statsFadeOut": "fadeOut 0.2s linear 1",
        "rotateOpen": "rotateOpen 0.1s linear 1 forwards",
        "rotateClose": "rotateClose 0.1s linear 1 forwards",
      }
    },
  },
  plugins: [],
}
