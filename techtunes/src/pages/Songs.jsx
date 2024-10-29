import React, { useEffect, useState } from 'react';
import { auth, db, doc, getDoc, setDoc, clientId } from '../utils/firebase.js';
import '../styles/songs.css';



const Songs = () => {
  const [playlist, setPlaylist] = useState([]);
  const [songs, setSongs] = useState([]);
  const audioPlayerRef = React.useRef(null);

  useEffect(() => {
    fetchSongs();
    fetchUserPlaylist();
  }, []);

  const fetchSongs = async () => {
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=72`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSongs(data.results);
    } catch (error) {
    }
  };

  const fetchUserPlaylist = async () => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const playlistDocRef = doc(db, "playlists", userId);

      const playlistDoc = await getDoc(playlistDocRef);
      if (playlistDoc.exists()) {
        setPlaylist(playlistDoc.data().tracks || []);
      }
    }
  };

  const playSong = (audioUrl) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.src = audioUrl;
      audioPlayerRef.current.play();
    }
  };

  const addToPlaylist = async (track) => {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to add to a playlist.");
      return;
    }

    const userId = user.uid;
    const playlistRef = doc(db, "playlists", userId);
    try {
      const snapshot = await getDoc(playlistRef);
      let currentPlaylist = snapshot.exists() ? snapshot.data()?.tracks || [] : [];

      if (!currentPlaylist.some(existingTrack => existingTrack.audio === track.audio)) {
        currentPlaylist.push(track);
        await setDoc(playlistRef, { tracks: currentPlaylist });
        alert("Song has been added to the playlist.");
      } else {
        alert("This track is already in the playlist.");
      }
    } catch (error) {
      console.error("Error adding track to playlist:", error);
    }
  };

  return (
    <div className='songs-body'>
      <section className='featured_songs'>
        <div className="music-grid" id="container">
          {songs.map((song) => (
            <div className="song-item" key={song.audio}>
              <img src={song.album_image} alt={song.name} />
              <div className="track-details">
                <h3>{song.name}</h3>
                <p>Artist: {song.artist_name}</p>
              </div>
              <div className="button-container">
                <button className="play-btn" onClick={() => playSong(song.audio)}>Play</button>
                <button className="add_btn" onClick={() => addToPlaylist(song)}>Add to Playlist</button>
              </div>
            </div>
          ))}
        </div>
        <audio ref={audioPlayerRef} controls></audio>
      </section>
    </div>
  );
};

export default Songs;
