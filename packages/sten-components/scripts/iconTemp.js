/*
 * @Author: caopx
 * @Date: 2021-11-01 16:13:21
 * @LastEditTime: 2021-11-17 14:51:22
 */
exports.transformTemp = (svgData, key) => {
  return `import { Component, h, Prop } from '@stencil/core';
    import { ${key} as svgData } from '@sten-design/icons';
    import { Icon } from '../sten-icons/icon';

    @Component({
      tag: 'sten-icon-${svgData._name}',
    })
    export class StenIcon${key.split('icon')[1]} {
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

        return <Icon {...{ size, styles, classNames, color, rotate, spin, svgData }} />;
      }
    }
    `;
};
