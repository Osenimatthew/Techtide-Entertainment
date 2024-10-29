import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Songs from './pages/Songs';
import Playlist from './pages/Playlist';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <Router>
        <Header/>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>

        <Footer />
    </Router>
  );
}

export default App;

