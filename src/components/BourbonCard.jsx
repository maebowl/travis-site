import React from 'react';

function BourbonCard({ bourbon, onClick }) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalf = (rating / 2) % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalf) stars += '½';
    return stars;
  };

  return (
    <article className="bourbon-card" onClick={onClick}>
      <div className="image-container">
        {bourbon.image ? (
          <img src={bourbon.image} alt={bourbon.name} />
        ) : (
          <div className="placeholder-bottle" />
        )}
        <div className="rating-badge">
          {bourbon.rating}/10
        </div>
      </div>
      <div className="card-content">
        <div className="distillery">{bourbon.distillery}</div>
        <h3>{bourbon.name}</h3>
        <div className="details">
          <span className="detail-tag">{bourbon.proof} Proof</span>
          <span className="detail-tag">{bourbon.age}</span>
          <span className="detail-tag">{bourbon.type}</span>
        </div>
        <p className="review-preview">"{bourbon.review}"</p>
      </div>
    </article>
  );
}

export default BourbonCard;
