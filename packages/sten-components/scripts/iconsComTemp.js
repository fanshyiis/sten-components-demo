/*
 * @Author: caopx
 * @Date: 2021-11-02 10:52:48
 * @LastEditTime: 2022-05-17 20:31:25
 */
exports.transformTempCom = (keys, icons) => {
  const temp = keys.map(key => {
    return `<sten-icon-${icons[key]._name} {...{size, styles, classNames, color, rotate, spin }}></sten-icon-${icons[key]._name}>`;
  });
  return `import { Component, Host, Prop, h } from '@stencil/core';

    @Component({
      tag: 'sten-icons',
    })
    export class StenIcons {
      /**
       * icon 尺寸 默认 20
       */
      @Prop() size: number | string = 20;
      /**
       * styles 传入的css样式
       */
      @Prop() styles: object;
      /**
       * 传入的class名称
       */
      @Prop() classNames: string;
      /**
       * 图标颜色
       */
      @Prop() color: string;
      /**
       * 旋转的角度
       */
      @Prop() rotate: number;
      /**
       * 是否自动旋转
       */
      @Prop() spin: boolean;
      render() {
        const { size, styles, classNames, color, rotate, spin } = this;
        return (
          <Host>
            ${temp.join('\n')}
          </Host>
        );
      }
    }
    `;
};
