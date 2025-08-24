// frontend/src/pages/LocationDetailsPage.jsx

import React, { useState, useEffect } from 'react';
import './LocationDetailsPage.css';
import { api } from '../../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Komponen ---

const StarRating = ({ rating = 0 }) => {
  return (
    <div className="star-rating" aria-label={`Rating ${rating} of 5`}>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? 'star-filled' : 'star-empty'}>★</span>
      ))}
    </div>
  );
};

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
  const currentUserId = 'user-123-abc';
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(0);
  const locationId = "golden-gate-park"; // ID lokasi statis untuk contoh

  // Efek untuk mengambil data ulasan dari API saat komponen dimuat
  useEffect(() => {
    let cancelled = false;
    const fetchReviews = async () => {
      try {
        const { data } = await api.get(`/reviews/${locationId}`);
        if (!cancelled) {
          setReviews(Array.isArray(data?.data) ? data.data : []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load reviews', err);
        }
      }
    };
    fetchReviews();
    return () => { cancelled = true; };
  }, [locationId]);

  // Fungsi untuk menangani pengiriman ulasan baru
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReviewText.length < 10 || newReviewRating === 0) {
      alert("Silakan isi rating dan ulasan minimal 10 karakter.");
      return;
    }

    try {
      const { data } = await api.post('/reviews', {
        locationId,
        rating: newReviewRating,
        text: newReviewText,
        userId: currentUserId, // Kirim ID pengguna
      });
      setReviews([data?.data, ...reviews]);
      setNewReviewText('');
      setNewReviewRating(0);
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Failed to submit review');
    }
  };

  // Fungsi untuk menghapus ulasan
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus ulasan ini?")) {
        try {
            await api.delete(`/reviews/${reviewId}`);
            setReviews(reviews.filter(r => r.id !== reviewId));
          } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Failed to delete review');
          }
    }
  };

  return (
    <div className="location-details-container">
      <Header />
      <main className="location-main-content">
        <div className="content-left">
            {/* Kolom ini bisa diisi dengan gambar atau peta */}
            <p style={{textAlign: 'center', color: '#888'}}>Konten Kiri (misal: Peta atau Gambar Lokasi)</p>
        </div>

        <div className="content-right">
          <div className="details-card">
              <h3>Write a Review</h3>
              <form className="review-form" onSubmit={handleReviewSubmit}>
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
            </div>
            <div className="review-list">
              {reviews.length === 0 ? (
                <p>No reviews yet. Be the first to write one!</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-author">
                      <div className="author-avatar"></div>
                      <div className="author-info">
                        <span className="author-name">{review.user?.displayName || 'Anonymous'}</span>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <p className="review-text">{review.text}</p>
                    {review.userId === currentUserId && (
                        <button onClick={() => handleDeleteReview(review.id)} className="btn-delete">Delete</button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LocationDetailsPage;
