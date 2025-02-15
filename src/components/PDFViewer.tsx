import React from 'react';

interface PDFViewerProps {
  pdfUrl: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  return (
    <div style={{ width: '80%', height: 'calc(100vh - 50px)', overflow: 'auto' }}>
      <object data={pdfUrl} type="application/pdf" width="100%" height="100%">
        <p>⚠️ PDF preview not available. Please check the file.</p>
      </object>
    </div>
  );
};
