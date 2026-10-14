import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { loginUser } from '../utils/authStorage';
import { colors, radii } from '../theme';

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await loginUser(data.email, data.password);

      if (!result.ok) {
        Alert.alert('Login failed', result.message);
        return;
      }

      navigation.replace('Home');
    } catch (e) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
              hitSlop={10}
            >
              <Ionicons name="chevron-back" size={26} color={colors.white} />
            </Pressable>

            <Text style={styles.title}>
              Welcome <Text style={styles.titleAccent}>back</Text>
            </Text>
            <Text style={styles.subtitle}>
              Log in to continue your burger journey.
            </Text>

            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Enter a valid email',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="you@email.com"
                  placeholderTextColor={colors.textSoft}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email ? (
              <Text style={styles.error}>{errors.email.message}</Text>
            ) : null}

            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Min 6 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textSoft}
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.password ? (
              <Text style={styles.error}>{errors.password.message}</Text>
            ) : null}

            <Pressable
              style={({ pressed }) => [
                styles.btn,
                pressed && { opacity: 0.9 },
                loading && { opacity: 0.7 },
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              <Text style={styles.btnText}>
                {loading ? 'Please wait...' : 'Log in'}
              </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>
                New here? <Text style={styles.linkAccent}>Sign Up</Text>
              </Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
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
    paddingHorizontal: 28,
    paddingBottom: 30,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 8,
  },
  titleAccent: {
    color: colors.orange,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    marginBottom: 32,
  },
  label: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: colors.white,
    fontSize: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputError: {
    borderColor: colors.red,
  },
  error: {
    color: colors.red,
    fontSize: 12,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: colors.red,
    height: 56,
    borderRadius: radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 20,
  },
  btnText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  link: {
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: 14,
  },
  linkAccent: {
    color: colors.orange,
    fontWeight: '700',
  },
});
