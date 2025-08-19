import { enqueueSnackbar } from "notistack";

import { memo, useEffect, useRef, useState } from "react";

import AddLinkIcon from "@mui/icons-material/AddLink";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";

import styled from "@emotion/styled";

import { useBoolean } from "../../hooks/useBoolean";
import { t9n } from "../../t9n/t9n";
import { theme } from "../../theme";
import { stringToClipboard } from "../../utils/stringToClipboard";

import { ImportFile } from "./ImportFile";

const TabContent = styled("div")`
  padding: ${theme.spacing(1)};
`;

const TabWrapper = styled("div")`
  display: grid;
  grid: auto auto / auto;
  gap: ${theme.spacing(3)} 0;
  align-content: start;
  height: 220px;
`;

const ExportTabSection = styled("div")`
  display: grid;
  grid: auto auto / auto;
  gap: ${theme.spacing(1)} 0;
`;

const DialogCloseButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
  color: ${theme.palette.grey[500]};
`;

const CopyLinkWrapper = styled("div")`
  display: grid;
  grid: auto / min-content auto;
`;

const GenerateLinkButton = styled(Button)`
  white-space: nowrap;
`;

export const ImportExportButton = memo(
  ({
    disabled,
    onDownloadClick,
    getLink,
  }: {
    disabled: boolean;
    onDownloadClick: React.MouseEventHandler<HTMLButtonElement>;
    getLink: () => string;
  }) => {
    const state = useBoolean();

    const [value, setValue] = useState(0);

    const [link, setLink] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    useEffect(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, [link]);

    return (
      <IconButton
        title={t9n.headerControls.share}
        disabled={disabled}
        onClick={async () => {
          state[1].current.setTrue();
        }}
      >
        <ImportExportIcon />

        <Dialog
          open={state[0]}
          fullWidth
          onClose={(e) => {
            // For some reason typings for this event in mui is not provided
            // @ts-ignore
            e.stopPropagation();

            state[1].current.setFalse();
          }}
        >
          <DialogCloseButton
            onClick={(e) => {
              e.stopPropagation();

              state[1].current.setFalse();
            }}
          >
            <CloseIcon />
          </DialogCloseButton>

          <DialogTitle>{t9n.importExportDialog.title}</DialogTitle>
          <DialogContent>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab label={t9n.importExportDialog.exportTabName} />
                <Tab label={t9n.importExportDialog.importTabName} />
              </Tabs>
            </Box>

            <TabContent>
              {value === 0 && (
                <TabWrapper>
                  <ExportTabSection>
                    <DialogContentText>
                      {t9n.importExportDialog.downloadLabel}
                    </DialogContentText>
                    <Button
                      variant="outlined"
                      onClick={onDownloadClick}
                      endIcon={<DownloadIcon />}
                    >
                      {t9n.importExportDialog.downloadButton}
                    </Button>
                  </ExportTabSection>

                  <ExportTabSection>
                    <DialogContentText>
                      {t9n.importExportDialog.linkLabel}
                    </DialogContentText>
                    <CopyLinkWrapper>
                      <GenerateLinkButton
                        variant="outlined"
                        onClick={() => {
                          const link = getLink();
                          stringToClipboard(link)
                            .then(() => {
                              enqueueSnackbar({
                                message: t9n.copiedDashboardSnackbar.message,
                                variant: "default",
                              });
                            })
                            .catch(() => {
                              enqueueSnackbar({
                                message: t9n.copiedDashboardSnackbar.error,
                                variant: "default",
                              });
                            });
                          setLink(link);
                        }}
                        endIcon={<AddLinkIcon />}
                      >
                        {t9n.importExportDialog.generateLinkButon}
                      </GenerateLinkButton>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={link}
                        inputRef={inputRef}
                      />
                    </CopyLinkWrapper>
                  </ExportTabSection>
                </TabWrapper>
              )}
              {value === 1 && <ImportFile />}
            </TabContent>
          </DialogContent>
        </Dialog>
      </IconButton>
    );
  },
);
