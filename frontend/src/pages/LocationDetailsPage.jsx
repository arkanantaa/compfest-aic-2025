// frontend/src/pages/LocationDetailsPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LocationDetailsPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api } from '../../services/api';
import { useAuth } from '../context/AuthContext';

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

function LocationDetailsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const locationId = "golden-gate-park";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get(`/reviews/${locationId}`);
        setReviews(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        console.error('Failed to load reviews from API.', err);
        setReviews([]);
      }
    };
    fetchReviews();
  }, [locationId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
        alert("You must be logged in to write a review.");
        return;
    }
    if (newReviewText.length < 10 || newReviewRating === 0) {
      alert("Please provide a rating and a review of at least 10 characters.");
      return;
    }
    const newReviewData = { locationId, rating: newReviewRating, text: newReviewText };
    try {
      const { data } = await api.post('/reviews', newReviewData);
      setReviews([data.data, ...reviews]);
      setNewReviewText('');
      setNewReviewRating(0);
      setShowReviewForm(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };
  
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
        try {
            await api.delete(`/reviews/${reviewId}`);
            setReviews(reviews.filter(r => r.id !== reviewId));
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Failed to delete review.');
        }
    }
  };

  const handleViewOnMap = () => {
    navigate('/map');
  };

  const overallRating = reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1) : '0.0';

  return (
    <div className="location-details-container">
      <Header />
      <main className="location-main-content">
        <div className="content-left">
          {}
        </div>
        <div className="content-right">
          <div className="details-card">
            <h1>Golden Gate Park</h1>
            <p className="address">501 Stanyan St, San Francisco, CA 94117</p>
            <div className="air-quality">
              <span>AQI: 55</span>
              <span className="quality-good">Good</span>
              <span>PM2.5: 12.3 µg/m³</span>
            </div>
            <div className="action-buttons">
              <button className="btn-review" onClick={() => setShowReviewForm(!showReviewForm)}>
                {showReviewForm ? 'Cancel' : 'Write a Review'}
              </button>
              {}
              <button className="btn-map" onClick={handleViewOnMap}>View on Map</button>
            </div>
            {showReviewForm && (
              <form className="review-form" onSubmit={handleReviewSubmit}>
                <h3>Write a Review</h3>
                <StarRatingInput rating={newReviewRating} setRating={setNewReviewRating} />
                <textarea
                  placeholder="Share your thoughts about this place..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                />
                <button type="submit" className="btn-submit-review">Submit Review</button>
              </form>
            )}
          </div>
          <div className="reviews-section">
            <div className="reviews-header">
              <h2>Reviews ({reviews.length})</h2>
              {reviews.length > 0 && (
                <div className="overall-rating">
                  <strong>{overallRating}</strong>
                  <StarRating rating={Math.round(overallRating)} />
                  <span>({reviews.length} Reviews)</span>
                </div>
              )}
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
                    {user && user.id === review.userId && (
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
