import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onPress, disabled }) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    disabled={disabled}
    style={({ pressed }) => [
      styles.button,
      (pressed || disabled) && styles.buttonPressed,
      disabled && styles.buttonDisabled,
    ]}
  >
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1f6feb',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
