import { useState, useEffect } from 'react';

export interface Document {
  id: string;
  filename: string;
  title: string;
  summary: string;
  keywords: string[];
  category: string;
  uploadDate: string;
}

const STORAGE_KEY = 'fin_knowledge_documents';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setDocuments(JSON.parse(stored));
      } catch {
        setDocuments([]);
      }
    }
  }, []);

  const addDocument = (doc: Omit<Document, 'id' | 'uploadDate'>) => {
    const newDoc: Document = {
      ...doc,
      id: Date.now().toString(),
      uploadDate: new Date().toLocaleDateString('zh-CN'),
    };
    const updated = [newDoc, ...documents];
    setDocuments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteDocument = (id: string) => {
    const updated = documents.filter(d => d.id !== id);
    setDocuments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { documents, addDocument, deleteDocument };
}
