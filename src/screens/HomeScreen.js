import React, { useMemo, useState } from 'react';
import {
  Alert,
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
import FeaturedCard from '../components/FeaturedCard';
import MenuItem from '../components/MenuItem';
import {
  categories,
  featuredBurgers,
  images,
  menuBurgers,
} from '../data/burgers';
import { logoutUser } from '../utils/authStorage';
import { colors } from '../theme';

export default function HomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedId, setSelectedId] = useState(featuredBurgers[0].id);

  const onLogout = () => {
    Alert.alert('Log out', 'Do you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          await logoutUser();
          navigation.replace('Landing');
        },
      },
    ]);
  };

  const filteredMenu = useMemo(() => {
    if (activeCategory === 'All') return menuBurgers;
    return menuBurgers.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const openDetail = (item) => {
    navigation.navigate('Detail', { burger: item });
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.header}>
            <Pressable hitSlop={10} style={styles.menuBtn}>
              <View style={[styles.menuLine, { width: 22 }]} />
              <View style={[styles.menuLine, { width: 15 }]} />
              <View style={[styles.menuLine, { width: 19 }]} />
            </Pressable>

            <View style={styles.headerRight}>
              <Pressable onPress={onLogout}>
                <Image source={images.avatar} style={styles.avatar} />
              </Pressable>
              <View style={styles.bellWrap}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color={colors.white}
                />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>2</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.title}>Beyond Just Burgers</Text>
          <Text style={styles.subtitle}>It's a Taste Revolution!</Text>

          <View style={styles.categoryRow}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categories}
            >
              {categories.map((category) => {
                const active = category === activeCategory;
                return (
                  <Pressable
                    key={category}
                    onPress={() => setActiveCategory(category)}
                    style={styles.categoryItem}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        active && styles.categoryTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                    {active ? <View style={styles.categoryDot} /> : null}
                  </Pressable>
                );
              })}
            </ScrollView>
            <Pressable style={styles.filterBtn}>
              <Ionicons name="options-outline" size={18} color={colors.white} />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          >
            {featuredBurgers.map((item) => (
              <FeaturedCard
                key={item.id}
                item={item}
                selected={item.id === selectedId}
                onPress={() => {
                  setSelectedId(item.id);
                  openDetail(item);
                }}
                onAdd={() => openDetail(item)}
              />
            ))}
          </ScrollView>

          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Menu</Text>
            <Pressable>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>

          {filteredMenu.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onPress={() => openDetail(item)}
              onAdd={() => openDetail(item)}
            />
          ))}
        </ScrollView>
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
  content: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 22,
  },
  menuBtn: {
    height: 28,
    justifyContent: 'center',
    gap: 5,
  },
  menuLine: {
    height: 2,
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.card,
  },
  bellWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.badge,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '700',
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    marginTop: 6,
    marginBottom: 22,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  categories: {
    paddingRight: 8,
    gap: 18,
    alignItems: 'center',
  },
  categoryItem: {
    alignItems: 'center',
    paddingBottom: 6,
  },
  categoryText: {
    color: colors.textSoft,
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: colors.red,
  },
  categoryDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.red,
    marginTop: 5,
  },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  featuredList: {
    paddingRight: 8,
    marginBottom: 8,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 14,
  },
  menuTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  seeAll: {
    color: colors.orange,
    fontSize: 13,
    fontWeight: '600',
  },
});
