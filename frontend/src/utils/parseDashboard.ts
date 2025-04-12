import { Either, left } from "@sweet-monads/either";

import { t9n } from "../t9n/t9n";
import { Dashboard } from "../types";

import { ParseError, ParseErrorEnum } from "./ParseError";
import { parseJson, ParseJsonError } from "./parseJson";
import { parseV0Dashboard } from "./parseV0Dashboard";

export const parseDashboard = (
  str: string,
): Either<
  | ParseJsonError
  | {
      code: ParseError;
      errors: Array<string>;
    },
  Dashboard
> => {
  const parseResult = parseJson(str)
    .mapRight((obj) => {
      if ("schemaVersion" in obj === false || obj.schemaVersion !== 0) {
        return left({
          code: ParseErrorEnum.IvalidFormat,
          errors: [t9n.parseDashboardErrors.invalidSchemaVersion],
        });
      }

      return parseV0Dashboard(obj);
    })
    .join();

  return parseResult;
};
