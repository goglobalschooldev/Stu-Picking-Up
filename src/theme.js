// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  })

 export const theme = extendTheme({ breakpoints })

 export const colortheme = extendTheme({
    colors: {
      brand: {
        text: "#4E4F9D",
        button: "#00AB46",
        102: "#7750F8",
        signav: "#E9E9E9",
        200: "#0983C4",
      },
    },
  })
