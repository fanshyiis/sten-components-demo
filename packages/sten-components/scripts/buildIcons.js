/* eslint-disable @typescript-eslint/no-var-requires */
const icons = require('@sten-design/icons');
const transformTemp = require('./iconTemp').transformTemp;
const transformCom = require('./iconsComTemp').transformTempCom;
const { resolve } = require('path');
const fs = require('fs');
const prettier = require('prettier');

const outDir = resolve(__dirname, '../src/components/icons');
const outDirIcons = resolve(__dirname, '../src/components/sten-icons');
const prettierConfig = require(resolve(__dirname, '../.prettierrc.json'));

async function build() {
  fs.rmdirSync(outDir, { recursive: true });
  fs.mkdirSync(outDir);
  if (icons && Object.keys(icons).length) {
    Object.keys(icons).forEach(key => {
      console.log(key);
      const jsonFileName = `sten-icon-${icons[key]._name}.tsx`;
      let temp = transformTemp(icons[key], key);
      const formattedCode = prettier.format(temp, prettierConfig);
      fs.writeFileSync(resolve(outDir, jsonFileName), formattedCode, 'utf-8');
    });

    let iconsTemp = transformCom(Object.keys(icons), icons);
    const formattedCodeCom = prettier.format(iconsTemp, prettierConfig);
    fs.writeFileSync(resolve(outDirIcons, 'sten-icons.tsx'), formattedCodeCom, 'utf-8');
  }
}

build();
