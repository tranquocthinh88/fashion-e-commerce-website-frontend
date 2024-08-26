import { experimental_extendTheme as extendTheme} from '@mui/material/styles'
import { pink } from '@mui/material/colors';

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: pink[600],
        },
        background: {
            paper: pink[600],
        }
      },
    },
    dark: {
      palette: {
        primary: {
          main: pink[400],
        },
      },
    },
  },
});