import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@burger_users';
const SESSION_KEY = '@burger_session';

// достаём всех зарегистрированных пользователей
export async function getUsers() {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  if (!raw) return [];
  return JSON.parse(raw);
}

// регистрация — сохраняем нового юзера
export async function registerUser(user) {
  const users = await getUsers();

  const alreadyExists = users.find(
    (u) => u.email.toLowerCase() === user.email.toLowerCase()
  );

  if (alreadyExists) {
    return { ok: false, message: 'Email already registered' };
  }

  users.push({
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
    password: user.password,
  });

  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { ok: true };
}

// логин — сверяем email и password с тем что в AsyncStorage
export async function loginUser(email, password) {
  const users = await getUsers();
  const found = users.find(
    (u) =>
      u.email.toLowerCase() === email.trim().toLowerCase() &&
      u.password === password
  );

  if (!found) {
    return { ok: false, message: 'Wrong email or password' };
  }

  await AsyncStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: found.email, name: found.name })
  );

  return { ok: true, user: found };
}

export async function getSession() {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  return JSON.parse(raw);
}

export async function logoutUser() {
  await AsyncStorage.removeItem(SESSION_KEY);
}
