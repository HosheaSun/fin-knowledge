import React from 'react';

interface Document {
  id: string;
  filename: string;
  title: string;
  summary: string;
  keywords: string[];
  category: string;
  uploadDate: string;
}

interface DocumentCardProps {
  document: Document;
}

export default function DocumentCard({document}: DocumentCardProps) {
  return (
    <div
      style={{
        padding: '1.5rem',
        margin: '1rem 0',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h3 style={{marginBottom: '0.5rem', color: '#2e8555'}}>{document.title}</h3>
      <p style={{color: '#666', fontSize: '0.9rem', marginBottom: '1rem'}}>
        {document.summary}
      </p>
      <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem'}}>
        {document.keywords.map((keyword) => (
          <span
            key={keyword}
            style={{
              padding: '0.25rem 0.75rem',
              background: '#e8f5e9',
              color: '#2e8555',
              borderRadius: '16px',
              fontSize: '0.8rem',
            }}
          >
            {keyword}
          </span>
        ))}
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', color: '#999', fontSize: '0.8rem'}}>
        <span>{document.category}</span>
        <span>{document.uploadDate}</span>
      </div>
    </div>
  );
}
