import { newE2EPage } from '@stencil/core/testing';

describe('sten-test', () => {
  // 渲染验证
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sten-test></sten-test>');
    // 看下 具体 div 里面是否初始化 num
    const element = await page.find('#num_container');
    expect(element.innerText).toEqual('0');
  });

  // 增加逻辑
  it('add', async () => {
    const page = await newE2EPage();
    await page.setContent('<sten-test></sten-test>');
    // 看下 具体 div 里面是否初始化 num
    const num_container = await page.find('#num_container');
    const add = await page.find('#add');
    await add.click();
    expect(num_container.innerText).toEqual('1');
  });

  // 减少逻辑
  it('reduce', async () => {
    const page = await newE2EPage();
    await page.setContent('<sten-test></sten-test>');
    // 看下 具体 div 里面是否初始化 num
    const num_container = await page.find('#num_container');
    const reduce = await page.find('#reduce');
    await reduce.click();
    expect(num_container.innerText).toEqual('-1');
  });

  it('reset', async () => {
    const page = await newE2EPage();
    await page.setContent('<sten-test></sten-test>');
    // 看下 具体 div 里面是否初始化 num
    const num_container = await page.find('#num_container');
    const reduce = await page.find('#reduce');
    await reduce.click();
    const reset = await page.find('#reset');
    await reset.click();
    expect(num_container.innerText).toEqual('0');
  });
});
