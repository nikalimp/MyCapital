import React, { createContext, useContext, useMemo, useState, ReactNode, useCallback } from 'react';
import { AssetItem } from '../types';
import { initialAssets } from './initialData';

type AssetPayload = Omit<AssetItem, 'id'>;

interface AssetsContextValue {
  assets: AssetItem[];
  addAsset: (asset: AssetPayload) => string;
  updateAsset: (id: string, partial: Partial<AssetItem>) => void;
}

const AssetsContext = createContext<AssetsContextValue | undefined>(undefined);

export const useAssets = (): AssetsContextValue => {
  const context = useContext(AssetsContext);
  if (!context) {
    throw new Error('useAssets must be used within AssetsProvider');
  }
  return context;
};

interface AssetsProviderProps {
  children: ReactNode;
}

export const AssetsProvider: React.FC<AssetsProviderProps> = ({ children }) => {
  const [assets, setAssets] = useState<AssetItem[]>(initialAssets);

  const addAsset = useCallback((asset: AssetPayload) => {
    const id = Math.random().toString(36).slice(2, 8);
    setAssets((current) => [
      { ...asset, id },
      ...current,
    ]);
    return id;
  }, []);

  const updateAsset = useCallback((id: string, partial: Partial<AssetItem>) => {
    setAssets((current) =>
      current.map((item) => (item.id === id ? { ...item, ...partial } : item))
    );
  }, []);

  const value = useMemo(
    () => ({
      assets,
      addAsset,
      updateAsset,
    }),
    [assets, addAsset, updateAsset]
  );

  return <AssetsContext.Provider value={value}>{children}</AssetsContext.Provider>;
};
