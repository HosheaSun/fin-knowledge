import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const articles = {
  fund: [
    { id: 'money-market-fund', title: '货币基金业务解析', desc: '申购赎回流程详解' },
    { id: 'equity-fund', title: '权益基金业务解析', desc: '主动管理型基金投资策略' },
    { id: 'etf-fund', title: 'ETF基金业务解析', desc: '交易型开放式指数基金运作机制' },
    { id: 'fund-sales', title: '基金销售与认购流程', desc: '募集发行全流程解析' },
    { id: 'fund-nav', title: '基金净值计算与披露', desc: '净值计算方法与披露规范' },
    { id: 'fund-dividend', title: '基金分红与拆分', desc: '分红方式选择与折算机制' },
    { id: 'fund-dca', title: '基金定投业务解析', desc: '定期定额投资运作模式' },
    { id: 'fund-convert', title: '基金转换与赎回', desc: '转换规则与赎回流程' },
    { id: 'fund-performance', title: '基金业绩评价体系', desc: '评估指标与归因分析' },
    { id: 'fund-risk', title: '基金风控体系', desc: '风控体系与合规运营' },
  ],
  bank: [
    { id: 'loan', title: '贷款业务解析', desc: '银行贷款业务流程与风控' },
    { id: 'credit-card', title: '信用卡业务解析', desc: '生命周期管理与风控' },
    { id: 'wealth-management', title: '理财业务解析', desc: '理财产品设计与销售' },
    { id: 'deposit', title: '存款业务解析', desc: '存款产品与利率定价' },
    { id: 'payment', title: '支付结算体系', desc: '支付清算系统架构' },
    { id: 'alm', title: '资产负债管理', desc: '期限错配与风险对冲' },
    { id: 'core-system', title: '银行核心系统架构', desc: '核心系统演进与设计' },
    { id: 'bank-risk', title: '银行风控体系', desc: '全面风险管理体系' },
    { id: 'bank-data', title: '银行数据分析平台', desc: '数据中台与智能分析' },
    { id: 'open-bank', title: '开放银行架构', desc: '开放API与生态合作' },
  ],
  securities: [
    { id: 'account-opening', title: '证券开户业务解析', desc: '适当性与资金账户管理' },
    { id: 'stock-trading', title: '股票交易流程', desc: '委托下单到清算交收' },
    { id: 'futures-options', title: '期货与期权业务', desc: '保证金管理与风险控制' },
    { id: 'ibanking', title: '投行业务解析', desc: '承销与并购咨询' },
    { id: 'asset-management', title: '资产管理业务', desc: '券商资管产品设计' },
    { id: 'sec-risk', title: '证券风控体系', desc: '合规风控体系建设' },
    { id: 'sec-data', title: '证券数据分析平台', desc: '实时行情与数据架构' },
    { id: 'quant', title: '量化投资架构', desc: '量化策略与系统设计' },
    { id: 'margin', title: '融资融券业务', desc: '两融准入与风险监控' },
    { id: 'clearing', title: '证券清算结算体系', desc: '清算交收流程与架构' },
  ],
};

function ArticleCard({ article, basePath }: { article: typeof articles.fund[0]; basePath: string }) {
  return (
    <Link
      to={`/docs/${basePath}/${article.id}`}
      style={{
        display: 'block',
        padding: '0.75rem',
        background: '#fff',
        borderRadius: '4px',
        textDecoration: 'none',
        color: 'inherit',
        borderBottom: '1px solid #eee',
      }}
    >
      <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 500 }}>{article.title}</h3>
      <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#666' }}>{article.desc}</p>
    </Link>
  );
}

function IndustryColumn({ title, articles, basePath, borderColor }: { title: string; articles: typeof fund; basePath: string; borderColor: string }) {
  return (
    <div style={{
      flex: 1,
      minWidth: 280,
      maxWidth: 400,
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '0.75rem 1rem',
        background: borderColor,
        color: '#fff',
      }}>
        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{title}</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} basePath={basePath} />
        ))}
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title="首页" description="金融解决方案知识库">
      <header style={{ textAlign: 'center', padding: '2rem 1rem', background: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
        <h1 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: '#1a1a1a' }}>金融解决方案知识库</h1>
        <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>基金 · 银行 · 证券 业务场景深度拆解</p>
      </header>
      <main style={{ padding: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <IndustryColumn title="基金行业" articles={articles.fund} basePath="fund" borderColor="#2e8555" />
        <IndustryColumn title="银行行业" articles={articles.bank} basePath="bank" borderColor="#1976d2" />
        <IndustryColumn title="证券行业" articles={articles.securities} basePath="securities" borderColor="#f57c00" />
      </main>
    </Layout>
  );
}
