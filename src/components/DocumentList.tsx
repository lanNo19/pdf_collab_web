import React from 'react';

// Define the Document interface
interface Document {
  id: string;
  pdfName: string;
  pdfUrl: string;
  ratings: number[];
}

interface DocumentListProps {
  documents: Document[];
}

export const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>📑 Your Documents</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {documents.length === 0 ? (
          <li>No documents found.</li>
        ) : (
          documents.map((doc) => (
            <li key={doc.id} style={{ margin: '10px 0' }}>
              <a
                href={`/automerge-repo-quickstart/document/${doc.id.replace('automerge:', '')}`}
                style={{
                  textDecoration: 'underline',
                  color: '#007BFF',
                  cursor: 'pointer',
                }}
              >
                📄 {doc.pdfName}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
