// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const areObjectsEqual = (a: any, b: any) => {
  if (a === b) return true;

  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor) return false;

    if (Array.isArray(a)) {
      if (a.length !== b.length) {
        return false;
      }

      for (let i = a.length; i-- !== 0; ) {
        if (!areObjectsEqual(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }

    const keys = Object.keys(a);
    const length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }

    for (let i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false;
      }

    for (let i = length; i-- !== 0; ) {
      const key = keys[i];

      if (!areObjectsEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return a !== a && b !== b;
};
