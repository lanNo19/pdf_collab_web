import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDocument } from '@automerge/automerge-repo-react-hooks';
import { PDFViewer } from '../components/PDFViewer';
import { RatingPanel } from '../components/RatingPanel';
import { TopBar } from '../components/TopBar';
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

  // Handle rating changes
  const handleRate = (index: number, score: number) => {
    changeDoc((draft) => {
      if (draft.ratings) {
        draft.ratings[index] = (draft.ratings[index] + score) / 2;
      }
    });
  };

  // Render loading state if document isn't ready
  if (!doc) {
    return <div>Loading document...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top Bar */}
      <TopBar documentUrl={doc.id} onBack={() => (window.location.href = '/automerge-repo-quickstart')} />

      {/* Main Content: PDF + Rating Panel */}
      <div style={{ display: 'flex', flexGrow: 1, width: '100%' }}>
        {/* PDF Viewer */}
        <div style={{ flex: '4 1 80%', height: '100%' }}>
          <PDFViewer pdfUrl={doc.pdfUrl} />
        </div>

        {/* Rating Panel */}
        <div style={{
          flex: '1 1 20%',
          height: '100%',
          backgroundColor: '#f0f2f5',
          borderLeft: '2px solid #ccc',
          boxSizing: 'border-box',
          overflowY: 'auto',
          padding: '10px'
        }}>
          <h3>📊 Average Ratings</h3>
          {doc.ratings.map((score, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <strong>Quality {index + 1}</strong>: {score.toFixed(2)}
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
                      style={{ margin: '0 5px', padding: '3px 6px' }}
                      onClick={() => handleRate(index, score)}
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
    </div>
  );
};
