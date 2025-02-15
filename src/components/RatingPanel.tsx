import React, { useState } from 'react';

const qualities = [
  'Evolvability', 'Maintainability', 'Performance', 'Security', 'Scalability',
  'Usability', 'Reliability', 'Testability', 'Portability', 'Extensibility'
];

interface RatingPanelProps {
  ratings: number[];
  onRate: (index: number, score: number) => void;
  isOwner: boolean;
}

export const RatingPanel: React.FC<RatingPanelProps> = ({ ratings, onRate, isOwner }) => {
  const [userRatings, setUserRatings] = useState<number[]>(Array(10).fill(0));

  const handleRating = (index: number, score: number) => {
    if (isOwner) return;

    const updatedRatings = [...userRatings];
    updatedRatings[index] = score;
    setUserRatings(updatedRatings);

    // Trigger the callback to update Automerge document
    onRate(index, score);
  };

  return (
    <div style={{
      width: '20%',
      height: 'calc(100vh - 50px)',
      padding: '10px',
      backgroundColor: '#f0f2f5',
      borderLeft: '1px solid #ccc',
      overflowY: 'auto',
    }}>
      <h4>📊 Document Ratings</h4>

      {qualities.map((quality, index) => (
        <div key={index} style={{ margin: '15px 0' }}>
          <p>{quality}: <strong>{ratings[index].toFixed(2)}</strong></p>
          {!isOwner && (
            <div>
              {[1, 2, 3, 4].map((score) => (
                <button
                  key={score}
                  onClick={() => handleRating(index, score)}
                  style={{
                    margin: '4px',
                    padding: '5px 10px',
                    backgroundColor: userRatings[index] === score ? '#007BFF' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {score}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
