module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/pages/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layout/*.{js,ts,jsx,tsx}',
    './src/modules/**/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A4A4A',
        secondary: '#878787',
        primary100: '#a78bfa',
        primary200: '#61398F',
        primary300: '#FFFFFF',
        accent100: '#D6C6E1',
        accent200: '#9A73B5',
        text100: '#4A4A4A',
        text200: '#878787',
        bg100: '#F5F3F7',
        bg200: '#E9E4ED',
        bg300: '#FFFFFF',
      },
      screen: {
        sm: '640px',
      },
    },
    fontFamily: {
      IBMPlexSansThai: ['IBM Plex Sans Thai'],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
