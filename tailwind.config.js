/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('../src/images/hero-bg.jpg')",
        'registerHero': "url('../src/images/register-hero.jpg')"
      },
      fontFamily: {
        'leagueSpartan': ['League Spartan', 'sans-serif']
      },
    },
  },
  plugins: [],
}
