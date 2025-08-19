// src/components/Footer.jsx

import React from 'react';
import SocialIcons from './SocialIcons'; // Impor komponen ikon

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-links">
        <a href="#company">Company</a>
        <a href="#resources">Resources</a>
      </div>
      
      {/* Ganti div lama dengan komponen SocialIcons */}
      <SocialIcons /> 

    </footer>
  );
}

export default Footer;