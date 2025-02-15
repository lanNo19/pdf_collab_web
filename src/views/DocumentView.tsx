import React, { useEffect, useState } from 'react';
import { useDocument } from '@automerge/automerge-repo-react-hooks';
import { PDFViewer } from '../components/PDFViewer';
import { RatingPanel } from '../components/RatingPanel';
import { TopBar } from '../components/TopBar';
import { AutomergeUrl } from '@automerge/automerge-repo';

interface Document {
  pdfName: string;
  pdfUrl: string;
  ratings: number[];
}

export const DocumentView = ({ docUrl }: { docUrl: string }) => {
  // Cast the string to AutomergeUrl
  const [doc, changeDoc] = useDocument<Document>(docUrl as AutomergeUrl);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    if (doc) {
      // Simulate ownership check
      setIsOwner(Math.random() > 0.5);
    }
  }, [doc]);

  const handleRate = (index: number, score: number) => {
    changeDoc((draft) => {
      draft.ratings[index] = (draft.ratings[index] + score) / 2;
    });
  };

  if (!doc) return <div>Loading document...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBar documentUrl={docUrl} onBack={() => (window.location.hash = '')} />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <PDFViewer pdfUrl={doc.pdfUrl} />
        <RatingPanel ratings={doc.ratings} onRate={handleRate} isOwner={isOwner} />
      </div>
    </div>
  );
};
