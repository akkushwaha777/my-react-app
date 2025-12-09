import React, { useState } from 'react';

const Card = ({ title, description, category, details, actionText = 'More Details' }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
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
        <button className="badge" onClick={toggleDetails}>
          {showDetails ? 'Hide Details' : actionText}
        </button>
      </div>
    </div>
  );
};

export default Card;