import React, { useEffect, useState } from 'react';
import { Repo } from '@automerge/automerge-repo';
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel';
import { RepoContext } from '@automerge/automerge-repo-react-hooks';

type Document = {
  pdfName: string;
  pdfUrl?: string;
  ratings: number[];
};

export const App = () => {
  const [repo, setRepo] = useState<Repo | null>(null);
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [documents, setDocuments] = useState<string[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Initialize Automerge Repo
  useEffect(() => {
    const newRepo = new Repo({
      network: [new BroadcastChannelNetworkAdapter()],
    });
    setRepo(newRepo);
  }, []);

  // Handle PDF file selection
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    } else {
      alert('Please upload a valid PDF file!");
    }
  };

  const createDocument = () => {
    if (!repo || !pdfUrl) {
      alert('Please upload a PDF first!');
      return;
    }

    const handle = repo.create<Document>({
      pdfName: 'Uploaded PDF',
      pdfUrl: pdfUrl,
      ratings: Array(10).fill(0),
    });
    setDocUrl(handle.url);
    setDocuments((prev) => [...prev, handle.url]);
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
              <h3>PDF Preview:</h3>
              <object data={pdfUrl} type="application/pdf" width="100%" height="500px">
                <p>PDF preview not available. Please check the file.</p>
              </object>
            </div>
          )}
          <button
            onClick={createDocument}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: pdfUrl ? '#007BFF' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: pdfUrl ? 'pointer' : 'not-allowed',
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
