interface EventItem {
  target: HTMLElement;
  type: string;
  listener: EventListener;
  options?: boolean | AddEventListenerOptions;
}
export const EventList: EventItem[] = [];
export const initEvents = () => {
  const originAddEventListener = EventTarget.prototype.addEventListener;
  Object.defineProperty(EventTarget.prototype, 'addEventListener', {
    value: function (type, listener, options) {
      EventList.push({ target: this, type, listener, options });
      originAddEventListener.call(this, type, listener, options);
    },
    enumerable: true,
  });
};
