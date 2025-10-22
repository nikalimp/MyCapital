import { AssetItem } from '../types';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  CategorySelect: undefined;
  NewAsset: { categoryId: string } | undefined;
  AssetDetails: { assetId: string };
};

export type AssetDetailsParams = RootStackParamList['AssetDetails'];

export interface NewAssetFormValues {
  name: string;
  amount: string;
  currency: string;
  date: string;
  notes?: string;
}

export interface FormScreenNavigationProps {
  onSubmit: (values: NewAssetFormValues) => void;
  asset?: AssetItem;
}
