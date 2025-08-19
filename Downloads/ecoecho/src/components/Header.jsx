// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <-- Impor Link

const AccountIcon = () => (
  // ... kode SVG Anda tetap sama ...
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
  return (
    <header className="app-header">
      <div className="logo">
         {/* Ganti <a> dengan <Link> agar tidak refresh halaman */}
        <Link to="/">✻ logo</Link>
      </div>
      <nav className="navigation">
        <a href="#map">Map</a>
        <a href="#about">About</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div className="account-section">
        {/* Bungkus ikon dengan Link yang mengarah ke /login */}
        <Link to="/login">
          <AccountIcon />
        </Link>
      </div>
    </header>
  );
}

export default Header;