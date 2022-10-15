/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        wiggle: {
          "0%, 40%, 80%": {
            transform: "translateX(0.25rem)",
            color: "rgb(239 68 68)",
            borderColor: "rgb(239 68 68)",
          },
          "20%, 60%, 100%": {
            transform: "translateX(-0.25rem)",
            color: "rgb(239 68 68)",
            borderColor: "rgb(239 68 68)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 300ms ease-in-out ",
      },
    },
  },
  plugins: [],
};
