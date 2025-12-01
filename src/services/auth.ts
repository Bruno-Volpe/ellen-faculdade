// Serviço de autenticação usando localStorage

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

const USERS_KEY = 'auth_users';
const CURRENT_USER_KEY = 'auth_current_user';

// Gera um ID único simples
const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Obtém todos os usuários do localStorage
const getUsers = (): Record<string, { password: string; user: User }> => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : {};
};

// Salva usuários no localStorage
const saveUsers = (users: Record<string, { password: string; user: User }>): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Registra um novo usuário
export const register = (email: string, password: string, name: string): AuthResponse => {
  const users = getUsers();
  
  // Verifica se o email já existe
  if (users[email]) {
    return {
      success: false,
      message: 'Este email já está cadastrado.',
    };
  }

  // Validações básicas
  if (!email || !password || !name) {
    return {
      success: false,
      message: 'Todos os campos são obrigatórios.',
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: 'A senha deve ter pelo menos 6 caracteres.',
    };
  }

  // Cria o novo usuário
  const newUser: User = {
    id: generateId(),
    email,
    name,
    createdAt: new Date().toISOString(),
  };

  users[email] = {
    password, // Em produção, usar hash!
    user: newUser,
  };

  saveUsers(users);

  // Faz login automático após registro
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

  return {
    success: true,
    message: 'Conta criada com sucesso!',
    user: newUser,
  };
};

// Faz login do usuário
export const login = (email: string, password: string): AuthResponse => {
  const users = getUsers();
  const userData = users[email];

  if (!userData) {
    return {
      success: false,
      message: 'Email ou senha incorretos.',
    };
  }

  if (userData.password !== password) {
    return {
      success: false,
      message: 'Email ou senha incorretos.',
    };
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData.user));

  return {
    success: true,
    message: 'Login realizado com sucesso!',
    user: userData.user,
  };
};

// Faz logout do usuário
export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Obtém o usuário atual
export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
};

// Verifica se está autenticado
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
