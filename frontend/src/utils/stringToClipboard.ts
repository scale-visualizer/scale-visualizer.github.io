export const stringToClipboard = (str: string) => {
  return navigator.clipboard.writeText(str);
};
