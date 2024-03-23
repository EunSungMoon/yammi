const numberFormatter = (value, options = {}) => {
  const { locale = 'en' } = options;
  const formatter = new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  });
  return formatter.format(value);
};
export default numberFormatter;
