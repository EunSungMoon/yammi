const deviceSize = {
  xs: 360,
  sm: 480,
  md: 992,
  lg: 1200,
  xl: 1600,
};

const responsive = size => {
  return `@media (max-width: ${deviceSize[size] - 1}px)`;
};

export default responsive;
