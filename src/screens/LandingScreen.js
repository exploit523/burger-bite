import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const useNativeDriver = Platform.OS !== 'web';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../data/burgers';
import { colors, radii } from '../theme';

const { height, width } = Dimensions.get('window');

export default function LandingScreen({ navigation }) {
  const float = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(28)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 700,
        useNativeDriver,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 700,
        useNativeDriver,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: -10,
          duration: 1800,
          useNativeDriver,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 1800,
          useNativeDriver,
        }),
      ])
    ).start();
  }, [fade, float, slide]);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1C140E', colors.bg, '#0B0B0B']}
        locations={[0, 0.42, 1]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe}>
        <Animated.View
          style={[
            styles.heroBlock,
            {
              opacity: fade,
              transform: [{ translateY: Animated.add(slide, float) }],
            },
          ]}
        >
          <View style={styles.glow} />
          <Image source={images.hero} style={styles.heroImage} />
          <View style={styles.brandWrap}>
            <Text style={styles.brandOrange}>Burger</Text>
            <Text style={styles.brandWhite}> Bite</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.bottom,
            {
              opacity: fade,
              transform: [{ translateY: slide }],
            },
          ]}
        >
          <Text style={styles.tagline}>
            Join us and start your journey to{'\n'}burger perfection.
          </Text>

          <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
            onPress={() => navigation.replace('Home')}
          >
            <LinearGradient
              colors={[colors.red, colors.redDeep]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.btnGradient}
            >
              <Text style={styles.btnText}>Log in</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
            onPress={() => navigation.replace('Home')}
          >
            <LinearGradient
              colors={[colors.orange, colors.orangeDeep]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.btnGradient}
            >
              <Text style={styles.btnText}>Sign Up</Text>
            </LinearGradient>
          </Pressable>

          <Text style={styles.footer}>
            New here? Create an account to get started!
          </Text>
        </Animated.View>
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
    paddingHorizontal: 28,
    justifyContent: 'space-between',
  },
  heroBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.01,
  },
  glow: {
    position: 'absolute',
    width: width * 0.72,
    height: width * 0.72,
    borderRadius: width * 0.36,
    backgroundColor: 'rgba(255, 138, 0, 0.16)',
  },
  heroImage: {
    width: width * 0.78,
    height: height * 0.38,
    resizeMode: 'contain',
  },
  brandWrap: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  brandOrange: {
    color: colors.orange,
    fontSize: 44,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  brandWhite: {
    color: colors.white,
    fontSize: 44,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  bottom: {
    paddingBottom: 10,
  },
  tagline: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 26,
    opacity: 0.95,
  },
  btn: {
    marginBottom: 14,
    borderRadius: radii.xl,
    overflow: 'hidden',
  },
  btnGradient: {
    height: 56,
    borderRadius: radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  footer: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
});
