export const getRandomValue = () => {
  const value = new Uint8Array(16);
  crypto.getRandomValues(value);
  return value.toString();
};
