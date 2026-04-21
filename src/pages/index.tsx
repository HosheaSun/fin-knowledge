import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

function FeatureCard({title, description, to}: {title: string; description: string; to: string}) {
  return (
    <div style={{padding: '1.5rem', flex: '1 1 300px'}}>
      <Heading as="h3" style={{color: '#2e8555'}}>{title}</Heading>
      <p style={{marginTop: '0.5rem'}}>{description}</p>
      <Link to={to} style={{color: '#2e8555'}}>查看详情 →</Link>
    </div>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="首页" description="金融解决方案知识库">
      <header style={{textAlign: 'center', padding: '4rem 2rem', background: '#f8f9fa'}}>
        <h1 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>
          {siteConfig.title}
        </h1>
        <p style={{fontSize: '1.25rem', color: '#666'}}>
          {siteConfig.tagline}
        </p>
      </header>
      <main style={{padding: '2rem'}}>
        <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>行业分类</h2>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center'}}>
          <FeatureCard
            title="基金"
            description="货币基金、权益基金、ETF 等业务场景拆解"
            to="/docs/fund/money-market-fund"
          />
          <FeatureCard
            title="银行"
            description="存贷款、理财、信用卡等业务流程解析"
            to="/docs/bank/loan"
          />
          <FeatureCard
            title="证券"
            description="开户、交易、投研等核心业务详解"
            to="/docs/securities/account-opening"
          />
        </div>
        <h2 style={{textAlign: 'center', marginTop: '3rem', marginBottom: '2rem'}}>快速入口</h2>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <Link
            to="/upload"
            style={{
              padding: '1rem 2rem',
              background: '#2e8555',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            上传文档
          </Link>
          <Link
            to="/documents"
            style={{
              padding: '1rem 2rem',
              background: '#fff',
              color: '#2e8555',
              border: '2px solid #2e8555',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            查看文档库
          </Link>
        </div>
      </main>
    </Layout>
  );
}
