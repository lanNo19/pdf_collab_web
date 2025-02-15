import React, { useEffect, useState } from 'react';
import { Repo } from '@automerge/automerge-repo';
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel';
import { RepoContext } from '@automerge/automerge-repo-react-hooks';

type Document = {
  pdfName: string;
  ratings: number[];
};

export const App = () => {
  const [repo, setRepo] = useState<Repo | null>(null);
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [documents, setDocuments] = useState<string[]>([]);

  useEffect(() => {
    const newRepo = new Repo({
      network: [new BroadcastChannelNetworkAdapter()],
    });
    setRepo(newRepo);
  }, []);

  const createDocument = () => {
    if (!repo) return;
    const handle = repo.create<Document>({
      pdfName: 'New PDF Document',
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

        {/* Create Document Button */}
        <button
          onClick={createDocument}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          ➕ Create New Document
        </button>

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
                cursor: 'pointer',
                marginTop: '10px',
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
