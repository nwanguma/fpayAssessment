module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    screens: {
      xs: "450px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      white: {
        main: "#ffffff",
        off: "#fbfbfb",
        border: "#f2f2f2",
        "border-alt": "#e8e8e8",
        bg: "#f4f3f8",
        detail: "#ededed",
      },
      blue: {
        text: "#2c0c6a",
        button: "#A98CF6",
        bold: "#372271",
        tab: "#4305EB",
      },
      grey: {
        light: "#C4C5C6",
        text: "#877E9E",
        label: "#8B8F96",
        medium: "#404040",
      },
      green: {
        button: "#6FAE75",
      },
      black: {
        default: "#636166",
      },
      red: {
        error: "#F25F7C",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Sailec", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
