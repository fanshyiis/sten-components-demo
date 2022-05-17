/*
 * File: parseHTML.ts
 * Description: 格式化HTML
 * File Created: 2021-12-24 18:07:47
 * Author: you@you.you
 * ----------------------------------
 * Last Modified: 2021-12-28 16:11:50
 * Modified By: liyujie@jwzg.com
 * ----------------------------------
 */
import Mustache from 'mustache';

/**
 * Mustache 转换 html
 *
 * @param {string} html 字符串
 * @param {object} data 数据
 * @returns {string} 返回值
 */
export default function (html, data = {}) {
  return Mustache.render(html, data, {}, ['${', '}']);
}
