import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock do localStorage
const store: Record<string, string> = {};
const localStorageMock = {
  getItem: vi.fn((key: string) => store[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete store[key];
  }),
  clear: vi.fn(() => {
    Object.keys(store).forEach(key => delete store[key]);
  }),
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

// Importa após configurar o mock
import { register, login, logout, getCurrentUser, isAuthenticated } from '../services/auth';

describe('Serviço de Autenticação', () => {
  beforeEach(() => {
    // Limpa o store antes de cada teste
    Object.keys(store).forEach(key => delete store[key]);
    vi.clearAllMocks();
  });

  describe('register', () => {
    it('deve registrar um novo usuário com sucesso', () => {
      const result = register('teste@email.com', 'senha123', 'Usuário Teste');
      
      expect(result.success).toBe(true);
      expect(result.message).toBe('Conta criada com sucesso!');
      expect(result.user).toBeDefined();
      expect(result.user?.email).toBe('teste@email.com');
      expect(result.user?.name).toBe('Usuário Teste');
    });

    it('deve falhar ao registrar com email já existente', () => {
      register('teste@email.com', 'senha123', 'Usuário 1');
      const result = register('teste@email.com', 'outrasenha', 'Usuário 2');
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Este email já está cadastrado.');
    });

    it('deve falhar ao registrar com senha curta', () => {
      const result = register('teste@email.com', '123', 'Usuário Teste');
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('A senha deve ter pelo menos 6 caracteres.');
    });

    it('deve falhar ao registrar com campos vazios', () => {
      const result = register('', 'senha123', 'Usuário Teste');
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Todos os campos são obrigatórios.');
    });

    it('deve fazer login automático após registro', () => {
      register('teste@email.com', 'senha123', 'Usuário Teste');
      
      const user = getCurrentUser();
      expect(user).not.toBeNull();
      expect(user?.email).toBe('teste@email.com');
    });
  });

  describe('login', () => {
    beforeEach(() => {
      // Registra um usuário para testes de login
      register('usuario@email.com', 'senha123', 'Usuário Login');
      logout(); // Faz logout para testar o login
    });

    it('deve fazer login com credenciais corretas', () => {
      const result = login('usuario@email.com', 'senha123');
      
      expect(result.success).toBe(true);
      expect(result.message).toBe('Login realizado com sucesso!');
      expect(result.user?.email).toBe('usuario@email.com');
    });

    it('deve falhar com email incorreto', () => {
      const result = login('errado@email.com', 'senha123');
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Email ou senha incorretos.');
    });

    it('deve falhar com senha incorreta', () => {
      const result = login('usuario@email.com', 'senhaerrada');
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Email ou senha incorretos.');
    });
  });

  describe('logout', () => {
    it('deve remover o usuário atual ao fazer logout', () => {
      register('teste@email.com', 'senha123', 'Usuário Teste');
      expect(getCurrentUser()).not.toBeNull();
      
      logout();
      
      expect(getCurrentUser()).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('deve retornar true quando usuário está logado', () => {
      register('teste@email.com', 'senha123', 'Usuário Teste');
      
      expect(isAuthenticated()).toBe(true);
    });

    it('deve retornar false quando usuário não está logado', () => {
      expect(isAuthenticated()).toBe(false);
    });

    it('deve retornar false após logout', () => {
      register('teste@email.com', 'senha123', 'Usuário Teste');
      logout();
      
      expect(isAuthenticated()).toBe(false);
    });
  });
});
