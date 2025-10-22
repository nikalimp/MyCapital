import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

interface ScreenContainerProps {
  children: ReactNode;
  scrollable?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, scrollable = true }) => {
  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    flex: 1,
  },
});
