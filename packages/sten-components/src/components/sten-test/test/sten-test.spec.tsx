import { newSpecPage } from '@stencil/core/testing';
import { StenTest } from '../sten-test';

describe('sten-test', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StenTest],
      html: `<sten-test></sten-test>`,
    });
    expect(page.root).toEqualHtml(`
    <sten-test><div id="num_container">0</div><button id="add">增加</button><button id="reduce">减少</button><button id="reset">重置</button></sten-test>`);
  });

  it('add func', async () => {
    const toggle = new StenTest();
    expect(toggle.num).toBe(0);
    toggle.add();
    expect(toggle.num).toBe(1);
  })
});
