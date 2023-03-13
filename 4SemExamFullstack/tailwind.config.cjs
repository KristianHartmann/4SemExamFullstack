/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#33b1e6",
        secondary: "#00f6ff",
        tertiary: "#0175a3",
        background: "#8c8c73",
        footer: "#253f4e",
        nav: "#253f4e",
      },
      fontSize: {
        "1.5xl": "1.5rem",
      },
      button: {
        primary: "bg-primary text-white font-bold py-2 px-4 rounded-full",
      },
    },
  },
  plugins: [],
};
