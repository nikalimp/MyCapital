import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type InputFieldProps = TextInputProps & {
  label: string;
};

export const InputField: React.FC<InputFieldProps> = ({ label, style, ...rest }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#9ca3af"
      {...rest}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
});
