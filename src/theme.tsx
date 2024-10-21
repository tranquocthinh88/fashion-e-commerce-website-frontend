import { extendTheme } from '@mui/material/styles'
import { pink } from '@mui/material/colors';

const breakpoints = {
  values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
  },
};

export const theme = extendTheme({
  breakpoints: breakpoints,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: pink[200],
        },
        background: {
          paper: pink[600],
        }
      },
    },
  },
});
export const primaryGradient = 'linear-gradient(to right, #CB7FFF 40%, #A15BFF 100%)';
export const secondaryGradient = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';
export const thirdGradient = 'linear-gradient(100deg, rgba(123, 183, 253, 0.61) 16%, rgba(229, 106, 253, 0.71) 31%, rgba(221, 108, 241, 0.42) 63%, rgba(112, 246, 255, 0.11) 100% )';
export const pinkGradient = 'linear-gradient(to right, #FFA296 0%, #FE8596 50%, #FE7096 100%)';
export const blueGradient = 'linear-gradient(to right, #40D1E9 0%, #56C5EC 50%, #7CB1F2 100%)';
export const greenGradient = 'linear-gradient(to right, #4ECBBB 0%, #46C9B8 50%, #3CC6B3 100%)';
export const bodyAdminColor = '#d6ebee';
export const dailyVisitGradient = 'linear-gradient(-52deg, #EC2222 20%, #D303A6 60%)';
export const saleGradient = 'linear-gradient(117deg, #2243EC 0% , #22ECD4 100%)';
export const newOrderGradient = 'linear-gradient(114deg, rgba(41, 72, 235, 0.5) 30% , rgba(159, 48, 187, 0.7) 100%)';
export const newUserGradient = 'linear-gradient(-71deg, rgba(251, 251, 7, 0.29) 29%, rgba(14, 100, 49, 0.53) 100%)';
export const footerAdminColor = 'rgba(112,246,255,0.32)';
export const navbarAdminColor = '#E56AFD';
export const navbarHover =  'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';