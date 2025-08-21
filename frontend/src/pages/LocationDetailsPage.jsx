// frontend/src/pages/LocationDetailsPage.jsx

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './LocationDetailsPage.css';

// --- Komponen-komponen ---

// Komponen untuk Bintang Rating (Display)
const StarRating = ({ rating }) => {
  // ... (tetap sama seperti sebelumnya)
};

// Komponen untuk Input Bintang Rating (Formulir)
const StarRatingInput = ({ rating, setRating }) => {
  return (
    <div className="star-rating-input">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <span className={ratingValue <= rating ? 'star-filled' : 'star-empty'}>
              ★
            </span>
          </label>
        );
      })}
    </div>
  );
};


// --- Halaman Utama ---

function LocationDetailsPage() {
  // Ganti dengan ID user yang sedang login dari konteks autentikasi Anda
  const currentUserId = 'user-123-abc'; // << GANTI INI DENGAN ID PENGGUNA ASLI

  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(0);

  const locationId = "golden-gate-park"; // ID lokasi statis untuk contoh

  // Efek untuk mengambil data ulasan dari API saat komponen dimuat
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/${locationId}`);
        const data = await response.json();
        setReviews(data.data);
      } catch (error) {
        console.error("Gagal mengambil ulasan:", error);
      }
    };
    fetchReviews();
  }, [locationId]);

  // Fungsi untuk menangani pengiriman ulasan baru
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReviewText.length < 10 || newReviewRating === 0) {
      alert("Silakan isi rating dan ulasan minimal 10 karakter.");
      return;
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${userToken}` // <-- Kirim token autentikasi
        },
        body: JSON.stringify({
          locationId,
          rating: newReviewRating,
          text: newReviewText,
        }),
      });

      if (!response.ok) throw new Error('Gagal mengirim ulasan');

      const newReview = await response.json();
      setReviews([newReview.data, ...reviews]); // Tambahkan ulasan baru di awal daftar
      setNewReviewText('');
      setNewReviewRating(0);

    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  // Fungsi untuk menghapus ulasan
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus ulasan ini?")) return;

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          // 'Authorization': `Bearer ${userToken}` // <-- Kirim token autentikasi
        },
      });

      if (!response.ok) throw new Error('Gagal menghapus ulasan');

      // Hapus ulasan dari state
      setReviews(reviews.filter(review => review.id !== reviewId));

    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };


  return (
    <div className="location-details-container">
      <Header />
      <main className="location-main-content">
        <div className="content-left">
          {/* ... (bagian gambar dan galeri tetap sama) ... */}
        </div>
        <div className="content-right">
          <div className="details-card">
            {/* ... (bagian detail lokasi tetap sama) ... */}
            {/* Ganti tombol 'Write a Review' dengan formulir */}
            <form className="review-form" onSubmit={handleReviewSubmit}>
              <h3>Write a Review</h3>
              <StarRatingInput rating={newReviewRating} setRating={setNewReviewRating} />
              <textarea
                placeholder="Share your thoughts about this place..."
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
              />
              <button type="submit" className="btn-review">Submit Review</button>
            </form>
          </div>
          <div className="reviews-section">
            <div className="reviews-header">
              <h2>Reviews ({reviews.length})</h2>
              {/* ... (bagian rating keseluruhan bisa dibuat dinamis nanti) ... */}
            </div>
            <div className="review-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-author">
                    <div className="author-avatar"></div>
                    <div className="author-info">
                      <span className="author-name">{review.user.displayName || 'Anonymous'}</span>
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <p className="review-text">{review.text}</p>
                  {/* Tampilkan tombol hapus hanya jika ulasan milik pengguna yang login */}
                  {review.userId === currentUserId && (
                    <button onClick={() => handleDeleteReview(review.id)} className="btn-delete">
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LocationDetailsPage;