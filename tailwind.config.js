/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        link: "#3C8DFF",
        primary: "#292929"
      },
      fontFamily: {
        karla: ["Karla", "sans-serif"],
        "kumbh-sans": ["Kumbh Sans", "sans-serif"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      gridTemplateColumns: {
        profile: "repeat(2, auto)"
      },
      keyframes: {
        ripple: {
          "0%": {
            transform: "scale(0.5)",
            opacity: "0"
          },
          "25%": {
            opacity: "1"
          },
          "100%": {
            transform: "scale(2.5)",
            opacity: "0"
          }
        }

        // slideInFadeOut: {
        //   "0%": { transform: "translateX(100%)", opacity: "0" },
        //   "10%": { transform: "translateX(0)", opacity: "1" },
        //   "90%": { opacity: "1" },
        //   "100%": { transform: "translateX(100%)", opacity: "0" }
        // }
      },

      animation: {
        ripple: "ripple 2s infinite"

        // slideInFadeOut: "slideInFadeOut 3s ease-in-out"
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".before-element": {
          content: '""',
          display: "block",
          position: "absolute",
          width: "100%",
          height: "100%",
          "border-radius": "50%",
          border: "2px solid ",
          opacity: "0"
        },
        ".after-element": {
          content: '""',
          display: "block",
          position: "absolute",
          width: "100%",
          height: "100%",
          "border-radius": "50%",
          border: "2px solid",
          opacity: "0"
        }
      };

      addUtilities(newUtilities, ["before", "after"]);
    }
  ]
};
