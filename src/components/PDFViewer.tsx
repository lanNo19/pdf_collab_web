import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface PDFViewerProps {
  pdfUrl: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  console.log('🖼️ PDF Viewer received URL:', pdfUrl);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  if (!pdfUrl) {
    return <div>⚠️ No PDF available.</div>;
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${window['pdfjs-dist-version']}/build/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
};
