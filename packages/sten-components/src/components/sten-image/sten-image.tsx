import { Component, Host, h, State, Prop, Element, Listen, Watch } from '@stencil/core';
import { CSSStyle, ObjectFit } from '../../common/interface';
import classNames from 'classnames';
import { throttle } from 'lodash-es';
import { getClassPrefix, getScrollContainer, isInContainer } from '../../utils/utils';
@Component({
  tag: 'sten-image',
})
export class StenImage {
  /**
   * Prop src 图片链接
   */
  @Prop() src: string;
  /**
   * Prop lazy 是否懒加载
   */
  @Prop() lazy = false;
  /**
   * Prop fit 图片填充格式
   */
  @Prop() fit: 'none' | 'contain' | 'cover' | 'fill' | 'scale-down' = 'none';
  /**
   * Prop placeholder 加载文案
   */
  @Prop() placeholder = '加载中...';
  /**
   * Prop 错误文案
   */
  @Prop() errorText = '加载失败';

  @Element() element: HTMLElement;

  @State() loading = true;
  @State() error = false;
  @State() imageWidth: number;
  @State() imageHeight: number;
  @State() show = false;

  private _scrollContainer: HTMLElement | (Window & typeof globalThis);
  private _handleLazyLoad: any;

  @Watch('show')
  watchHandler(_newValue, oldValue) {
    if (oldValue) return;
    this.loadImage();
  }

  @Listen('scroll', { target: 'window', capture: true })
  handleScroll() {
    if (!this.lazy) return;
    this._handleLazyLoad();
  }

  /**
   * Determines whether support object fit is
   */
  isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined;

  /**
   * Handles load
   *
   * @param _event
   * @param image
   */
  handleLoad(_event: Event, image: HTMLImageElement) {
    this.imageWidth = image.width;
    this.imageHeight = image.height;
    this.loading = false;
    this.error = false;
  }

  /**
   * Handles error
   *
   * @param error
   */
  handleError(error: OnErrorEventHandlerNonNull) {
    console.error(error);
    this.loading = false;
    this.error = true;
  }

  /**
   * Loads image 加载图片
   *
   * @returns
   */
  loadImage() {
    if (!this.src) {
      return false;
    }
    this.loading = true;
    this.error = false;

    const img = new Image();
    img.onload = e => this.handleLoad(e, img);
    img.onerror = this.handleError.bind(this);

    img.src = this.src;
  }

  /**
   * Gets image style 获取图片样式，需要兼容支不支持 objectfit
   *
   * @returns image style
   */
  getImageStyle(): CSSStyle {
    if (this.isSupportObjectFit()) {
      return { objectFit: this.fit };
    }
    const { fit, imageWidth, imageHeight, element } = this;
    const { clientWidth: containerWidth, clientHeight: containerHeight } = element;
    let _fit = fit;

    if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {};
    const imageAspectRatio = imageWidth / imageHeight;
    const containerAspectRatio = containerWidth / containerHeight;

    if (fit === ObjectFit.SCALE_DOWN) {
      const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
      _fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
    }

    switch (_fit) {
      case ObjectFit.NONE:
        return { width: 'auto', height: 'auto' };
      case ObjectFit.CONTAIN:
        return imageAspectRatio < containerAspectRatio ? { width: 'auto' } : { height: 'auto' };
      case ObjectFit.COVER:
        return imageAspectRatio < containerAspectRatio ? { height: 'auto' } : { width: 'auto' };
      default:
        return {};
    }
  }

  /**
   * Handles lazy load lazyload的句柄函数
   *
   * @returns
   */
  handleLazyLoad() {
    if (this.show) return;
    if (isInContainer(this.element, this._scrollContainer as HTMLElement)) {
      this.show = true;
    }
  }

  componentWillLoad() {
    if (!this.lazy) {
      this.loadImage();
    }
    this.getImageStyle = this.getImageStyle.bind(this);
    this.handleLazyLoad = this.handleLazyLoad.bind(this);
    this._scrollContainer = getScrollContainer(this.element);
    this._handleLazyLoad = throttle(this.handleLazyLoad, 200);
  }

  render() {
    const { src, loading, error, placeholder, errorText } = this;
    const styles: CSSStyle = this.getImageStyle();
    const classPrefix: string = getClassPrefix('image');
    const classes: string = classNames(classPrefix);

    return (
      <Host style={{ display: 'block' }} class={classes}>
        {!loading && !error && <img src={src} style={styles} class={`${classPrefix}__inner`} />}
        {loading && <div class={`${classPrefix}__placeholder`}>{placeholder}</div>}
        {error && <div class={`${classPrefix}__placeholder`}>{errorText}</div>}
      </Host>
    );
  }
}
