import { createTheme, PaletteColorOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface CustomPalette {
    text100: PaletteColorOptions
    text200: PaletteColorOptions
    violet: PaletteColorOptions
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor) =>
  augmentColor({ color: { main: mainColor }, mainShade: 200 })

export const theme = createTheme({
  palette: {
    primary: createColor('#a78bfa'),
    secondary: createColor('#000000'),
    text100: createColor('#4A4A4A'),
    text200: createColor('#525252'),
    violet: createColor('#BC00A3'),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#FFFFFF', // Set the text color for primary buttons to white
        },
      },
    },
  },
})
