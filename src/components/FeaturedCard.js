import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice } from '../data/burgers';
import { colors, radii } from '../theme';

export default function FeaturedCard({ item, selected, onPress, onAdd }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.description} numberOfLines={1}>
        {item.description}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <Pressable style={styles.addBtn} onPress={onAdd} hitSlop={8}>
          <Ionicons name="add" size={18} color={colors.white} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 172,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: 14,
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: colors.orange,
  },
  image: {
    width: '100%',
    height: 118,
    borderRadius: radii.md,
    marginBottom: 12,
    resizeMode: 'contain',
    backgroundColor: colors.surface,
  },
  name: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  addBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
