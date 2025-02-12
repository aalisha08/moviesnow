
import React, { useState } from 'react';
import axios from 'axios';
import '../Assets/MovieDetailsModal.css';

const MovieDetailsModal = ({ movie, onClose }) => {
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]); // To store fetched reviews
  const [showReviews, setShowReviews] = useState(false); // To toggle reviews visibility

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmitReview = async () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('You need to log in to submit a review');
      return;
    }

    const reviewData = {
      userId: userId,
      movieId: movie.id,
      reviewText: review,
    };

    console.log('Review Data:', reviewData);

    try {
      const response = await axios.post('http://localhost:9001/api/reviews', reviewData);

      if (response.status === 200) {
        alert('Review submitted successfully');
        setReviews([...reviews, reviewData]); // Update reviews list with the new review
        setReview(''); // Clear the review textarea
      } else {
        alert('Failed to submit review, please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error.response?.data);
      alert(`Failed to submit review: ${error.response?.data?.message || 'Please try again.'}`);
    }
  };

  const toggleReviewsVisibility = () => {
    setShowReviews(!showReviews);
  };

  if (!movie) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-rating">⭐ Rating: {movie.rating || 'N/A'}</p>

        <textarea
          className="review-textarea"
          placeholder="Write your review here..."
          value={review}
          onChange={handleReviewChange}
        />
        <button className="submit-review-btn" onClick={handleSubmitReview}>Submit Review</button>

        <button className="toggle-reviews-btn" onClick={toggleReviewsVisibility}>
          {showReviews ? 'Hide Reviews' : 'Show Reviews'}
        </button>

        {showReviews && (
          <div className="reviews-section">
            {reviews.length > 0 ? (
              reviews.map((rev, index) => (
                <div key={index} className="user-review">
                  {/* <p><strong>User:</strong> {rev.userId}</p> */}
                  <p><strong>Review:</strong> {rev.reviewText}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet. Be the first to review!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsModal;
