import React, { useState } from 'react';

interface Props {
  onClose: () => void;
  onCreate: (document: { id: string; pdfName: string; pdfUrl: string; ratings: number[] }) => void;
}

export const CreateDocumentModal: React.FC<Props> = ({ onClose, onCreate }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle PDF file selection
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setPdfFile(file);
        const url = URL.createObjectURL(file);
        setPdfUrl(url);
        setError(null); // Clear error if previously set
      } else {
        setPdfFile(null);
        setPdfUrl(null);
        setError('❌ Please select a valid PDF file.');
      }
    }
  };

  // Create document and pass it to parent
  const handleCreateDocument = () => {
    if (!pdfFile || !pdfUrl) {
      setError('⚠️ Please select a PDF file before creating a document.');
      return;
    }

    const doc = {
      id: `automerge:${Math.random().toString(36).substr(2, 9)}`,
      pdfName: pdfFile.name,
      pdfUrl: pdfUrl,
      ratings: Array(10).fill(0),
    };

    onCreate(doc);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          width: '400px',
          textAlign: 'center',
        }}
      >
        <h3>📎 Upload a PDF Document</h3>

        {/* PDF Upload Input */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          style={{ margin: '10px 0' }}
        />

        {/* Error Message */}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        {/* PDF Preview */}
        {pdfUrl && (
          <div style={{ margin: '20px 0' }}>
            <h4>🔍 PDF Preview:</h4>
            <object data={pdfUrl} type="application/pdf" width="100%" height="300px">
              <p>⚠️ PDF preview not available.</p>
            </object>
          </div>
        )}

        {/* Modal Actions */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            onClick={handleCreateDocument}
            style={{
              padding: '10px 20px',
              backgroundColor: pdfFile ? '#28a745' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: pdfFile ? 'pointer' : 'not-allowed',
            }}
          >
            ➕ Create Document
          </button>

          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
