import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type OptionPillProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export const OptionPill: React.FC<OptionPillProps> = ({ label, selected, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.pill,
      selected && styles.selected,
      pressed && styles.pressed,
    ]}
  >
    <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginRight: 12,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  selected: {
    backgroundColor: '#1f6feb',
    borderColor: '#1f6feb',
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    color: '#1f2933',
    fontSize: 15,
    fontWeight: '500',
  },
  selectedLabel: {
    color: '#ffffff',
  },
});
