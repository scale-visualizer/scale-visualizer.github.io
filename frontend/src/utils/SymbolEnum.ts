export type SymbolEnumResult<Names extends string[]> = {
  [Key in Names[number]]: symbol;
} & Record<string | symbol, symbol | undefined>;

export const SymbolEnum = <Names extends string[]>(names: Names) => {
  const map = names.reduce((result, name) => {
    const symbol = Symbol(name);
    result.set(name, symbol);
    result.set(symbol, symbol);
    return result;
  }, new Map());

  const proxy = new Proxy(
    {},
    {
      get(_, key) {
        return map.get(key);
      },
      set() {
        return false;
      },
    },
  );

  return proxy as SymbolEnumResult<Names>;
};
