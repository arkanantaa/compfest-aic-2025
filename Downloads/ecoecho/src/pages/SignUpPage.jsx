// src/pages/SignUpPage.jsx

import React from 'react';
import './SignUpPage.css'; // File CSS yang akan kita buat
import { Link } from 'react-router-dom';

// Komponen SVG untuk ikon-ikon
const FacebookIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z"/></svg>;
const GoogleIcon = () => <svg width="20" height="20" viewBox="0 0 48 48" fill="none"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="m24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.618-3.428-11.283-8.064l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.574l6.19 5.238C42.012 35.244 44 30.028 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>;
const AppleIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.33 12.24c0 1.35-.3 2.64-.89 3.83c-.62 1.23-1.54 2.31-2.73 3.22c-1.14.88-2.48 1.33-3.99 1.33c-.6-.01-1.21-.11-1.81-.31c-.6-.2-1.18-.5-1.72-.88c-.55-.39-.98-.86-1.29-1.4c-.31-.54-.47-1.14-.47-1.78c0-.03.01-.09.02-.17a.88.88 0 0 1 .07-.21c.03-.07.08-.14.13-.2c.05-.06.11-.11.18-.15c.07-.04.14-.07.22-.09c.08-.02.16-.03.24-.03c.23 0 .44.06.63.18c.19.12.37.29.53.51c.16.22.33.46.51.72c.18.26.39.52.62.78c.23.26.49.49.78.68c.29.19.6.34.94.45c.34.11.69.17 1.05.17c.53 0 1.04-.16 1.54-.48c.5-.32.92-.77 1.26-1.34c.34-.57.51-1.21.51-1.93c0-.52-.12-1.02-.35-1.48c-.23-.46-.56-.86-.98-1.2c-.42-.34-.92-.6-1.5-.78c-.58-.18-1.22-.27-1.92-.27c-.73 0-1.43.1-2.09.3c-.66.2-1.28.48-1.85.84c-.57.36-1.05.78-1.44 1.25c-.39.47-.69.97-.89 1.5c-.01.02-.02.04-.02.05c-.01.01-.01.02-.02.03c-.01.01-.02.02-.03.03c-.01.01-.02.02-.04.02h-.05c-.02 0-.04-.01-.07-.02c-.03-.01-.05-.03-.08-.05c-.03-.02-.05-.05-.07-.08c-.02-.03-.03-.06-.04-.1c-.01-.04-.01-.08-.01-.12c0-.5.13-1 .4-1.49c.27-.49.64-.91 1.1-1.26c.46-.35.99-.62 1.59-.82c.6-.2 1.25-.3 1.95-.3c.5 0 .99.08 1.46.25c.47.17.9.41 1.29.73c.39.32.72.7.97 1.14c.25.44.38.92.38 1.43zM15.4 5.7c.6-.75 1-1.6 1.18-2.55c-.95.1-1.85.44-2.7.99c-.75.48-1.38 1.12-1.88 1.92c-.5.8-.82 1.68-.96 2.63c1.02-.05 1.97-.37 2.85-.96c.88-.59 1.51-1.34 1.51-2.03z"/></svg>;

function SignUpPage() {
  return (
    <div className="signup-page-container">
      <div className="signup-card">
        <h2>Join AirQuality Map to explore air quality data in your area.</h2>

        {/* Tombol Sign Up dengan Media Sosial */}
        <div className="social-signup-buttons">
          <button className="social-btn facebook">
            <FacebookIcon /> Sign up with Facebook
          </button>
          <button className="social-btn google">
            <GoogleIcon /> Sign up with Google
          </button>
          <button className="social-btn apple">
            <AppleIcon /> Sign up with Apple
          </button>
        </div>

        <div className="divider">OR</div>

        {/* Form Pendaftaran Manual */}
        <form className="signup-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Your username" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="you@example.com" />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="+1 (555) 123-4567" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Minimum 8 characters" />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="Re-enter your password" />
          </div>
          <button type="submit" className="signup-button">
            Create AirQuality Map Account
          </button>
        </form>

        {/* Teks Persetujuan dan Link */}
        <p className="terms-text">
          By signing up, you agree to AirQuality Map's{' '}
          <Link to="/terms">Terms of Service</Link> and{' '}
          <Link to="/privacy">Privacy Policy</Link>.
        </p>
        <p className="terms-text">
          This site is protected by reCAPTCHA and the Google{' '}
          <Link to="/google-privacy">Privacy Policy</Link> and{' '}
          <Link to="/google-terms">Terms of Service</Link> apply.
        </p>

        <p className="signin-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
