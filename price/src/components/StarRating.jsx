import React from 'react';

function StarRating({ rating }) {
  const maxStars = 5;
  const filledStars = Math.round(rating); // round rating to nearest integer
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (i <= filledStars) {
      stars.push(<span key={i} style={{ color: '#FFD700' }}>★</span>); // filled star (gold color)
    } else {
      stars.push(<span key={i} style={{ color: '#ccc' }}>☆</span>); // empty star (gray)
    }
  }

  return <div className="star-rating">{stars}</div>;
}

export default StarRating;