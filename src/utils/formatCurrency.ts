const formatCurrency = (currency: string | number) => {
  if (currency === "") return currency;

  const currencyToNumber = +currency;

  return currencyToNumber.toFixed(2);
};

export default formatCurrency;
