/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Author: caopx
 * @Date: 2021-10-29 10:51:53
 * @LastEditTime: 2022-03-12 16:58:01
 */
const { resolve, basename, extname } = require('path');
const { optimize } = require('svgo');
const svgson = require('svgson');
const fs = require('fs');
const camelCase = require('camelcase');
const prettier = require('prettier');

const entryDir = resolve(__dirname, '../svgs');
const outDir = resolve(__dirname, '../icons');
const outDirEsm = resolve(__dirname, '../icons_esm');

const svgoPlugins = [
  {
    name: 'convertColors',
    params: { currentColor: /^(?!url|none)./ },
  },
  {
    name: 'cleanupListOfValues',
    active: true,
  },
  {
    name: 'removeStyleElement',
    active: true,
  },
  {
    name: 'removeViewBox',
    active: false,
  },
  {
    name: 'removeDimensions',
    active: true,
  },
];

const transSvg = (svgString, svgFileName) => {
  return new Promise((resolve, reject) => {
    try {
      const result = optimize(svgString, {
        plugins: svgoPlugins,
      });
      console.log(result.data)
      // 彩色不执行去颜色配置
      svgson(svgFileName.slice(-2) === '-c' ? svgString : result.data, {}, resolve);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 *
 * @param {*} entryDir 存放svg文件夹
 * @param {*} outDir 输出React组件文件夹
 * @param {*} prefix 图标前缀
 * @param {*} suffix 图标后缀
 */
async function build(entryDir, outDir, outDirEsm, prefix, suffix) {
  // 重置文件夹
  fs.rmdirSync(outDir, { recursive: true });
  fs.rmdirSync(outDirEsm, { recursive: true });
  fs.mkdirSync(outDirEsm);
  fs.mkdirSync(outDir);
  const prettierConfig = require(resolve(__dirname, '../../../.prettierrc.js'));
  // 读取svg文件夹下的文件，转译成React组件，并输出
  const files = fs.readdirSync(entryDir, 'utf-8');
  const indexFileName = 'index.js';
  const batches = files
    .filter((f) => extname(f) === '.svg')
    .map(async (file) => {
      try {
        const svgFileName = basename(file, '.svg');
        const componentName = `${prefix}${camelCase(svgFileName, { pascalCase: true })}${suffix}`;
        const jsonFileName = `${componentName}.js`;
        const svgContent = fs.readFileSync(resolve(entryDir, file), 'utf-8');
        let JSONCode = await transSvg(svgContent, svgFileName);
        JSONCode._name = svgFileName;
        // cjs
        let _JSONCode = `exports.default = ${JSON.stringify(JSONCode)}`;
        const formattedCode = prettier.format(_JSONCode, prettierConfig);
        fs.writeFileSync(resolve(outDir, jsonFileName), formattedCode, 'utf-8');
        // esm
        let _JSONCode_esm = `export default ${JSON.stringify(JSONCode)}`;
        const formattedCode_esm = prettier.format(_JSONCode_esm, prettierConfig);
        fs.writeFileSync(resolve(outDirEsm, jsonFileName), formattedCode_esm, 'utf-8');
        return { fileName: jsonFileName, componentName };
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
  const arr = await Promise.all(batches);
  // cjs
  const indexFileContent = arr
    .map((a) => `exports.${a.componentName} = require('./${a.componentName}').default;`)
    .join('\n');
  fs.writeFileSync(
    resolve(outDir, indexFileName),
    '/* eslint-disable @typescript-eslint/no-var-requires */' + '\n' + indexFileContent + '\n',
    'utf-8',
  );
  // esm
  const indexFileContent_esm = arr
    .map((a) => `export { default as ${a.componentName} } from './${a.componentName}';`)
    .join('\n');
  fs.writeFileSync(resolve(outDirEsm, indexFileName), indexFileContent_esm + '\n', 'utf-8');
  return arr;
}

build(entryDir, outDir, outDirEsm, 'icon', '');
