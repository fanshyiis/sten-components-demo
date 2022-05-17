export default {
  name: 'svg',
  attrs: { viewBox: '0 0 10 6', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
  childs: [
    {
      name: 'path',
      attrs: {
        d: 'M1 5L5 1L9 5',
        stroke: 'currentColor',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    },
  ],
  _name: 'alert-close-collapse',
};
