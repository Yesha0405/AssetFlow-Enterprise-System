const USERS_STORAGE_KEY = 'assetflow-users';
const CURRENT_USER_STORAGE_KEY = 'assetflow-current-user';

function getUsers() {
  try {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  } catch (error) {
    console.error('Unable to read users from storage:', error);
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function registerUser({ name = '', email = '', password = '' }) {
  const trimmedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (!trimmedName) {
    return { success: false, message: 'Please enter your name.' };
  }

  if (!isValidEmail(normalizedEmail)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  if (trimmedPassword.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters.' };
  }

  const users = getUsers();
  const exists = users.some((user) => user.email === normalizedEmail);

  if (exists) {
    return { success: false, message: 'An account with this email already exists.' };
  }

  const newUser = {
    id: Date.now(),
    name: trimmedName,
    email: normalizedEmail,
    password: trimmedPassword,
  };

  users.push(newUser);
  saveUsers(users);
  localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify({ id: newUser.id, name: trimmedName, email: normalizedEmail }));

  return { success: true, message: 'Account created successfully. You can sign in now.' };
}

export function loginUser({ email = '', password = '' }) {
  const normalizedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (!isValidEmail(normalizedEmail)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  if (!trimmedPassword) {
    return { success: false, message: 'Please enter your password.' };
  }

  const users = getUsers();
  const user = users.find((entry) => entry.email === normalizedEmail && entry.password === trimmedPassword);

  if (!user) {
    return { success: false, message: 'Invalid email or password.' };
  }

  localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify({ id: user.id, name: user.name, email: user.email }));

  return {
    success: true,
    user: { id: user.id, name: user.name, email: user.email },
    message: `Welcome back, ${user.name}!`,
  };
}

export function getCurrentUser() {
  try {
    const storedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Unable to read current user:', error);
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  return { success: true, message: 'You have been logged out.' };
}
