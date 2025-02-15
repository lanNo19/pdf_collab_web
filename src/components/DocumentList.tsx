import React from 'react';

type Document = {
  id: string;
  pdfName: string;
  pdfUrl?: string;
};

interface Props {
  documents: Document[];
}

export const DocumentList: React.FC<Props> = ({ documents }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Your Documents</h2>
      {documents.length === 0 ? (
        <p>No documents available. Create one to get started!</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <a
                href={`#${doc.id}`}
                style={{ textDecoration: 'none', color: '#007BFF' }}
              >
                📄 {doc.pdfName}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
