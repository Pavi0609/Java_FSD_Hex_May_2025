import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/review/get-all');
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <h2 style={styles.header}>Customer Reviews</h2>
        <p>Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <h2 style={styles.header}>Customer Reviews</h2>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Customer Reviews</h2>
      
      <div style={styles.reviewsContainer}>
        {reviews.map((review) => (
          <div key={review.reviewId} style={styles.reviewCard}>
            <div style={styles.ratingContainer}>
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  style={{
                    ...styles.star,
                    color: i < parseInt(review.rating) ? '#FFD700' : '#ddd'
                  }}
                >
                </span>
              ))}
              <span style={styles.ratingText}>{review.rating}/5</span>
            </div>
            
            <p style={styles.comment}>{review.comment}</p>
            
            <div style={styles.customerInfo}>
              <p style={styles.customerName}>
                <strong>Customer:</strong> {review.proposal.customer.customerName}
              </p>
              <p style={styles.vehicleInfo}>
                <strong>Vehicle:</strong> {review.proposal.vehicleModel} ({review.proposal.vehicleType})
              </p>
              <p style={styles.policyInfo}>
                <strong>Policy:</strong> {review.proposal.policy.policyName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Style.CSS
const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    color: '#2c3e50',
    marginBottom: '2rem',
    fontSize: '1.8rem',
    borderBottom: '2px solid #eee',
    paddingBottom: '0.5rem'
  },
  reviewsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem'
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-3px)'
    }
  },
  ratingContainer: {
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center'
  },
  star: {
    fontSize: '1.5rem',
    marginRight: '0.2rem'
  },
  ratingText: {
    marginLeft: '0.5rem',
    fontWeight: 'bold',
    color: '#555'
  },
  comment: {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#333',
    marginBottom: '1rem'
  },
  customerInfo: {
    borderTop: '1px solid #eee',
    paddingTop: '1rem',
    fontSize: '0.9rem'
  },
  customerName: {
    margin: '0.3rem 0',
    color: '#444'
  },
  vehicleInfo: {
    margin: '0.3rem 0',
    color: '#555'
  },
  policyInfo: {
    margin: '0.3rem 0',
    color: '#555'
  }
};

export default Review;