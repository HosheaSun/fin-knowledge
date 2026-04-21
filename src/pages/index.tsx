import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const articles = {
  fund: [
    { id: 'money-market-fund', title: '货币基金业务解析', desc: '货币基金的定义、运作机制、申购赎回流程详解' },
    { id: 'equity-fund', title: '权益基金业务解析', desc: '主动管理型基金的投资策略与运营流程' },
    { id: 'etf-fund', title: 'ETF基金业务解析', desc: '交易型开放式指数基金的运作与交易机制' },
    { id: 'fund-sales', title: '基金销售与认购流程', desc: '基金募集、认购、申购的全流程解析' },
    { id: 'fund-nav', title: '基金净值计算与披露', desc: '基金净值计算方法与信息披露规范' },
    { id: 'fund-dividend', title: '基金分红与拆分', desc: '基金分红方式选择与拆分折算机制' },
    { id: 'fund-dca', title: '基金定投业务解析', desc: '定期定额投资的运作模式与优势分析' },
    { id: 'fund-convert', title: '基金转换与赎回', desc: '基金转换的规则与赎回流程优化' },
    { id: 'fund-performance', title: '基金业绩评价体系', desc: '基金业绩评估指标与归因分析方法' },
    { id: 'fund-risk', title: '基金风控体系', desc: '基金风险控制体系与合规运营要点' },
  ],
  bank: [
    { id: 'loan', title: '贷款业务解析', desc: '银行贷款业务流程、审批机制、风控要点' },
    { id: 'credit-card', title: '信用卡业务解析', desc: '信用卡生命周期管理与风控体系' },
    { id: 'wealth-management', title: '理财业务解析', desc: '银行理财产品的设计与销售流程' },
    { id: 'deposit', title: '存款业务解析', desc: '银行存款产品分类与利率定价机制' },
    { id: 'payment', title: '支付结算体系', desc: '银行支付清算系统架构与核心流程' },
    { id: 'alm', title: '资产负债管理', desc: '银行资产负债管理策略与风险对冲' },
    { id: 'core-system', title: '银行核心系统架构', desc: '银行核心系统的演进与架构设计' },
    { id: 'bank-risk', title: '银行风控体系', desc: '银行全面风险管理体系建设要点' },
    { id: 'bank-data', title: '银行数据分析平台', desc: '银行数据中台与智能分析平台建设' },
    { id: 'open-bank', title: '开放银行架构', desc: '开放银行API设计与生态合作模式' },
  ],
  securities: [
    { id: 'account-opening', title: '证券开户业务解析', desc: '证券账户开户流程、适当性管理、资金账户管理' },
    { id: 'stock-trading', title: '股票交易流程', desc: '股票委托下单到成交清算的全流程' },
    { id: 'futures-options', title: '期货与期权业务', desc: '衍生品交易的保证金管理与风险控制' },
    { id: 'ibanking', title: '投行业务解析', desc: '证券承销、并购咨询等投行业务介绍' },
    { id: 'asset-management', title: '资产管理业务', desc: '券商资管产品的设计与管理运营' },
    { id: 'sec-risk', title: '证券风控体系', desc: '证券行业合规风控体系建设要点' },
    { id: 'sec-data', title: '证券数据分析平台', desc: '券商数据平台与实时行情系统架构' },
    { id: 'quant', title: '量化投资架构', desc: '量化交易系统的架构设计与策略实现' },
    { id: 'margin', title: '融资融券业务', desc: '两融业务的准入管理与风险监控' },
    { id: 'clearing', title: '证券清算结算体系', desc: '证券清算交收流程与结算系统架构' },
  ],
};

function ArticleSection({ title, articles, basePath }: { title: string; articles: typeof fund; basePath: string }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2e8555' }}>{title}</h2>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/docs/${basePath}/${article.id}`}
            style={{
              display: 'block',
              padding: '1rem',
              background: '#f8f9fa',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid #e0e0e0',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1rem', color: '#2e8555' }}>{article.title}</h3>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#666' }}>{article.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title="首页" description="金融解决方案知识库">
      <header style={{ textAlign: 'center', padding: '3rem 2rem', background: '#f8f9fa' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>金融解决方案知识库</h1>
        <p style={{ fontSize: '1rem', color: '#666' }}>
          基金 · 银行 · 证券 业务场景深度拆解
        </p>
      </header>
      <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        <ArticleSection title="基金行业" articles={articles.fund} basePath="fund" />
        <ArticleSection title="银行行业" articles={articles.bank} basePath="bank" />
        <ArticleSection title="证券行业" articles={articles.securities} basePath="securities" />
      </main>
    </Layout>
  );
}
