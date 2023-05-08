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
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } })

export const theme = createTheme({
  palette: {
    primary: createColor('#8B5FBF'),
    text100: createColor('#4A4A4A'),
    text200: createColor('#525252'),
    violet: createColor('#BC00A3'),
  },
})
