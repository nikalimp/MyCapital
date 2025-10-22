import { AssetCategory, AssetItem } from '../types';

export const categories: AssetCategory[] = [
  { id: 'cash', label: 'Cash', icon: '💵' },
  { id: 'bank', label: 'Bank', icon: '🏦' },
  { id: 'investments', label: 'Investments', icon: '📈' },
  { id: 'realestate', label: 'Real Estate', icon: '🏠' },
  { id: 'transport', label: 'Transport', icon: '🚗' },
  { id: 'other', label: 'Other', icon: '🗂️' },
];

export const initialAssets: AssetItem[] = [
  {
    id: 'asset1',
    name: 'Salary Savings',
    amount: 5200,
    currency: 'USD',
    categoryId: 'bank',
    date: '2024-05-01',
  },
  {
    id: 'asset2',
    name: 'Emergency Fund',
    amount: 3000,
    currency: 'USD',
    categoryId: 'cash',
    date: '2024-03-12',
  },
  {
    id: 'asset3',
    name: 'Brokerage Account',
    amount: 12500,
    currency: 'USD',
    categoryId: 'investments',
    date: '2024-01-08',
  },
];
