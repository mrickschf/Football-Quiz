/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // tous les fichiers de composants React dans `src`
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["TheLedDisplaySt-5RLG", "sans-serif"],
      },
    },
  },
  plugins: [],
};
