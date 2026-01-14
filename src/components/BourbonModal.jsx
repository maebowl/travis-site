import React from 'react';

function BourbonModal({ bourbon, onClose }) {
  if (!bourbon) return null;

  const renderStars = (rating) => {
    const normalized = rating / 2; // Convert 10-scale to 5-scale
    const fullStars = Math.floor(normalized);
    const hasHalf = normalized % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      '★'.repeat(fullStars) +
      (hasHalf ? '½' : '') +
      '☆'.repeat(emptyStars)
    );
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-image">
          {bourbon.image ? (
            <img src={bourbon.image} alt={bourbon.name} />
          ) : (
            <div className="placeholder-bottle" style={{ transform: 'scale(1.5)' }} />
          )}
        </div>

        <div className="modal-content">
          <div className="distillery">{bourbon.distillery}</div>
          <h2>{bourbon.name}</h2>

          <div className="modal-details">
            <div className="modal-detail">
              <div className="value">{bourbon.proof}</div>
              <div className="label">Proof</div>
            </div>
            <div className="modal-detail">
              <div className="value">{bourbon.age}</div>
              <div className="label">Age</div>
            </div>
            <div className="modal-detail">
              <div className="value">{bourbon.price}</div>
              <div className="label">Price</div>
            </div>
            <div className="modal-detail">
              <div className="value">{bourbon.acquired}</div>
              <div className="label">Acquired</div>
            </div>
          </div>

          <div className="modal-section">
            <h4>🥃 Tasting Notes</h4>
            <div className="tasting-notes">
              {bourbon.tastingNotes.map((note, index) => (
                <span key={index} className="tasting-note">{note}</span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h4>⭐ My Rating</h4>
            <div className="rating-display">
              <span className="rating-score">{bourbon.rating}</span>
              <span className="rating-stars">{renderStars(bourbon.rating)}</span>
            </div>
          </div>

          <div className="modal-section">
            <h4>📝 My Review</h4>
            <p>{bourbon.review}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BourbonModal;
