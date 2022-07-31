
/**
 * Convert first letter of the string to upper case character
 * @param {string} string to modify
 * @returns {string} with upper case first letter
 */
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
