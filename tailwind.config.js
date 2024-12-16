/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        link: "#3C8DFF"
      },
      fontFamily: {
        // "kumbh-sans": ["Kumbh Sans", "sans-serif"],
        karla: ["Karla", "sans-serif"]
      }
    }
  },
  plugins: []
};
