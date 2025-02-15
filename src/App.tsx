import React, { useEffect, useState } from 'react';
import { Repo } from '@automerge/automerge-repo';
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel';
import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb';
import { RepoContext } from '@automerge/automerge-repo-react-hooks';
import { DocumentList } from './components/DocumentList';
import { CreateDocumentModal } from './components/CreateDocumentModal';
import { DocumentView } from './views/DocumentView';

type Document = {
  id: string;
  pdfName: string;
  pdfUrl?: string;
  ratings: number[];
};

export const App = ({ initialDocUrl }: { initialDocUrl: string | null }) => {
  const [repo, setRepo] = useState<Repo | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize Automerge Repo
  useEffect(() => {
    const newRepo = new Repo({
      network: [new BroadcastChannelNetworkAdapter()],
      storage: new IndexedDBStorageAdapter(),
    });
    setRepo(newRepo);
  
    // Debugging Automerge initialization
    console.log('🛠️ Automerge repo initialized:', newRepo);
  
    const loadDocuments = async () => {
      const handles = Object.values(newRepo.handles);
      console.log('🔍 Automerge document handles:', handles);
      const docs: Document[] = [];
      for (const handle of handles) {
        const doc = await handle.doc();
        console.log(`📄 Document from handle (${handle.url}):`, doc);
        if (doc) {
          docs.push({
            id: handle.url,
            pdfName: doc.pdfName,
            pdfUrl: doc.pdfUrl,
            ratings: doc.ratings,
          });
        }
      }
      console.log('📋 Loaded documents:', docs);
      setDocuments(docs);
    };
  
    loadDocuments();
  }, []);
  

  // Open modal for document creation
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Add new document
  const addDocument = async (doc: Document) => {
    if (!repo) return;

    const handle = repo.create<Document>({
      id: `automerge:${Math.random().toString(36).substr(2, 9)}`,
      pdfName: doc.pdfName,
      pdfUrl: doc.pdfUrl,
      ratings: Array(10).fill(0),
    });    

    setDocuments((prev) => [...prev, { ...doc, id: handle.url }]);
    handleCloseModal();
  };

  if (initialDocUrl) {
    return <DocumentView docUrl={initialDocUrl} />;
  }
  

  return (
    <RepoContext.Provider value={repo}>
      <div className="app" style={{ padding: '20px' }}>
        <h1>📄 PDF Collaboration App</h1>

        {/* Document List */}
        <DocumentList documents={documents} />

        {/* Create New Document Button */}
        <button
          onClick={handleOpenModal}
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

        {/* Create Document Modal */}
        {isModalOpen && <CreateDocumentModal onClose={handleCloseModal} onCreate={addDocument} />}
      </div>
    </RepoContext.Provider>
  );
};
