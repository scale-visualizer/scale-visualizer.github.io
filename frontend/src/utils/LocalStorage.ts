import { Either, right, left } from "@sweet-monads/either";

import { Flavor } from "./Flavor";
import { SymbolEnum } from "./SymbolEnum";

export const LocalStorageErrorCodesEnum = SymbolEnum([
  "Unknown",
  "QuotaExceeded",
  "NotAvailable",
] as const);

export type LocalStorageErrorCodes = Flavor<symbol, "LocalStorageErrorCodes">;

export class LocalStorage {
  setItem = <Value extends string>(
    keyName: string,
    keyValue: Value,
  ): Either<LocalStorageErrorCodes, undefined> => {
    try {
      localStorage.setItem(keyName, keyValue);

      return right(undefined);
    } catch (e) {
      console.error(e);

      if (e instanceof DOMException) {
        if (e.name === "QuotaExceededError") {
          return left(LocalStorageErrorCodesEnum.QuotaExceeded);
        }

        return left(LocalStorageErrorCodesEnum.NotAvailable);
      }

      return left(LocalStorageErrorCodesEnum.Unknown);
    }
  };

  getItem = <Value extends string>(
    key: string,
  ): Either<LocalStorageErrorCodes, Value> => {
    try {
      return right(localStorage.getItem(key) as Value);
    } catch (e) {
      console.error(e);

      if (e instanceof DOMException) {
        return left(LocalStorageErrorCodesEnum.NotAvailable);
      }

      return left(LocalStorageErrorCodesEnum.Unknown);
    }
  };

  removeItem = (key: string): Either<LocalStorageErrorCodes, undefined> => {
    try {
      localStorage.removeItem(key);
      return right(undefined);
    } catch (e) {
      console.error(e);

      if (e instanceof DOMException) {
        return left(LocalStorageErrorCodesEnum.NotAvailable);
      }

      return left(LocalStorageErrorCodesEnum.Unknown);
    }
  };
}
