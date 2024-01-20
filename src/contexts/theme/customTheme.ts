import { createTheme, responsiveFontSizes } from '@mui/material/styles';
// fonts
import IntegralCF_DemiBold_woff2 from '../../assets/fonts/IntegralCF/IntegralCF-DemiBold.woff2';
import IntegralCF_DemiBold_woff from '../../assets/fonts/IntegralCF/IntegralCF-DemiBold.woff';
import IntegralCF_DemiBold_ttf from '../../assets/fonts/IntegralCF/IntegralCF-DemiBold.ttf';
import IntegralCF_Medium_woff2 from '../../assets/fonts/IntegralCF/IntegralCF-Medium.woff2';
import IntegralCF_Medium_woff from '../../assets/fonts/IntegralCF/IntegralCF-Medium.woff';
import IntegralCF_Medium_ttf from '../../assets/fonts/IntegralCF/IntegralCF-Medium.ttf';
import Causten_Regular_woff2 from '../../assets/fonts/Causten-Round/Causten-Regular.woff2';
import Causten_Regular_woff from '../../assets/fonts/Causten-Round/Causten-Regular.woff';
import Causten_Regular_ttf from '../../assets/fonts/Causten-Round/Causten-Regular.ttf';

const options = {
  palette: {
    primary: {
      main: '#A581C7',
      light: '#B598D2',
      dark: '#9268BA',
    },
    secondary: { main: '#FFDA55', light: '#fff771', dark: '#FFB500' },
    grey: { 50: '#F1EDEA' },
    background: {
      default: '#A581C7',
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: ['Causten Regular', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto'].join(','),
    h1: {
      fontFamily: ['Integral CF Demi Bold', 'Roboto'].join(','),
    },
    h2: {
      fontFamily: ['Integral CF Demi Bold', 'Roboto'].join(','),
    },
    h3: {
      fontFamily: ['Integral CF Demi Bold', 'Roboto'].join(','),
    },
    h4: {
      fontFamily: ['Integral CF Demi Bold', 'Roboto'].join(','),
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Causten Regular';
          src: url(${Causten_Regular_woff2}) format('woff2'),
              url(${Causten_Regular_woff}) format('woff'),
              url(${Causten_Regular_ttf}) format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Integral CF Demi Bold';
          src: local('Integral CF Demi Bold'), local('Integral-CF-Demi-Bold'),
              url(${IntegralCF_DemiBold_woff2}) format('woff2'),
              url(${IntegralCF_DemiBold_woff}) format('woff'),
              url(${IntegralCF_DemiBold_ttf}) format('truetype');
          font-weight: 600;
          font-style: normal;
        }
        @font-face {
          font-family: 'Integral CF Medium';
          src: local('Integral CF Medium'), local('IntegralCF-Medium'),
              url(${IntegralCF_Medium_woff2}) format('woff2'),
              url(${IntegralCF_Medium_woff}) format('woff'),
              url(${IntegralCF_Medium_ttf}) format('truetype');
          font-weight: 500;
          font-style: normal;
        }
      `,
    },
  },
};

export default responsiveFontSizes(createTheme(options));
