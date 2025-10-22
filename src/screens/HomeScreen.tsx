import React, { useLayoutEffect, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAssets } from '../state/AssetsContext';
import { useSettings } from '../state/SettingsContext';
import { categories } from '../state/initialData';
import { formatCurrency, formatDate } from '../utils/format';
import { ListRow } from '../components/ListRow';
import { ScreenContainer } from '../components/ScreenContainer';

const categoryLookup = categories.reduce<Record<string, string>>((map, item) => {
  map[item.id] = item.icon;
  return map;
}, {});

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { assets } = useAssets();
  const { currency } = useSettings();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text style={styles.headerAction} onPress={() => navigation.navigate('Settings')}>
          Settings
        </Text>
      ),
      headerLeft: () => (
        <Text style={styles.headerAction} onPress={() => navigation.navigate('CategorySelect')}>
          Add
        </Text>
      ),
    });
  }, [navigation]);

  const totalAmount = useMemo(
    () => assets.reduce((sum, asset) => sum + asset.amount, 0),
    [assets]
  );

  return (
    <ScreenContainer scrollable={false}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Balance</Text>
        <Text style={styles.summaryAmount}>{formatCurrency(totalAmount, currency)}</Text>
      </View>
      <FlatList
        data={assets}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ListRow
            title={`${categoryLookup[item.categoryId] ?? ''} ${item.name}`.trim()}
            subtitle={`${formatCurrency(item.amount, item.currency)} · ${formatDate(item.date)}`}
            onPress={() => navigation.navigate('AssetDetails', { assetId: item.id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Add your first asset to get started.</Text>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: '#1f6feb',
    borderRadius: 20,
    padding: 24,
    marginTop: 12,
    marginBottom: 16,
  },
  summaryLabel: {
    color: '#dbeafe',
    fontSize: 15,
    marginBottom: 8,
  },
  summaryAmount: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
  },
  list: {
    flex: 1,
  },
  listContent: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e7eb',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 24,
    color: '#6b7280',
  },
  headerAction: {
    color: '#1f6feb',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
