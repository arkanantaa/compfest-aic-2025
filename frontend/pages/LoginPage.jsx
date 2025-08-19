// src/pages/LoginPage.jsx
import React from 'react';
import './LoginPage.css'; // Kita akan buat file CSS ini sebentar lagi

// Placeholder SVG untuk ikon-ikon
const MapPinIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const AnalysisIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>;
const CollaborateIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const EyeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;


function LoginPage() {
  return (
    <div className="login-page-container">
      <div className="login-grid">
        {/* Kolom Kiri - Info */}
        <div className="login-info-section">
          <div className="login-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            <h1>EcoEcho</h1>
          </div>
          <p className="login-platform-name">Platform Kolaborasi Urban AI</p>

          <h2>Suara Warga, Kekuatan AI</h2>
          <p className="login-description">
            Wujudkan ide lingkungan Anda menjadi kenyataan. Dari usulan taman hingga zona bebas kendaraan, lihat dampak nyata dengan analisis AI dan dukungan komunitas.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <MapPinIcon />
              <h3>Peta Interaktif</h3>
              <p>Tandai lokasi dan visualisasikan ide Anda langsung di peta.</p>
            </div>
            <div className="feature-card">
              <AnalysisIcon />
              <h3>Analisis AI</h3>
              <p>Proyeksi dampak lingkungan yang akurat untuk setiap usulan.</p>
            </div>
            <div className="feature-card">
              <CollaborateIcon />
              <h3>Kolaborasi</h3>
              <p>Kumpulkan dukungan tetangga untuk memperkuat usulan.</p>
            </div>
          </div>

          <div className="stats-section">
            <div><span>1000+</span><p>Usulan Dibuat</p></div>
            <div><span>50+</span><p>Komunitas Aktif</p></div>
            <div><span>25+</span><p>Proyek Terealisasi</p></div>
          </div>
        </div>

        {/* Kolom Kanan - Form Login */}
        <div className="login-form-section">
          <div className="login-form-card">
            <h3>Masuk</h3>
            <p>Selamat datang kembali!</p>
            <form>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input type="password" id="password" name="password" />
                  <EyeIcon />
                </div>
              </div>
              <button type="submit" className="login-button">Masuk</button>
            </form>
            <div className="login-links">
              <p>Belum punya akun? <a href="#">Daftar</a></p>
              <a href="#" className="forgot-password">Lupa password?</a>
            </div>
          </div>
        </div>
      </div>

      <footer className="login-footer">
        <p>Untuk lingkungan yang lebih baik</p>
        <p>Dibuat dengan ♥ untuk Indonesia</p>
      </footer>
    </div>
  );
}

export default LoginPage;