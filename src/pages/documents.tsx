import React, { useState, useEffect } from 'react';

interface Doc {
  id: string;
  filename: string;
  title: string;
  summary: string;
  keywords: string[];
  category: string;
  uploadDate: string;
}

export default function Documents() {
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('fin_knowledge_documents');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setDocs(parsed);
        }
      } catch (e) {
        console.error('Failed to parse documents:', e);
      }
    }
  }, []);

  if (docs.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
        <p>暂无文档</p>
        <p><a href="/upload">上传第一个文档</a></p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <p style={{ marginBottom: '2rem', color: '#666' }}>共 {docs.length} 篇文档</p>
      {docs.map((doc) => {
        const kwArray = Array.isArray(doc.keywords) ? doc.keywords : [];
        return (
          <div key={doc.id} style={{
            padding: '1.5rem',
            margin: '1rem 0',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: '#2e8555' }}>
              {String(doc.title || '')}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {String(doc.summary || '')}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {kwArray.map((kw, i) => (
                <span key={i} style={{
                  padding: '0.25rem 0.75rem',
                  background: '#e8f5e9',
                  color: '#2e8555',
                  borderRadius: '16px',
                  fontSize: '0.8rem',
                }}>
                  {String(kw)}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#999', fontSize: '0.8rem' }}>
              <span>{String(doc.category || '')}</span>
              <span>{String(doc.uploadDate || '')}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
