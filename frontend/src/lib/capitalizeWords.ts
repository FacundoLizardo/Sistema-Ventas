export const capitalizeWords = (str: string): string => {
    str = str.trim();
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };