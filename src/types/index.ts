export type CurrencyCode = 'USD' | 'EUR' | 'RUB';

export interface AssetCategory {
  id: string;
  label: string;
  icon: string;
}

export interface AssetItem {
  id: string;
  name: string;
  amount: number;
  currency: CurrencyCode;
  categoryId: string;
  notes?: string;
  date: string;
}

export interface Settings {
  language: 'English' | 'Русский';
  currency: CurrencyCode;
}
