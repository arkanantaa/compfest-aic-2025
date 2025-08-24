// src/components/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

const AccountIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="account-icon"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

function Header() {
  const { user } = useAuth();
  const location = useLocation(); // Mendapatkan informasi rute saat ini

  const handleLogout = async () => {
    await signOut(auth);
  };

  const isAppPage = location.pathname === '/' || location.pathname.startsWith('/proposals') || location.pathname.startsWith('/home');

  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">✻ logo</Link>
      </div>
      <nav className="navigation">
        {isAppPage ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/proposals">Proposals</Link>
            <Link to="/account">Account</Link>
          </>
        ) : (
          <>
            <a href="#map">Map</a>
            <a href="#about">About</a>
            <a href="#faq">FAQ</a>
          </>
        )}
      </nav>
      <div className="account-section">
        {user ? (
          <>
            <img src={user.photoUrl || 'https://placehold.co/40x40/EFEFEF/333?text=A'} alt="User" className="user-avatar" />
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <Link to="/login">
            <AccountIcon />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
