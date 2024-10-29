import React, { useState, useEffect } from 'react';
import { auth, db, doc, getDoc, setDoc, clientId } from '../utils/firebase.js';
import '../styles/browse.css';

export default function Browse() {
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState("");
    const [audioUrl, setAudioUrl] = useState("");

    async function searchMusic() {
        try {
            const searchUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&search=${encodeURIComponent(query)}`;
            const response = await fetch(searchUrl);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setSearchResults(data.results || []);
        } catch (error) {
        }
    }
  
    function playTrack(url) {
        if (audioUrl !== url) {
            setAudioUrl(url);
        }
    }
    function addToPlaylist(track) {
      if (!auth.currentUser) {
        alert("Please login to add tracks to the playlist.");
        return;
      }
  
      const user = auth.currentUser;
      const userId = user.uid;
      const playlistRef = doc(db, "playlists", userId);
  
      const updatePlaylist = async () => {
        const snapshot = await getDoc(playlistRef);
        const currentPlaylist = snapshot.exists() ? snapshot.data()?.tracks || [] : [];
  
        if (!currentPlaylist.some((t) => t.audio === track.audio)) {
          const newPlaylist = [...currentPlaylist, track];
          await setDoc(playlistRef, { tracks: newPlaylist });
          alert("Song added to the playlist.");
        } else {
          alert("This track is already in the playlist.");
        }
      };
  
      updatePlaylist();
    }
  
    return (
      <div className='browse-body'>
        <section className="browse-hero-content">
          <div className="search">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a song ..."
            />
            <button className='br-btn' onClick={searchMusic}>Search</button>
          </div>
          <div id="search-results">
            {searchResults.map((track, index) => (
                <div key={index} className="search-result">
                    <div className="track-info">
                        <img className="album-cover" src={track.album_image} alt={track.name} />
                        <div className="track-details">
                            <p className='dtl' >{track.name} by {track.artist_name}</p>
                        </div>
                        <div>
                            <button className='br-btn' onClick={() => addToPlaylist(track)}>Add to Playlist</button>
                            <button className='br-btn' onClick={() => playTrack(track.audio)}>Play</button>
                        </div>
                    </div>
                </div>
                ))}
          </div>
        </section>
        {audioUrl && <audio src={audioUrl} controls autoPlay />}
      </div>
  );
}
