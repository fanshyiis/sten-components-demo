import { defineConfig } from 'dumi';

const componentMenus = [
  { title: '概述', path: '/components' },
  { title: 'Icons 图标', path: '/components/sten-icons' },
  { title: 'Image 图片', path: '/components/sten-image' },
];

const addStyles = `(function () {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/build/sten-design-components.css';
  window.document.head.appendChild(link);
})()`;

export default defineConfig({
  title: 'sten-design',
  favicon: 'https://stenciljs.com/assets/icon/favicon.ico?v=989038ce79',
  logo: 'https://github.com/ionic-team/stencil/raw/main/stencil-logo.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  fastRefresh: {},
  copy: [{ from: './www/build', to: 'build' }],
  headScripts: [
    {src: '/build/sten-design-components.js'},
    {src: '/build/sten-design-components.esm.js', type: 'module'},
    addStyles
  ],
  links: ['/build/sten-design-components.css'],
  menus: {
    '/components': componentMenus,
  },
  extraBabelPlugins: ['babel-plugin-react-require'],
  navs: [
    { title: '快速开始', path: '/get_started' },
    { title: '我要共建', path: '/contribute' },
    { title: '组件', path: '/components' },
    {
      title: '更新日志',
      children: [
        {
          title: 'v2.x',
          path: 'https://ahooks-v2.surge.sh/',
        },
        {
          title: 'v1.x',
          path: 'http://hooks.umijs.org/',
        },
      ],
    },
    { title: 'GitLab', path: 'https://gitlab.lanhuapp.com/jwzg/frontend/common/lanhu-design' },
  ],
});
