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
      custom: {
        bg: {
          light: "#FBFBFB",
          grey: "#F2F2F2",
          white: "#ffffff",
          border: "#E8E8E8",
          input: "#F4F3F8",
          button: "#A98CF6",
          span: "#EDEDED",
        },
        text: {
          blue: "#2C0C6A",
          grey: "#877E9E",
          label: "#8B8F96",
          white: "#ffffff",
          button: "#A98CF6",
          compare: "#8B8F96",
          "compare-bold": "#372271",
          tab: "#4305EB",
          input2: "#C4C5C6",
          currency: "#404040",
          green: "#6FAE75",
          "tab-active": "#636166",
        },
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
