export default {
  name: 'svg',
  attrs: { width: '18', height: '18', viewBox: '0 0 18 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
  childs: [
    { name: 'rect', attrs: { width: '18', height: '18', fill: 'white', fillOpacity: '0.01' } },
    {
      name: 'circle',
      attrs: {
        cx: '9',
        cy: '9',
        r: '7.5',
        fill: '#EA4F3D',
        stroke: '#EA4F3D',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    },
    {
      name: 'path',
      attrs: {
        d: 'M11.25 6.75L6.75 11.25',
        stroke: 'white',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    },
    {
      name: 'path',
      attrs: {
        d: 'M6.75 6.75L11.25 11.25',
        stroke: 'white',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    },
  ],
  _name: 'alert-error-c',
};
