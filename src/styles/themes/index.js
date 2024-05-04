import colors from './colors';
import responsive from './responsive';
import zIndex from './zIndex';

const theme = {
  colors,
  responsive,
  utils: {
    pxToRem: px => `${px / 16}rem`,
  },
  zIndex,
  size: {
    bnbHeight: 56,
    naviBarHeight: 50,
    sideMargin: 24,
  },
};

export default theme;
