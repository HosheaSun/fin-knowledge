import {themes as prismThemes} from 'prism-react-renderer';
import type {ConfigOptions} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: ConfigOptions = {
  title: '金融解决方案知识库',
  tagline: '基金 · 银行 · 证券 业务场景深度拆解',
  favicon: 'img/favicon.ico',
  url: 'https://your-site.vercel.app',
  baseUrl: '/',
  projectName: 'fin-knowledge',
  organizationName: 'your-name',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/your-name/fin-knowledge/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    navbar: {
      title: '金融知识库',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'fund',
          position: 'left',
          label: '基金',
        },
        {
          type: 'docSidebar',
          sidebarId: 'bank',
          position: 'left',
          label: '银行',
        },
        {
          type: 'docSidebar',
          sidebarId: 'securities',
          position: 'left',
          label: '证券',
        },
        {
          to: '/documents',
          position: 'left',
          label: '文档库',
        },
        {
          to: '/upload',
          position: 'left',
          label: '上传文档',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} 金融解决方案知识库`,
    },
    prismTheme: prismThemes.github,
    prismDarkTheme: prismThemes.vsDark,
  } satisfies Preset.ThemeConfig,
};

export default config;
