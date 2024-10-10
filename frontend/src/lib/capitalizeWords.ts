export const capitalizeWords = (str: string): string => {
  return str.replace(/^\w|(?<=\s)\w/g, (char) => char.toUpperCase());
};
