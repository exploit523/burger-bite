import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { formatPrice } from '../data/burgers';
import { colors, radii } from '../theme';

export default function DetailScreen({ navigation, route }) {
  const burger = route.params?.burger;
  const [qty, setQty] = useState(1);

  if (!burger) {
    return null;
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={12}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={26} color={colors.white} />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Image source={burger.image} style={styles.hero} />

          <Text style={styles.title}>{burger.name}</Text>
          <Text style={styles.description}>
            {burger.details ||
              burger.description ||
              `Savor our ${burger.name} masterpiece with a succulent patty, topped with fresh veggies, creamy sauce, and soft artisan buns baked daily for the perfect bite.`}
          </Text>

          <View style={styles.qty}>
            <Pressable
              onPress={() => setQty((value) => Math.max(1, value - 1))}
              hitSlop={8}
              style={styles.qtyBtn}
            >
              <Ionicons name="remove" size={18} color={colors.white} />
            </Pressable>
            <Text style={styles.qtyText}>{qty}</Text>
            <Pressable
              onPress={() => setQty((value) => value + 1)}
              hitSlop={8}
              style={styles.qtyBtn}
            >
              <Ionicons name="add" size={18} color={colors.white} />
            </Pressable>
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <Pressable style={styles.cartBtn}>
            <LinearGradient
              colors={[colors.orange, colors.orangeDeep]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cartGradient}
            >
              <Ionicons name="bag-handle-outline" size={18} color={colors.white} />
              <Text style={styles.cartText}>
                Add to Cart · {formatPrice(burger.price * qty)}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  safe: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  hero: {
    width: '100%',
    height: 300,
    borderRadius: radii.xl,
    marginBottom: 24,
    resizeMode: 'contain',
    backgroundColor: colors.card,
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 12,
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 22,
  },
  qty: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    height: 48,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    minWidth: 28,
    textAlign: 'center',
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    paddingTop: 10,
  },
  cartBtn: {
    borderRadius: radii.xl,
    overflow: 'hidden',
  },
  cartGradient: {
    height: 56,
    borderRadius: radii.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cartText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
