import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './components/Home/Home';
import Discover from './components/Discover/Discover';
import Player from './components/Player/Player';
import Upload from './components/Upload/Upload';
import MyMusic from './components/MyMusic/MyMusic';
import Profile from './components/Profile/Profile';
import AuthPage from './components/Auth/AuthPage'; // Updated to use AuthPage
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WalletProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/discover" element={<PrivateRoute><Discover /></PrivateRoute>} />
            <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
            <Route path="/my-music" element={<PrivateRoute><MyMusic /></PrivateRoute>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/track/:fingerprint" element={<Player/>} />
          </Routes>
        </WalletProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
