import Typography from "@mui/material/Typography";

import { t9n } from "../../t9n/t9n";
import { ParseError, ParseErrorEnum } from "../../utils/ParseError";
import { ParseJsonError, ParseJsonErrorEnum } from "../../utils/parseJson";
import { ReadFileError, ReadFileErrorEnum } from "../../utils/readFile";

const t9nMap = {
  [ReadFileErrorEnum.Event]: t9n.importFile.errors.fileReading,
  [ReadFileErrorEnum.Format]: t9n.importFile.errors.fileFormat,
  [ReadFileErrorEnum.NoFile]: t9n.importFile.errors.fileAbsent,
  [ParseJsonErrorEnum.InvalidJson]: t9n.importFile.errors.jsonFormat,
};

export const ImportFileError = ({
  importError,
}: {
  importError:
    | ReadFileError
    | ParseJsonError
    | {
        code: ParseError;
        errors: Array<string>;
      };
}) => {
  if (typeof importError === "symbol") {
    return t9nMap[importError];
  } else {
    if (importError.code === ParseErrorEnum.Failed) {
      return t9n.importFile.errors.dashboardParsing;
    }

    if (importError.code === ParseErrorEnum.IvalidFormat) {
      return (
        <div>
          <Typography variant="subtitle1">
            {t9n.importFile.errors.dashbordFormat}
          </Typography>
          {importError.errors.map((errorMessage, index) => {
            return <div key={index}>{errorMessage}</div>;
          })}
        </div>
      );
    }
  }
};
