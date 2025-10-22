import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { ListRow } from '../components/ListRow';
import { RootStackParamList } from '../navigation/types';
import { categories } from '../state/initialData';

const CategorySelectScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'CategorySelect'>> = ({
  navigation,
}) => {
  return (
    <ScreenContainer>
      <View style={styles.card}>
        {categories.map((category) => (
          <ListRow
            key={category.id}
            title={`${category.icon} ${category.label}`}
            onPress={() => navigation.navigate('NewAsset', { categoryId: category.id })}
          />
        ))}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  card: {
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
});

export default CategorySelectScreen;
