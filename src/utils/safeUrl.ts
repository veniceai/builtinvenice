export function safeUrl(url: string): string {
  return /^https:\/\//i.test(url) ? url : '#';
}
