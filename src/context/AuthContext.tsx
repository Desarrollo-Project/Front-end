import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { authService } from '../services/api';

interface AuthContextType {
  auth: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const defaultAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(defaultAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar datos de autenticación almacenados al montar el componente
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth) as AuthState;
        setAuth(parsedAuth);
      } catch (e) {
        console.error('Error al parsear datos de autenticación almacenados:', e);
        localStorage.removeItem('auth');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      
      if (response && response.token) {
        const user: User = {
          id: response.userId,
          name: response.userName,
          email: email,
        };
        
        const newAuthState: AuthState = {
          user,
          isAuthenticated: true,
          token: response.token,
        };
        
        setAuth(newAuthState);
        localStorage.setItem('auth', JSON.stringify(newAuthState));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      const response = await authService.register({
        firstName,
        lastName,
        email,
        password,
      });
      
      if (response && response.success) {
        // Después del registro exitoso, iniciamos sesión automáticamente
        return await login(email, password);
      }
      return false;
    } catch (error) {
      console.error('Error en el registro:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuth(defaultAuthState);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};