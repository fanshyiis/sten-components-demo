import { Component, Host, Prop, h } from '@stencil/core';

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
        <sten-icon-aa-c {...{ size, styles, classNames, color, rotate, spin }}></sten-icon-aa-c>
        <sten-icon-add-image {...{ size, styles, classNames, color, rotate, spin }}></sten-icon-add-image>
        <sten-icon-add-user {...{ size, styles, classNames, color, rotate, spin }}></sten-icon-add-user>
        <sten-icon-add {...{ size, styles, classNames, color, rotate, spin }}></sten-icon-add>
        <sten-icon-alert-close-collapse {...{ size, styles, classNames, color, rotate, spin }}></sten-icon-alert-close-collapse>
        <sten-icon-alert-error-c {...{ size, styles, classNames, color, rotate, spin }}></sten-icon-alert-error-c>
        <sten-icon-alert-error-circle-c {...{ size, styles, classNames, color, rotate, spin }}></sten-icon-alert-error-circle-c>
      </Host>
    );
  }
}
