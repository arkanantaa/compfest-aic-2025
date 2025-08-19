import React from 'react';

function FeedbackCard() {
  return (
    <div className="card">
      <h3>Share Your Feedback</h3>
      <p>Help us improve AirSense by sharing your thoughts or reporting an issue...</p>
      <textarea placeholder="Your feedback..." rows="4"></textarea>
      <button className="submit-button">Submit Feedback</button>
    </div>
  );
}

export default FeedbackCard;