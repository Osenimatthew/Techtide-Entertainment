import React, { useState, useEffect } from 'react';
import { playlistImage } from '../assets/assets.js';
import '../styles/home.css';
import { clientId } from '../utils/firebase.js';

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(`https://api.jamendo.com/v3.0/playlists/?client_id=${clientId}&format=json&limit=4`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPlaylists(data.results);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className='home-body'>
      <section className="hero">
        <div className="hero-content">
          <h2>Stream Your Favorite Music</h2>
          <p>Discover millions of songs with just one click</p>
          <a href="/songs" className="btn">Start Listening</a>
        </div>
      </section>

      <section className="featured-playlists">
        <h2>Featured Playlists</h2>
        <div className="playlist-grid" id="playlist-container">
          {playlists.map((playlist, index) => (
            <div key={index} className="playlist-item">
              <img src={playlist.tracks?.[0]?.album_image || playlistImage} alt={playlist.name} />
              <h3>{playlist.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
