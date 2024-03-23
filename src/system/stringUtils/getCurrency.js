export const getCurrencyAmount = (
  amount,
  currency = 'USD',
  locale = 'en-US',
) => {
  const formattedAmount = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })
    .format(amount)
    .replace(/\D00(?=\D*$)/, '');
  // console.log({ formattedAmount });
  return formattedAmount;
};

export const getFormattedAmount = (
  amount,
  currency = 'USD',
  locale = 'en-US',
) => {
  const formatter = new Intl.NumberFormat(locale, {
    currency,
  });
  const formatted = formatter.format(amount);
  return formatted;
};

export const getCurrencySymbol = (locale, currency) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });
  const formatted = formatter.format(1);
  const symbol = formatted.replace(/\d/g, '').trim();
  // console.log({ symbol });
  return symbol;
};
