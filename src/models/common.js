/**
 * Removes the leading and trailing white space and line terminator characters of 
 * the string. Additionally, returns null if the string is null or undefined.
 * @param {string} str String to trim.
 * @returns {string} Trimmed string or null.
 */
export function trimmedOrDefault(str) {
  if (str === null || str === undefined) {
    return null;
  }
  return str.trim();
}