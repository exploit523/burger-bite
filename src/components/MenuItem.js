import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice } from '../data/burgers';
import { colors, radii } from '../theme';

function Stars({ count = 5 }) {
  return (
    <View style={styles.stars}>
      {Array.from({ length: count }).map((_, index) => (
        <Ionicons key={index} name="star" size={11} color={colors.star} />
      ))}
    </View>
  );
}

export default function MenuItem({ item, onPress, onAdd }) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image source={item.image} style={styles.thumb} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Stars count={item.rating} />
        <Text style={styles.meta}>{item.category}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
      <Pressable style={styles.addBtn} onPress={onAdd} hitSlop={8}>
        <Ionicons name="add" size={22} color={colors.bg} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: 12,
    marginBottom: 12,
  },
  thumb: {
    width: 74,
    height: 74,
    borderRadius: radii.md,
    resizeMode: 'contain',
    backgroundColor: colors.surface,
  },
  info: {
    flex: 1,
    marginHorizontal: 12,
  },
  name: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4,
  },
  meta: {
    color: colors.textSoft,
    fontSize: 12,
    marginBottom: 4,
  },
  price: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  addBtn: {
    width: 44,
    height: 56,
    borderRadius: radii.sm,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
