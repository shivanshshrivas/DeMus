import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './components/Home/Home';
import Discover from './components/Discover/Discover';
import Upload from './components/Upload/Upload';
import MyMusic from './components/MyMusic/MyMusic';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/my-music" element={<MyMusic />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
