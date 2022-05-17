/**
 * @param target
 * @param eventType
 * @param cb
 */
export default function addEventListenerWrap(target, eventType, cb) {
  if (target.addEventListener) {
    target.addEventListener(eventType, cb);
  }
  return {
    remove: () => {
      if (target.removeEventListener) {
        target.removeEventListener(eventType, cb);
      }
    },
  };
}
