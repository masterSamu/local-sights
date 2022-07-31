/**
 * Convert first letter of the string to upper case character
 * @param {string} string to modify
 * @returns {string} with upper case first letter
 */
export const capitalizeWords = (string) => {
  // If string has dash character
  if (/[-]/.test(string)) {
    const words = string.split("-");
    words.forEach((word, index) => {
      words[index] = word.charAt(0).toUpperCase() + word.slice(1);
    });
    return words.join("-");
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
