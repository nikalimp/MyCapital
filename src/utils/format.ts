import { CurrencyCode } from '../types';

export const formatCurrency = (value: number, currency: CurrencyCode) => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch (error) {
    return `${currency} ${value.toFixed(0)}`;
  }
};

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
