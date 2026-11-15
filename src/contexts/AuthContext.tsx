import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { loginWithGoogle, logout as apiLogout, getCurrentUser } from '../lib/auth';
import type { User } from '../lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (idToken: string) => {
    const response = await loginWithGoogle(idToken);
    setUser(response.user);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
