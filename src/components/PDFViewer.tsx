import React from 'react';

interface PDFViewerProps {
  pdfUrl: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  console.log('🖼️ PDF Viewer received URL:', pdfUrl);

  if (!pdfUrl) {
    console.warn('⚠️ Missing PDF URL. Check document data.');
    return <div>⚠️ No PDF available. Please check document data.</div>;
  }

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <object data={pdfUrl} type="application/pdf" width="100%" height="100%">
        <p>⚠️ PDF preview not available.</p>
      </object>
    </div>
  );
};
