/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./system/user/templates/**/*.html",
    "./themes/user/site/**/*.{html,js}",
    "./system/user/addons/**/*.{html,js,php}",
  ],
  theme: {
    extend: {
      colors: {
        // Voeg hier je custom kleuren toe voor Havee branding
        "havee-blue": "#1e40af",
        "havee-gray": "#6b7280",
      },
      fontFamily: {
        // Voeg hier custom fonts toe indien nodig
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
