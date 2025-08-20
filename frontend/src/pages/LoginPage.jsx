// src/pages/LoginPage.jsx

import React from 'react';
import './LoginPage.css'; // Pastikan file CSS ini ada di folder yang sama
import { Link } from 'react-router-dom'; // Menggunakan Link untuk navigasi
import { auth } from '../config/firebase'; // Impor konfigurasi Firebase jika diperlukan
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

const navigate = useNavigate();
const handleLogin = async (event) => {
  event.preventDefault();

  const {email, password} = event.target.elements;
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    navigate('/')
  } catch (error) {
    console.error('Error signing in:', error);
  }
}

function LoginPage() {
  return (
    <div className="login-page-container">
      {/* Header Halaman Login */}
      <header className="login-header">
        <Link to="/" className="login-logo">
          ✻ logo
        </Link>
      </header>

      {/* Konten Utama Halaman Login */}
      <main className="login-main">
        <div className="login-card">
          <h2>Welcome Back!</h2>
          <p className="login-subtitle">
            Enter your email and password to access your account.
          </p>

          {/* Form untuk input email dan password */}
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="you@example.com" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input type="password" id="password" placeholder="********" />
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot your password?
              </Link>
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>

          {/* Link untuk mendaftar */}
          <p className="login-signup-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </main>

      {/* Footer Halaman Login */}
      <footer className="login-footer">
        <div className="footer-links">
          <Link to="/company">Company</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/legal">Legal</Link>
        </div>
        {/* Ikon media sosial */}
        <div className="social-icons">
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z"/></svg>
          </a>
          <a href="https://x.com" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
             <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg>
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69.74c0 .46.17.9.46 1.22c.29.32.7.51 1.23.41M8.27 18.5H5.5V10.13h2.77v8.37Z"/></svg>
          </a>
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8A3.6 3.6 0 0 0 20 16.4V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"/></svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
