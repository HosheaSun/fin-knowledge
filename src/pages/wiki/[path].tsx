import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';

interface WikiFile {
  id: string;
  title: string;
  type: 'auto' | 'manual';
  createdAt: string;
  path: string;
  content: string;
}

const STORAGE_KEY = 'fin_knowledge_wiki';

export default function WikiEdit(): JSX.Element {
  const location = useLocation();
  const history = useHistory();

  // Extract path from URL - handle both /wiki/path and /wiki/path/
  const path = decodeURIComponent(location.pathname.replace(/^\/wiki\//, '').replace(/\/$/, ''));

  const [file, setFile] = useState<WikiFile | null>(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    console.log('WikiEdit mounted, path:', path);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const files: WikiFile[] = JSON.parse(stored);
        console.log('Found files:', files.length);
        const found = files.find((f) => f.path === path);
        if (found) {
          console.log('Found file:', found.title);
          setFile(found);
          setTitle(found.title);
          setContent(found.content || `# ${found.title}\n\n在此编辑内容...\n`);
        } else {
          console.log('File not found for path:', path);
        }
      } catch (e) {
        console.error('Failed to parse wiki files:', e);
      }
    }
  }, [path]);

  const saveFile = () => {
    if (!file) return;
    setSaving(true);

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const files: WikiFile[] = JSON.parse(stored);
        const updated = files.map((f) =>
          f.id === file.id ? { ...f, title, content } : f
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setFile({ ...file, title, content });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (e) {
        console.error('Failed to save:', e);
      }
    }
    setSaving(false);
  };

  const deleteFile = () => {
    if (!file) return;
    if (!confirm('确定删除此文档？')) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const files: WikiFile[] = JSON.parse(stored);
        const updated = files.filter((f) => f.id !== file.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        history.push('/wiki');
      } catch (e) {
        console.error('Failed to delete:', e);
      }
    }
  };

  if (!file) {
    return (
      <Layout title="加载中">
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>文档不存在</p>
          <p style={{ color: '#999', fontSize: '0.9rem' }}>Path: {path}</p>
          <a href="/wiki" style={{ color: '#2e8555' }}>返回知识库</a>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={title} description="Wiki 编辑器">
      <div style={{ padding: '1rem', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              border: 'none',
              borderBottom: '2px solid #2e8555',
              padding: '0.25rem 0',
              width: '60%',
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {saved && <span style={{ color: '#2e8555', alignSelf: 'center' }}>已保存</span>}
            <button
              onClick={saveFile}
              disabled={saving}
              style={{
                padding: '0.5rem 1rem',
                background: saving ? '#ccc' : '#2e8555',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? '保存中...' : '保存'}
            </button>
            <button
              onClick={deleteFile}
              style={{
                padding: '0.5rem 1rem',
                background: '#d32f2f',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              删除
            </button>
            <button
              onClick={() => history.push('/wiki')}
              style={{
                padding: '0.5rem 1rem',
                background: '#999',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              返回
            </button>
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: '100%',
            minHeight: '500px',
            padding: '1rem',
            fontSize: '0.95rem',
            fontFamily: 'Menlo, Monaco, Consolas, monospace',
            border: '1px solid #ddd',
            borderRadius: '8px',
            resize: 'vertical',
            outline: 'none',
            lineHeight: 1.6,
            boxSizing: 'border-box',
          }}
        />

        <div style={{ marginTop: '1rem', color: '#999', fontSize: '0.8rem' }}>
          支持 Markdown 格式 | {file.type === 'auto' ? 'AI 自动生成' : '手动创建'}
        </div>
      </div>
    </Layout>
  );
}