import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        dark: {
          colorScheme: "dark",
          background: "#051723",

          primary: "#2F5D9D",

          secondary: "#0087B8",

          accent: "#A8DBF0",

          neutral: "#0D3B59",

          baseContent: "#425876",

          info: "#6699CC",

          success: "#26BA7D",

          warning: "#F0C505",

          error: "#F72631",
        },
        light: {
          colorScheme: "light",

          background: "#EDF8FC",

          primary: "#21416E",

          secondary: "#0096CC",

          accent: "#EEF8FC",

          neutral: "#3A4455",

          baseContent: "#758095",

          info: "#578FC7",

          success: "#1C875B",

          warning: "#F0C505",

          error: "#D90812",
        },
      },
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]

    darkTheme: {
      dark: {
        colorScheme: "dark",
        background: "#051723",

        primary: "#2F5D9D",

        secondary: "#0087B8",

        accent: "#A8DBF0",

        neutral: "#0D3B59",

        baseContent: "#425876",

        info: "#6699CC",

        success: "#26BA7D",

        warning: "#F0C505",

        error: "#F72631",
      },
    },
    // name of one of the included themes for dark mode
  },
  plugins: [daisyui],
};
