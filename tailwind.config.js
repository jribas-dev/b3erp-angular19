/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#5000aa',
          secondary: '#3b82f6',
        },
        fontFamily: {
          'roboto': ['Roboto', 'sans-serif'],
          'ibm-sans': ['IBM Plex Sans', 'sans-serif'],
        },
        transitionDuration: {
          '333': '333ms',
        }
      },
    },
    plugins: [],
  }