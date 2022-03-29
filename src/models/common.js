export function trimmedOrDefault(str) {
  if (str === null || str === undefined) {
    return null;
  }
  const trimmedStr = str.trim();
  return (trimmedStr.length === 0)
    ? null
    : trimmedStr;
}