import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SectionProps {
  title: string;
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.body}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2933',
    marginBottom: 12,
  },
  body: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
});
