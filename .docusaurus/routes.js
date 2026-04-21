import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/documents',
    component: ComponentCreator('/documents', '319'),
    exact: true
  },
  {
    path: '/upload',
    component: ComponentCreator('/upload', '0a7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '078'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '435'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '383'),
            routes: [
              {
                path: '/docs/bank/intro',
                component: ComponentCreator('/docs/bank/intro', '329'),
                exact: true,
                sidebar: "bank"
              },
              {
                path: '/docs/fund/intro',
                component: ComponentCreator('/docs/fund/intro', '721'),
                exact: true,
                sidebar: "fund"
              },
              {
                path: '/docs/securities/intro',
                component: ComponentCreator('/docs/securities/intro', '056'),
                exact: true,
                sidebar: "securities"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
