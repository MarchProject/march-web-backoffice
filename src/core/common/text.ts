export function truncateText(text: string, length = 5) {
  return text.length > length ? text.substring(0, length) + '...' : text
}
