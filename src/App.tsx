import React, { useEffect, useState } from 'react';
import { Repo } from '@automerge/automerge-repo';
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel';
import { RepoContext } from '@automerge/automerge-repo-react-hooks';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

type Document = {
  pdfName: string;
  pdfData?: string; // Base64 string of the PDF
  ratings: number[];
};

export const App = () => {
  const [repo, setRepo] = useState<Repo | null>(null);
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [documents, setDocuments] = useState<string[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const newRepo = new Repo({
      network: [new BroadcastChannelNetworkAdapter()],
    });
    setRepo(newRepo);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    } else {
      alert('Please upload a valid PDF file!');
    }
  };

  const createDocument = async () => {
    if (!repo || !pdfFile) {
      alert('Please select a PDF file first!');
      return;
    }

    // Convert PDF to Base64
    const reader = new FileReader();
    reader.readAsDataURL(pdfFile);
    reader.onload = () => {
      const pdfBase64 = reader.result as string;
      const handle = repo.create<Document>({
        pdfName: pdfFile.name,
        pdfData: pdfBase64,
        ratings: Array(10).fill(0),
      });
      setDocUrl(handle.url);
      setDocuments((prev) => [...prev, handle.url]);
    };
  };

  return (
    <RepoContext.Provider value={repo}>
      <div className="app" style={{ padding: '20px' }}>
        <h1>📄 PDF Collaboration App</h1>

        {/* Document List */}
        <div>
          <h2>Your Documents</h2>
          <ul>
            {documents.map((url, index) => (
              <li key={index}>
                <a href={`#${url}`} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* PDF Upload */}
        <div style={{ marginTop: '20px' }}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            style={{ marginBottom: '10px' }}
          />
          {pdfUrl && (
            <div style={{ margin: '20px 0' }}>
              <h3>Preview:</h3>
              <div style={{ height: '400px', border: '1px solid #000' }}>
                <Viewer fileUrl={pdfUrl} />
              </div>
            </div>
          )}
          <button
            onClick={createDocument}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: pdfFile ? '#007BFF' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: pdfFile ? 'pointer' : 'not-allowed',
            }}
          >
            ➕ Create Document with PDF
          </button>
        </div>

        {/* Shareable Link */}
        {docUrl && (
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => {
                const link = `${window.location.origin}/#${docUrl}`;
                navigator.clipboard.writeText(link);
                alert(`Link copied: ${link}`);
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginTop: '10px',
                cursor: 'pointer',
              }}
            >
              📎 Copy Shareable Link
            </button>
          </div>
        )}
      </div>
    </RepoContext.Provider>
  );
};
