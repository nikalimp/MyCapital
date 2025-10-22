import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { Section } from '../components/Section';
import { OptionPill } from '../components/OptionPill';
import { RootStackParamList } from '../navigation/types';
import { useSettings } from '../state/SettingsContext';

const languageOptions: Array<'English' | 'Русский'> = ['English', 'Русский'];
const currencyOptions = ['USD', 'EUR', 'RUB'] as const;

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC<Props> = () => {
  const { language, currency, setCurrency, setLanguage } = useSettings();

  return (
    <ScreenContainer>
      <Section title="Profile">
        <View style={styles.row}>
          <Text style={styles.label}>Language</Text>
          <View style={styles.options}>
            {languageOptions.map((option) => (
              <OptionPill
                key={option}
                label={option}
                selected={language === option}
                onPress={() => setLanguage(option)}
              />
            ))}
          </View>
        </View>
      </Section>

      <Section title="Currency">
        <View style={styles.options}>
          {currencyOptions.map((option) => (
            <OptionPill
              key={option}
              label={option}
              selected={currency === option}
              onPress={() => setCurrency(option)}
            />
          ))}
        </View>
      </Section>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2933',
    marginBottom: 12,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default SettingsScreen;
