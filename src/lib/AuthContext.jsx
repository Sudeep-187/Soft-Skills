import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user] = useState({ id: 'local-user', email: 'user@example.com', full_name: 'Local User' });
  const [isAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth: false,
      isLoadingPublicSettings: false,
      authError: null,
      appPublicSettings: null,
      logout: () => { },
      navigateToLogin: () => alert('Login is disabled in local mode.'),
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
