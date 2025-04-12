import { Flavor } from "./Flavor";
import { SymbolEnum } from "./SymbolEnum";

export const ParseErrorEnum = SymbolEnum(["IvalidFormat", "Failed"] as const);

export type ParseError = Flavor<symbol, "ParseError">;
