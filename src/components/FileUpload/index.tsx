import React, {useState} from 'react';
import axios from 'axios';

interface UploadResponse {
  success: boolean;
  summary?: {
    title: string;
    summary: string;
    keywords: string[];
    category: string;
  };
  error?: string;
}

const STORAGE_KEY = 'fin_knowledge_documents';

interface Document {
  id: string;
  filename: string;
  title: string;
  summary: string;
  keywords: string[];
  category: string;
  uploadDate: string;
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setError(null);
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const fileContent = await file.text();

      const response = await axios.post<UploadResponse>('/api/summarize', {
        file: fileContent,
        filename: file.name,
      });

      if (response.data.success && response.data.summary) {
        // 保存到 localStorage
        const doc: Document = {
          id: Date.now().toString(),
          filename: file.name,
          title: response.data.summary.title || file.name.replace(/\.[^.]+$/, ''),
          summary: response.data.summary.summary,
          keywords: response.data.summary.keywords || [],
          category: response.data.summary.category || '未分类',
          uploadDate: new Date().toLocaleDateString('zh-CN'),
        };

        const stored = localStorage.getItem(STORAGE_KEY);
        const docs: Document[] = stored ? JSON.parse(stored) : [];
        docs.unshift(doc);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));

        setSuccess(true);
        setFile(null);
      } else {
        setError(response.data.error || '上传失败');
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || '上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{padding: '2rem'}}>
      <h1>上传文档</h1>
      <p>上传 PDF、Word 或 Markdown 文件，AI 将自动生成摘要</p>

      <div style={{margin: '2rem 0'}}>
        <input type="file" onChange={handleFileChange} accept=".pdf,.docx,.md,.txt" />
      </div>

      {file && (
        <div style={{margin: '1rem 0', padding: '1rem', background: '#f5f5f5', borderRadius: '8px'}}>
          <p><strong>已选择:</strong> {file.name}</p>
          <p><strong>大小:</strong> {(file.size / 1024).toFixed(2)} KB</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: file && !uploading ? '#2e8555' : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: file && !uploading ? 'pointer' : 'not-allowed',
        }}
      >
        {uploading ? '处理中...' : '上传并生成摘要'}
      </button>

      {error && (
        <div style={{margin: '1rem 0', padding: '1rem', background: '#fee', color: '#c00', borderRadius: '8px'}}>
          {error}
        </div>
      )}

      {success && (
        <div style={{margin: '1rem 0', padding: '1rem', background: '#e8f5e9', color: '#2e8555', borderRadius: '8px'}}>
          <p><strong>上传成功！</strong> 文档已保存到文档库。</p>
          <p style={{marginTop: '0.5rem'}}>
            <a href="/documents" style={{color: '#2e8555'}}>点击查看文档库 →</a>
          </p>
        </div>
      )}
    </div>
  );
}
