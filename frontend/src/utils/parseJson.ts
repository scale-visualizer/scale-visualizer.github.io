import { Either, right, left } from "@sweet-monads/either";

import { Flavor } from "./Flavor";
import { SymbolEnum } from "./SymbolEnum";

export const ParseJsonErrorEnum = SymbolEnum(["InvalidJson"] as const);

export type ParseJsonError = Flavor<symbol, "ParseJsonError">;

export const parseJson = (str: string): Either<ParseJsonError, {}> => {
  try {
    const obj = JSON.parse(str);
    return right(obj);
  } catch {
    return left(ParseJsonErrorEnum.InvalidJson);
  }
};
