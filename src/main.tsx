import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { DocumentView } from './views/DocumentView';
import { Repo } from '@automerge/automerge-repo';
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel';
import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb';
import { RepoContext } from '@automerge/automerge-repo-react-hooks';
import './index.css';

const Main = () => {
  // Initialize the Automerge Repo here
  const [repo, setRepo] = useState<Repo | null>(null);

  useEffect(() => {
    const newRepo = new Repo({
      network: [new BroadcastChannelNetworkAdapter()],
      storage: new IndexedDBStorageAdapter(),
    });
    console.log('🛠️ Automerge repo initialized:', newRepo);
    setRepo(newRepo);
  }, []);

  if (!repo) {
    return <div>🔄 Initializing Automerge Repo...</div>;
  }

  return (
    <RepoContext.Provider value={repo}>
      <BrowserRouter basename="/automerge-repo-quickstart">
        <Routes>
          <Route path="/" element={<App initialDocUrl={null} />} />
          <Route path="/document/:docId" element={<DocumentView />} />
        </Routes>
      </BrowserRouter>
    </RepoContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
