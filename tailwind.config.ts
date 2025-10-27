import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // 👈 muy importante
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
