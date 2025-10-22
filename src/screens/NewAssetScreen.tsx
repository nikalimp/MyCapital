import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { OptionPill } from '../components/OptionPill';
import { categories } from '../state/initialData';
import { useAssets } from '../state/AssetsContext';
import { useSettings } from '../state/SettingsContext';
import { RootStackParamList } from '../navigation/types';
import { CurrencyCode } from '../types';

const currencyOptions: CurrencyCode[] = ['USD', 'EUR', 'RUB'];

type Props = NativeStackScreenProps<RootStackParamList, 'NewAsset'>;

const NewAssetScreen: React.FC<Props> = ({ navigation, route }) => {
  const { addAsset } = useAssets();
  const { currency: defaultCurrency } = useSettings();
  const categoryId = route.params?.categoryId;
  const category = useMemo(() => categories.find((item) => item.id === categoryId), [categoryId]);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<CurrencyCode>(defaultCurrency);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    const parsedAmount = Number.parseFloat(amount);

    if (!name.trim()) {
      Alert.alert('Validation', 'Please provide a name for the asset.');
      return;
    }

    if (Number.isNaN(parsedAmount)) {
      Alert.alert('Validation', 'Enter a valid amount.');
      return;
    }

    if (!category) {
      Alert.alert('Validation', 'Please choose a category.');
      return;
    }

    const newId = addAsset({
      name: name.trim(),
      amount: parsedAmount,
      currency,
      categoryId: category.id,
      date,
      notes: notes.trim() ? notes.trim() : undefined,
    });

    navigation.replace('AssetDetails', { assetId: newId });
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.categoryLabel}>Category</Text>
        <Text style={styles.categoryValue}>
          {category ? `${category.icon} ${category.label}` : 'Choose category'}
        </Text>
      </View>

      <InputField label="Name" value={name} onChangeText={setName} placeholder="Name" />

      <InputField
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="0"
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

      <InputField
        label="Date"
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        autoCapitalize="none"
      />

      <InputField
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        placeholder="Optional description"
        multiline
        numberOfLines={3}
        style={styles.notes}
      />

      <PrimaryButton label="Save" onPress={handleSubmit} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
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

export default NewAssetScreen;
