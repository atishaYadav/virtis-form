import React from 'react';
import DynamicSearchForm from './components/DynamicSearchForm';
import { AuthProvider, useAuth } from './auth/AuthContext';
const AppContent = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <h1>Dynamic Search Form</h1>
      {isAuthenticated ? (
        <>
          <button onClick={logout}>Logout</button>
          <DynamicSearchForm />
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
