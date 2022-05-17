export default function devWarning(component: string, msg: string): void {
  console.warn(`[lh: ${component}] ${msg}`);
}
