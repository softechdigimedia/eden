import React, { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'super_admin' | 'manager' | 'client' | 'employee';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
  isLoading: boolean;
  updateUser: (updatedFields: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('retailflow_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const updateUser = (updatedFields: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('retailflow_user', JSON.stringify(updated));
      return updated;
    });
  };

  const login = (role: Role) => {
    let mockUser: User;
    
    if (role === 'super_admin') {
      mockUser = {
        id: 'admin-1',
        name: 'Alex Rivera',
        email: 'admin@retailflow.com',
        role: 'super_admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      };
    } else if (role === 'manager') {
      mockUser = {
        id: 'manager-1',
        name: 'Sarah Chen',
        email: 'manager@retailflow.com',
        role: 'manager',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      };
    } else if (role === 'client') {
      mockUser = {
        id: 'client-1',
        name: 'Operations Lead',
        email: 'client@retailflow.com',
        role: 'client',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      };
    } else {
      mockUser = {
        id: 'employee-1',
        name: 'David Miller',
        email: 'employee@retailflow.com',
        role: 'employee',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      };
    }

    setUser(mockUser);
    localStorage.setItem('retailflow_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('retailflow_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, updateUser }}>
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
