import { experimental_extendTheme as extendTheme} from '@mui/material/styles'
import { pink } from '@mui/material/colors';

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: pink[200],
        },
        background: {
            paper: pink[400],
        }
      },
    },
    // dark: {
    //   palette: {
    //     primary: {
    //       main: pink[400],
    //     },
    //   },
    // },
  },
});

export const primaryGradient = 'linear-gradient(to right, #CB7FFF 40%, #A15BFF 100%)';
export const secondaryGradient = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';
// background: linear-gradient(99deg, 
//   rgba(123, 183, 253, 0.61) 61%,  /* #7BB7FD với opacity 0.61 */
//   rgba(229, 106, 253, 0.71) 71%,  /* #E56AFD với opacity 0.71 */
//   rgba(221, 108, 241, 0.42) 42%,  /* #DD6CF1 với opacity 0.42 */
//   rgba(112, 246, 255, 0.11) 11%   /* #70F6FF với opacity 0.11 */
// );

// export const thirdGradient = 'linear-gradient(99deg, #7BB7FD 16% 61%, #E56AFD 31%, #DD6CF1 63%, #70F6FF 100%)';
export const thirdGradient = 'linear-gradient(100deg, rgba(123, 183, 253, 0.61) 16%, rgba(229, 106, 253, 0.71) 31%, rgba(221, 108, 241, 0.42) 63%, rgba(112, 246, 255, 0.11) 100% )';
export const pinkGradient = 'linear-gradient(to right, #FFA296 0%, #FE8596 50%, #FE7096 100%)';
export const blueGradient = 'linear-gradient(to right, #40D1E9 0%, #56C5EC 50%, #7CB1F2 100%)';
export const greenGradient = 'linear-gradient(to right, #4ECBBB 0%, #46C9B8 50%, #3CC6B3 100%)';