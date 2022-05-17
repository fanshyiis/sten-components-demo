/*
 * @Author: caopx
 * @Date: 2021-10-29 18:39:09
 * @LastEditTime: 2021-11-19 10:56:01
 */
export interface CSSStyle {
  [key: string]: string;
}

export enum ObjectFit {
  NONE = 'none',
  CONTAIN = 'contain',
  COVER = 'cover',
  FILL = 'fill',
  SCALE_DOWN = 'scale-down',
}
