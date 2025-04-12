import { Either, right, left } from "@sweet-monads/either";

import { Flavor } from "./Flavor";
import { SymbolEnum } from "./SymbolEnum";

export const ReadFileErrorEnum = SymbolEnum([
  "Event",
  "NoFile",
  "Format",
] as const);

export type ReadFileError = Flavor<symbol, "ReadFileError">;

export const readFile = (
  file: File,
): Promise<Either<ReadFileError, string>> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    const abortController = new AbortController();

    reader.addEventListener(
      "error",
      () => {
        resolve(left(ReadFileErrorEnum.Event));

        abortController.abort();
      },
      {
        signal: abortController.signal,
      },
    );

    reader.addEventListener(
      "load",
      () => {
        if (reader.result === null) {
          resolve(left(ReadFileErrorEnum.NoFile));
        } else if (typeof reader.result === "string") {
          resolve(right(reader.result));
        } else {
          resolve(left(ReadFileErrorEnum.Format));
        }

        abortController.abort();
      },
      {
        signal: abortController.signal,
      },
    );

    reader.readAsText(file);
  });
};
