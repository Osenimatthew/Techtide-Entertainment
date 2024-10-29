import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from '../utils/firebase';
import '../styles/signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailSignUp = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Signing in, please click OK");
        navigate('/');  // Redirect to homepage or login
      })
      .catch((error) => {
        alert('Sorry, there was an error');
      });
  };

  const handleGoogleSignUp = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        alert('Logged in with Google');
        navigate('/');
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  const handleFacebookSignUp = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        alert('Logged in with Facebook');
        navigate('/');
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div className="signup-body">
    <form className="signup-container" onSubmit={handleEmailSignUp}>
      <div className="login_container">
        <h1>Signup</h1>

        <div className="input-group">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
          <i className="bx bxs-user"></i>
        </div>

        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Username</label>
          <i className="bx bxs-user"></i>
        </div>

        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
          <i className="bx bxs-lock-alt"></i>
        </div>

        <div className="btn-container">
          <button type="submit" className="signup-btn">Sign up now</button>
        </div>

        <p className="text">Or sign up with</p>
        <div className="others">
          <button onClick={handleGoogleSignUp} className="social-btn"><i className="bx bxl-google"></i></button>
          <button onClick={handleFacebookSignUp} className="social-btn"><i className="bx bxl-facebook"></i></button>
        </div>

        <div className="signup">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    </form>
    </div>
  );
};

export default Signup;

