const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

/**
 * @param first
 * @param middle
 * @param last
 */
export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

/**
 * Gets class prefix 获取class 前缀
 *
 * @param suffix
 * @returns class prefix
 */
export function getClassPrefix(suffix: string): string {
  return suffix ? `sten-${suffix}` : 'sten';
}
/**
 * is scroll 当前元素是否具有滚动属性
 *
 * @param el
 * @param vertical
 * @returns
 */
const isScroll = (el, vertical) => {
  const determinedDirection = vertical !== null && vertical !== undefined;
  const overflow = determinedDirection ? (vertical ? getStyle(el, 'overflow-y') : getStyle(el, 'overflow-x')) : getStyle(el, 'overflow');

  return overflow.match(/(scroll|auto|overlay)/);
};

/**
 * Names camel case
 *
 * @param name
 * @returns
 */
export const camelCase = function (name) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_: any, _separator: any, letter: string, offset: any) {
      return offset ? letter.toUpperCase() : letter;
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/**
 * Mustache 转换 html
 *
 * @param {string} str 字符串
 * @returns {string} 返回值
 */
export const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

/**
 * get scroll container 获取父元素 直到有滚动属性的
 *
 * @param el
 * @param vertical
 * @returns
 */
export const getScrollContainer = (el: HTMLElement, vertical?: string) => {
  let parent: HTMLElement = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, vertical)) {
      return parent;
    }
    parent = parent.parentNode as HTMLElement;
  }

  return parent;
};

export const getStyle = (element, styleName) => {
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    const computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

/**
 * @param element
 * @param styleName
 * @param value
 */
export function setStyle(element: HTMLElement, styleName, value) {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (const prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity') {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
}
/**
 * is in container 获取是否在父元素显示
 *
 * @param el
 * @param container
 * @returns
 */
export const isInContainer = (el: HTMLElement, container: HTMLElement): boolean => {
  if (!el || !container) return false;

  const elRect: DOMRect = el.getBoundingClientRect();
  let containerRect: any;

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }

  return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
};

export const isString = obj => typeof obj === 'string';
export const isNumber = obj => typeof obj === 'number';
export const isFunction = obj => typeof obj === 'function';
export const isArray = obj => Array.isArray(obj);

/**
 * 用requestAnimationFrame实现的定时器，用法同window.setInterval
 *
 * @param callback 同window.setInterval的回调方法一样
 * @param interval 同window.setInterval的间隔时间一样，单位ms
 * @returns clearTimer的方法，执行即可停止方法
 */
export const lhSetInterval = (callback: (clearTimer: () => void) => void, interval: number) => {
  let timer = null;
  let startTime = Date.now();
  const loop = () => {
    let endTime = Date.now();
    if (endTime - startTime >= interval) {
      startTime = endTime = Date.now();
      callback(() => {
        window.cancelAnimationFrame(timer);
      });
    }
    timer = window.requestAnimationFrame(loop);
  };
  loop();
  return timer;
};

export const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

/**
 * 过滤HTML
 * TODO: 未处理呢还
 *
 * @param str string
 * @returns string
 */
export const filterHtmlXSS = str => str;
