import React, { useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { OptionPill } from '../components/OptionPill';
import { useAssets } from '../state/AssetsContext';
import { categories } from '../state/initialData';
import { RootStackParamList } from '../navigation/types';
import { CurrencyCode } from '../types';
import { formatCurrency, formatDate } from '../utils/format';

const currencyOptions: CurrencyCode[] = ['USD', 'EUR', 'RUB'];

type Props = NativeStackScreenProps<RootStackParamList, 'AssetDetails'>;

const AssetDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { assetId } = route.params;
  const { assets, updateAsset } = useAssets();
  const asset = useMemo(() => assets.find((item) => item.id === assetId), [assets, assetId]);

  const category = useMemo(
    () => categories.find((item) => item.id === asset?.categoryId),
    [asset?.categoryId]
  );

  const [name, setName] = useState(asset?.name ?? '');
  const [amount, setAmount] = useState(asset ? String(asset.amount) : '');
  const [currency, setCurrency] = useState<CurrencyCode>(asset?.currency ?? 'USD');
  const [date, setDate] = useState(asset?.date ?? '');
  const [notes, setNotes] = useState(asset?.notes ?? '');

  useEffect(() => {
    if (!asset) {
      navigation.setOptions({ title: 'Asset not found' });
    }
  }, [asset, navigation]);

  if (!asset) {
    return (
      <ScreenContainer>
        <Text style={styles.emptyText}>This asset no longer exists.</Text>
      </ScreenContainer>
    );
  }

  const handleUpdate = () => {
    const parsedAmount = Number.parseFloat(amount);

    if (!name.trim()) {
      Alert.alert('Validation', 'Please provide a name for the asset.');
      return;
    }

    if (Number.isNaN(parsedAmount)) {
      Alert.alert('Validation', 'Enter a valid amount.');
      return;
    }

    updateAsset(asset.id, {
      name: name.trim(),
      amount: parsedAmount,
      currency,
      date,
      notes: notes.trim() ? notes.trim() : undefined,
    });

    Alert.alert('Saved', 'The asset was updated.');
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.categoryLabel}>Category</Text>
        <Text style={styles.categoryValue}>
          {category ? `${category.icon} ${category.label}` : 'Not specified'}
        </Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>Current Balance</Text>
        <Text style={styles.summaryAmount}>{formatCurrency(asset.amount, asset.currency)}</Text>
        <Text style={styles.summaryDate}>Updated {formatDate(asset.date)}</Text>
      </View>

      <InputField label="Name" value={name} onChangeText={setName} />

      <InputField
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <View style={styles.currencyWrapper}>
        <Text style={styles.currencyLabel}>Currency</Text>
        <View style={styles.currencyOptions}>
          {currencyOptions.map((option) => (
            <OptionPill
              key={option}
              label={option}
              selected={currency === option}
              onPress={() => setCurrency(option)}
            />
          ))}
        </View>
      </View>

      <InputField label="Date" value={date} onChangeText={setDate} autoCapitalize="none" />

      <InputField
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        placeholder="Optional description"
        multiline
        numberOfLines={3}
        style={styles.notes}
      />

      <PrimaryButton label="Save" onPress={handleUpdate} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    paddingVertical: 40,
  },
  header: {
    marginBottom: 24,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
  },
  categoryValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  summary: {
    backgroundColor: '#1f6feb',
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
  },
  summaryLabel: {
    color: '#dbeafe',
    fontSize: 15,
    marginBottom: 8,
  },
  summaryAmount: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
  },
  summaryDate: {
    color: '#bfdbfe',
    marginTop: 8,
  },
  currencyWrapper: {
    marginBottom: 16,
  },
  currencyLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 8,
  },
  currencyOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  notes: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
});

export default AssetDetailsScreen;
