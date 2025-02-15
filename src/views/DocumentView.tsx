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
  const [doc, changeDoc] = useDocument<Document>(`automerge:${docId}` as AutomergeUrl);
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
      <TopBar documentUrl={doc.id} onBack={() => (window.location.href = '/')} />
      
      {/* Main Content: PDF + Rating Panel */}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {/* PDF Viewer */}
        <PDFViewer pdfUrl={doc.pdfUrl} />

        {/* Rating Panel */}
        <RatingPanel ratings={doc.ratings} onRate={handleRate} isOwner={isOwner} />
      </div>
    </div>
  );
};
