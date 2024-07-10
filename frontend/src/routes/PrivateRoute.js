import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';  // We need to create this context

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const { walletAddress } = useWallet();

  return currentUser && walletAddress ? children : <Navigate to="/auth" />;
}

export default PrivateRoute;
