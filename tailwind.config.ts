import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores base del diseño
        primary: {
          DEFAULT: "#0097B2", // Azul principal
          light: "#00B2CC", // Un tono más claro para hover
        },
        gray: {
          light: "#C8C8C8", // Gris claro para UI
          medium: "#4C4C4C", // Gris para texto
        },
        // Usaremos 'black' y 'white' directamente
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;