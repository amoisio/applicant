// @flow

/**
 * Trims the given string. Returns null if the string is null, undefined or empty.
 * @param {string} str String to trim.
 */
export function trimmedOrDefault(str: ?string): ?string {
  if (str === null || str === undefined) {
    return null;
  }
  const trimmedStr = str.trim();
  return (trimmedStr.length === 0)
    ? null
    : trimmedStr;
}