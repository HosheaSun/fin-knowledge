import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { file, filename } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'Missing file content' });
    }

    const apiKey = process.env.MINIMAX_API_KEY;
    const groupId = process.env.MINIMAX_GROUP_ID;

    if (!apiKey || !groupId) {
      return res.status(500).json({ error: 'API credentials not configured' });
    }

    const response = await fetch('https://api.minimax.chat/v1/text/chatcompletion_pro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'abab6.5s-chat',
        messages: [
          {
            role: 'system',
            content: `你是一个文档摘要助手。请分析用户上传的文档内容，生成：
1. 标题（如果文档没有明确标题）
2. 摘要（100-200字）
3. 关键词（3-5个）
4. 建议分类（基金/银行/证券 + 具体场景）

以 JSON 格式返回：
{
  "title": "文档标题",
  "summary": "摘要内容",
  "keywords": ["关键词1", "关键词2", "关键词3"],
  "category": "分类建议"
}`,
          },
          {
            role: 'user',
            content: `请分析以下文档内容：\n\n${String(file).slice(0, 10000)}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    let summary = {
      title: filename?.replace(/\.[^.]+$/, '') || '文档摘要',
      summary: '摘要生成失败',
      keywords: [],
      category: '未分类',
    };

    if (content) {
      try {
        const parsed = JSON.parse(content);
        summary = { ...summary, ...parsed };
      } catch {
        summary.summary = content;
      }
    }

    return res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error('Summarize error:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
}
