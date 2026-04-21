import React, {useState} from 'react';
import axios from 'axios';

interface UploadResponse {
  success: boolean;
  filename: string;
  summary?: {
    title: string;
    summary: string;
    keywords: string[];
    category: string;
  };
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post<UploadResponse>('/api/summarize', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      setResult(response.data);
    } catch (err) {
      setError('上传失败，请重试');
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

      {result && (
        <div style={{margin: '2rem 0', padding: '1.5rem', background: '#f0f8f0', borderRadius: '8px'}}>
          <h2>AI 摘要结果</h2>
          <h3>{result.summary?.title || result.filename}</h3>
          <p><strong>摘要:</strong> {result.summary?.summary}</p>
          <p><strong>关键词:</strong> {result.summary?.keywords?.join(', ')}</p>
          <p><strong>建议分类:</strong> {result.summary?.category}</p>
        </div>
      )}
    </div>
  );
}
