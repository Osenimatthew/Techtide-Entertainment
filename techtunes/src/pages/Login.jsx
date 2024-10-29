import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    auth, 
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    sendPasswordResetEmail, 
    setPersistence, 
    browserSessionPersistence, 
    } from '../utils/firebase.js';
import '../styles/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleEmailSignIn = (event) => {
      event.preventDefault();
  
      setPersistence(auth, browserSessionPersistence)
        .then(() => signInWithEmailAndPassword(auth, email, password))
        .then(() => {
          alert('Signing in, please click OK');
          navigate('/');
        })
        .catch((error) => {
          alert('Invalid login details');
        });
    };
  
    const handleGoogleSignIn = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(() => {
          alert('Logged in with Google');
          navigate('/');
        })
        .catch((error) => alert(`Google Sign-In Error: ${error.message}`));
    };
  
    const handleFacebookSignIn = () => {
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
        .then(() => {
          alert('Logged in with Facebook');
          navigate('/');
        })
        .catch((error) => alert(`Facebook Sign-In Error: ${error.message}`));
    };
  
    const handlePasswordReset = () => {
      if (!email) {
        alert('Please enter your email to reset the password.');
        return;
      }
      sendPasswordResetEmail(auth, email)
        .then(() => alert('Password reset email sent.'))
        .catch((error) => alert('Error sending reset email: ' + error.message));
    };
  
    return (
      <div className="login-body">
      <div className="login-container">
        <div className="login_container">
          <h1>Login</h1>
  
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
            <i className="bx bxs-lock-alt"></i>
          </div>
  
          <div className="remember">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" onClick={handlePasswordReset} id="reset">
              Forgot your password?
            </a>
          </div>
  
          <div className="btn-container">
            <button onClick={handleEmailSignIn} className="login-btn">
              Sign in now
            </button>
          </div>
  
          <p className="text">Or sign in with</p>
          <div className="others">
            <button onClick={handleGoogleSignIn} className="social-btn">
              <i className="bx bxl-google"></i>
            </button>
            <button onClick={handleFacebookSignIn} className="social-btn">
              <i className="bx bxl-facebook"></i>
            </button>
          </div>
  
          <div className="signup">
            <p>
              Don't have an account? <a href="/signup">Sign up here</a>
            </p>
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default Login;
