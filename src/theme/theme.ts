import {
  createTheme,
  PaletteColorOptions,
} from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface CustomPalette {
    apple: PaletteColorOptions
    steelBlue: PaletteColorOptions
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
    apple: createColor('#5DBA40'),
    steelBlue: createColor('#5C76B7'),
    violet: createColor('#BC00A3'),
  },
})
