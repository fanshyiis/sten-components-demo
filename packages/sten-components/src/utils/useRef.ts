export interface Ref<T> {
  current: null | T;
}
const useRef = (): { current: any } => {
  const ref = {
    current: null,
  };
  Object.seal(ref);
  return ref;
};

export default useRef;
