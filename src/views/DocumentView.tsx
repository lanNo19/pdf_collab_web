import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDocument } from '@automerge/automerge-repo-react-hooks';
import { PDFViewer } from '../components/PDFViewer';
import { AutomergeUrl } from '@automerge/automerge-repo';

// Document interface
interface Document {
  id: string;
  pdfName: string;
  pdfUrl: string;
  ratings: number[];
}

export const DocumentView: React.FC = () => {
  const { docId } = useParams<{ docId: string }>();
  const [doc, changeDoc] = useDocument<Document>(docId as AutomergeUrl);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  // Debugging
  useEffect(() => {
    console.log(`🔍 Attempting to load document with ID: ${docId}`);
    if (doc) {
      console.log('✅ Document loaded:', doc);
      console.log('🔗 PDF URL:', doc.pdfUrl);
      setIsOwner(Math.random() > 0.5); // Temporary ownership check
    } else {
      console.warn('⚠️ Document not found for ID:', docId);
    }
  }, [doc, docId]);

  // Render loading state if document isn't ready
  if (!doc) {
    return <div>Loading document...</div>;
  }

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex' }}>
      {/* PDF Viewer */}
      <div style={{ flex: 4, height: '100%' }}>
        <PDFViewer pdfUrl={doc.pdfUrl} />
      </div>

      {/* Rating Panel */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          borderLeft: '3px solid #ccc',
          padding: '20px',
          boxSizing: 'border-box',
          overflowY: 'auto',
        }}
      >
        <h3>📊 Average Ratings</h3>
        {doc.ratings.map((score, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>Quality {index + 1}:</strong> {score.toFixed(2)}
          </div>
        ))}
        {!isOwner && (
          <div>
            <h4>Rate Qualities:</h4>
            {doc.ratings.map((_, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                <label>Quality {index + 1}: </label>
                {[1, 2, 3, 4].map((score) => (
                  <button
                    key={score}
                    style={{
                      margin: '0 5px',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      border: '1px solid #007BFF',
                      background: '#007BFF',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      changeDoc((draft) => {
                        draft.ratings[index] = (draft.ratings[index] + score) / 2;
                      });
                    }}
                  >
                    {score}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
