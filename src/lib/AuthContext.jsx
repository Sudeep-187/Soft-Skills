import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const AUTH_KEY = 'rural_bazaar_auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); // 'customer' | 'seller'

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setUser(data.user);
        setIsAuthenticated(true);
        setUserType(data.userType);
      }
    } catch {}
  }, []);

  const login = (userData, type = 'customer') => {
    const u = { id: Date.now().toString(), ...userData };
    setUser(u);
    setIsAuthenticated(true);
    setUserType(type);
    localStorage.setItem(AUTH_KEY, JSON.stringify({ user: u, userType: type }));
  };

  const register = (userData, type = 'customer') => {
    login(userData, type);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUserType(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      userType,
      isLoadingAuth: false,
      isLoadingPublicSettings: false,
      authError: null,
      appPublicSettings: null,
      login,
      register,
      logout,
      navigateToLogin: () => {},
      checkAppState: async () => { },
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
