import React, { useState, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';

interface WikiFile {
  id: string;
  title: string;
  type: 'auto' | 'manual';
  createdAt: string;
  path: string;
}

const STORAGE_KEY = 'fin_knowledge_wiki';

export default function WikiHome(): JSX.Element {
  const history = useHistory();
  const [files, setFiles] = useState<WikiFile[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [generating, setGenerating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFiles(parsed);
        }
      } catch (e) {
        console.error('Failed to parse wiki files:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (showForm && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showForm]);

  const createFile = (title: string, type: 'auto' | 'manual' = 'manual') => {
    if (!title.trim()) {
      alert('请输入文档标题');
      return;
    }
    const id = Date.now().toString();
    const path = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newFile: WikiFile = {
      id,
      title,
      type,
      createdAt: new Date().toLocaleDateString('zh-CN'),
      path,
    };
    const updated = [newFile, ...files];
    setFiles(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNewTitle('');
    setShowForm(false);
    history.push(`/wiki/${path}`);
  };

  const generateWithAI = async () => {
    setGenerating(true);
    const docs = JSON.parse(localStorage.getItem('fin_knowledge_documents') || '[]');
    if (docs.length === 0) {
      alert('请先上传文档');
      setGenerating(false);
      return;
    }

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: `基于以下文档生成知识库摘要：\n\n${docs.map((d: any) => `【${d.title}】\n${d.summary}`).join('\n\n')}`,
          filename: 'wiki-auto',
        }),
      });

      const data = await response.json();
      if (data.success && data.summary) {
        const title = `知识图谱_${new Date().toLocaleDateString('zh-CN')}`;
        createFile(title, 'auto');
      }
    } catch (err) {
      console.error('Generate error:', err);
    }
    setGenerating(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setNewTitle('');
    }
  };

  return (
    <Layout title="Wiki" description="个人知识库">
      <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', margin: 0 }}>个人知识库</h1>
            <p style={{ color: '#666', margin: '0.5rem 0 0' }}>Wiki 层 - AI 自动生成的知识网络</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={generateWithAI}
              disabled={generating}
              style={{
                padding: '0.5rem 1rem',
                background: generating ? '#ccc' : '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: generating ? 'not-allowed' : 'pointer',
              }}
            >
              {generating ? '生成中...' : 'AI 生成摘要'}
            </button>
            <button
              onClick={toggleForm}
              style={{
                padding: '0.5rem 1rem',
                background: '#2e8555',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {showForm ? '取消' : '新建文档'}
            </button>
          </div>
        </div>

        {showForm && (
          <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
            <input
              ref={inputRef}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="输入文档标题，按回车创建"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '0.5rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newTitle.trim()) {
                  createFile(newTitle);
                }
              }}
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => createFile(newTitle)}
                disabled={!newTitle.trim()}
                style={{
                  padding: '0.5rem 1rem',
                  background: newTitle.trim() ? '#2e8555' : '#ccc',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: newTitle.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                创建
              </button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '1rem' }}>
          {files.map((file) => (
            <Link
              key={file.id}
              to={`/wiki/${file.path}`}
              style={{
                display: 'block',
                padding: '1rem',
                background: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: '#1a1a1a' }}>{file.title}</h3>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#666' }}>
                    {file.type === 'auto' ? 'AI 自动生成' : '手动创建'}
                  </p>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#999' }}>{file.createdAt}</span>
              </div>
            </Link>
          ))}
        </div>

        {files.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
            <p>知识库为空</p>
            <p>上传文档或点击「AI 生成摘要」开始构建知识网络</p>
          </div>
        )}
      </div>
    </Layout>
  );
}