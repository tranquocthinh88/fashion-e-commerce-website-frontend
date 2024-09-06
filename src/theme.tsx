import { extendTheme } from '@mui/material/styles'
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
  },
});
export const bodyAdminColor = '#C1F3C6';
export const dailyVisitGradient = 'linear-gradient(-52deg, #EC2222 20%, #D303A6 60%)';
export const saleGradient = 'linear-gradient(117deg, #2243EC 0% , #22ECD4 100%)';
export const newOrderGradient = 'linear-gradient(114deg, rgba(41, 72, 235, 0.5) 30% , rgba(159, 48, 187, 0.7) 100%)';
export const newUserGradient = 'linear-gradient(-71deg, rgba(251, 251, 7, 0.29) 29%, rgba(14, 100, 49, 0.53) 100%)';
export const footerAdminColor = 'rgba(112,246,255,0.32)';
export const navbarAdminColor = '#E56AFD';
export const navbarHover =  'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';
