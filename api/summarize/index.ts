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

    if (!apiKey) {
      return res.status(500).json({ error: 'API credentials not configured' });
    }

    const response = await fetch('https://api.minimaxi.com/anthropic/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'MiniMax-M2.7',
        max_tokens: 1000,
        system: `你是一个专业的文档摘要助手，擅长分析金融领域的文档并提取关键信息。
请分析用户上传的文档内容，生成结构化的摘要信息，包括：
- title: 文档标题
- summary: 200字以内的摘要
- keywords: 3-5个关键词数组
- category: 建议分类（基金/银行/证券 + 具体场景）

请以JSON格式返回。`,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `请分析以下文档内容，生成结构化的摘要信息：\n\n${String(file).slice(0, 8000)}`
              }
            ]
          }
        ],
      }),
    });

    const data = await response.json();
    console.log('MiniMax response:', JSON.stringify(data));

    let content = '';
    if (data.content && Array.isArray(data.content)) {
      for (const block of data.content) {
        if (block.type === 'text') {
          content = block.text;
          break;
        }
      }
    }

    if (!content) {
      return res.status(200).json({
        success: true,
        summary: {
          title: filename?.replace(/\.[^.]+$/, '') || '文档摘要',
          summary: data.error || '无法生成摘要',
          keywords: [],
          category: '未分类',
        },
      });
    }

    let summary = {
      title: filename?.replace(/\.[^.]+$/, '') || '文档摘要',
      summary: content,
      keywords: [] as string[],
      category: '未分类',
    };

    // 尝试解析JSON
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        summary = { ...summary, ...parsed };
      }
    } catch {
      // 如果不是JSON，保持原内容
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
