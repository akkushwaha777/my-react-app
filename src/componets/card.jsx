import React, { useState } from 'react';

const Card = ({ title, description, category, details, actionText = 'More Details' }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRead, setIsRead] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handlePurchase = () => {
    setIsPurchased(!isPurchased);
  };

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  const handleRead = () => {
    setIsRead(!isRead);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{description}</p>
        {category && <span className="badge-category">{category}</span>}
        
        {showDetails && details && (
          <div className="card-details">
            {Object.entries(details).map(([key, value]) => (
              <p key={key} className="card-text">
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        )}
      </div>
      
      <div className="card-footer">
        <div className="button-group">
          <button 
            className={`btn-like ${isLiked ? 'active' : ''}`}
            onClick={handleLike}
          >
            {isLiked ? ' Liked' : ' Like'}
          </button>

          <button 
            className={`btn-purchase ${isPurchased ? 'active' : ''}`}
            onClick={handlePurchase}
          >
            {isPurchased ? ' Purchased' : ' Purchase'}
          </button>

          <button 
            className={`btn-complete ${isCompleted ? 'active' : ''}`}
            onClick={handleComplete}
          >
            {isCompleted ? ' Completed' : ' Mark as Done'}
          </button>

          <button 
            className={`btn-read ${isRead ? 'active' : ''}`}
            onClick={handleRead}
          >
            {isRead ? ' Read' : ' Read'}
          </button>

          <button 
            className="btn-expand"
            onClick={toggleDetails}
          >
            {showDetails ? '🔼 Collapse' : '🔽 Expand Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;