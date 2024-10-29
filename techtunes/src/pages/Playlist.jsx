import React, { useState, useEffect } from 'react';
import { auth, db, doc, getDoc, updateDoc } from '../utils/firebase';
import '../styles/playlist.css';

const Playlist = () => {
    const [playlist, setPlaylist] = useState([]);
    const [audioUrl, setAudioUrl] = useState(null);
  
    useEffect(() => {
      const fetchPlaylist = async () => {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const playlistRef = doc(db, 'playlists', user.uid);
            const playlistSnapshot = await getDoc(playlistRef);
            if (playlistSnapshot.exists()) {
              setPlaylist(playlistSnapshot.data().tracks || []);
            }
          }
        });
      };
      fetchPlaylist();
    }, [auth, db]);
  
    const playTrack = (index) => {
      setCurrentTrackIndex(index);
      setAudioUrl(playlist[index]?.audio);
    };
  
    const removeTrack = async (audio, index) => {
      const updatedPlaylist = playlist.filter((_, i) => i !== index);
      setPlaylist(updatedPlaylist);
  
      const user = auth.currentUser;
      if (user) {
        const playlistRef = doc(db, 'playlists', user.uid);
        await updateDoc(playlistRef, { tracks: updatedPlaylist });
      }
    };
  
    return (
      <div className='playlist-body'>
        <section className="playlist-section">
          <h2>Your Playlist</h2>
          <ul>
            {playlist.map((track, index) => (
              <li key={index} className="track-info">
                <img src={track.album_image} alt="Album cover" className="album-cover" />
                <div className="plt-details">
                  <p>{track.name} by {track.artist_name}</p>
                </div>
                <div>
                  <button className='pt-button' onClick={() => playTrack(index)}>Play</button>
                  <button className='pt-button' onClick={() => removeTrack(track.audio, index)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
  
          {audioUrl && (
            <div className="player-controls">
              <audio src={audioUrl} controls autoPlay />
            </div>
          )}
        </section>
      </div>
    );
  };
  
  export default Playlist;
