/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#DF1827",
      gray: "rgb(102, 102, 102)",
      darkGray: "rgb(51, 51, 51)",
      textBlack: "#000",
      borderGray: "rgb(204, 204, 204)",
      backgroundGray: "#f5f5f5",
      white: "#fff",
      green:'rgb(85, 204, 68)'
    },
    extend: {},
  },
  plugins: [],
};
