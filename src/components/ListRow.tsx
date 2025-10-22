import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ListRowProps = {
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  onPress?: () => void;
  compact?: boolean;
};

export const ListRow: React.FC<ListRowProps> = ({
  title,
  subtitle,
  trailing,
  onPress,
  compact = false,
}) => (
  <Pressable onPress={onPress} disabled={!onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
    <View style={styles.textWrapper}>
      <Text style={[styles.title, compact && styles.compactTitle]}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
    {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  pressed: {
    opacity: 0.6,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#1f2933',
    fontWeight: '500',
  },
  compactTitle: {
    fontSize: 15,
  },
  subtitle: {
    marginTop: 4,
    color: '#6b7280',
  },
  trailing: {
    marginLeft: 12,
  },
});
