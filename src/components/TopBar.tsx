import React, { useState } from 'react';

interface TopBarProps {
  documentUrl: string;
  onBack: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ documentUrl, onBack }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const copyLink = () => {
    const link = `${window.location.origin}/#${documentUrl}`;
    navigator.clipboard.writeText(link);
    alert(`🔗 Link copied: ${link}`);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 20px',
      backgroundColor: '#f3f4f6',
      borderBottom: '1px solid #ccc',
    }}>
      {/* Back Button */}
      <button
        onClick={onBack}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        🔙 Back to Menu
      </button>

      {/* Share Link */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={toggleDropdown}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          🔗 Share Link
        </button>

        {showDropdown && (
          <div style={{
            position: 'absolute',
            top: '40px',
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            width: '250px',
            zIndex: 5,
          }}>
            <p style={{ wordWrap: 'break-word' }}>
              {`${window.location.origin}/#${documentUrl}`}
            </p>
            <button
              onClick={copyLink}
              style={{
                marginTop: '10px',
                padding: '5px 10px',
                backgroundColor: '#FF9800',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              📋 Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
