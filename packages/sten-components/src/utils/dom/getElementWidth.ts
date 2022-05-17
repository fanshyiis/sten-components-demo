export const getWidthByContent = (v: string, s: string) => {
  const div = document.createElement('div');
  div.innerHTML = v;
  div.style.fontSize = s;
  div.style.visibility = 'hidden';
  div.style.position = 'absolute';
  div.style.whiteSpace = 'nowrap';
  document.body.appendChild(div);
  const divPosition = {
    offsetLeft: div.offsetLeft,
    clientWidth: div.clientWidth,
  };
  document.body.removeChild(div);
  return divPosition;
};
