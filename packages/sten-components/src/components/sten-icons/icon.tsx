/*
 * @Author: caopx
 * @Date: 2021-11-05 11:16:29
 * @LastEditTime: 2021-11-17 14:53:05
 */
import { FunctionalComponent, h, Host } from '@stencil/core';
import classnames from 'classnames';
import { CSSStyle } from '../../common/interface';
import { getClassPrefix } from '../../utils/utils';

interface IconProps {
  /**
   * icon 尺寸 默认 20
   */
  size: number | string;
  /**
   * styles 传入的css样式
   */
  styles: object;
  /**
   * 传入的class名称
   */
  classNames: string;
  /**
   * 图标颜色
   */
  color: string;
  /**
   * 旋转的角度
   */
  rotate: number;
  /**
   * 是否自动旋转
   */
  spin: boolean;
  /**
   * 需要渲染的svg数据
   */
  svgData: any;
}

/**
 * @param str
 */
function hyphenate(str) {
  return (str + '').replace(/[A-Z]/g, function (match) {
    return '-' + match.toLowerCase();
  });
}

export const Icon: FunctionalComponent<IconProps> = props => {
  const { size, styles, classNames, color, rotate, spin, svgData } = props;
  if (!svgData) {
    return false;
  }

  const _svgData = svgData.childs.map(child => {
    const attrs = {};
    Object.keys(child.attrs).forEach(attrName => {
      attrs[hyphenate(attrName)] = child.attrs[attrName];
    });

    child.attrs = attrs;
    return child;
  });

  const classPrefix: string = getClassPrefix('icon');

  const classes = classnames(classPrefix, classNames, `${classPrefix}-block`, { [`${classPrefix}-spin`]: spin });

  const outerStyle: CSSStyle = { color };

  if (Number.isSafeInteger(rotate)) {
    outerStyle.transform = `rotate(${rotate}deg)`;
  }

  Object.assign(outerStyle, styles);

  return (
    <Host style={{ display: 'flex' }}>
      <svg style={outerStyle} class={classes} {...svgData.attrs} width={size} height={size}>
        {_svgData.map(child =>
          child.name === 'rect' ? <rect {...child.attrs}></rect> : child.name === 'circle' ? <circle {...child.attrs}></circle> : <path {...child.attrs}></path>,
        )}
      </svg>
    </Host>
  );
};
