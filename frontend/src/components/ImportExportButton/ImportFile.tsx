import { enqueueSnackbar } from "notistack";

import { useState } from "react";

import styled from "@emotion/styled";

import { t9n } from "../../t9n/t9n";
import { theme } from "../../theme";
import { parseDashboard } from "../../utils/parseDashboard";
import { readFile } from "../../utils/readFile";

import { ImportFileError } from "./ImportFileError";

const DragZone = styled("label")`
  height: 220px;
  cursor: pointer;
  border: 1px dashed ${theme.palette.grey[500]};
  border-radius: ${theme.spacing(1)};
  background-color: ${theme.palette.grey[600]};
  display: grid;
  grid: auto / auto;
  place-content: center;
`;

export const ImportFile = () => {
  const onFileLoad = (file: File) => {
    readFile(file).then((res) =>
      res
        .mapRight(parseDashboard)
        .join()
        .mapLeft((errorType) => {
          enqueueSnackbar({
            message: <ImportFileError importError={errorType} />,
            variant: "default",
          });
        })
        // TODO: add imported dashboard to the state
        .mapRight((dashboard) => {
          console.log(dashboard);
        }),
    );
  };

  const [key, setKey] = useState(0);

  return (
    <div>
      <DragZone
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();

          onFileLoad(e.dataTransfer.files[0]);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="file"
          hidden
          // input should be rerender on every data read to avoid situation,
          // when it is impossible to open the same file several times (when previous attempt was unsuccessful)
          key={key}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onFileLoad(file);
              setKey((currentKey) => currentKey + 1);
            }
          }}
        />
        {t9n.importFile.label}
      </DragZone>
    </div>
  );
};
