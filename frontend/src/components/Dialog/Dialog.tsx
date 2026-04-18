import { memo } from "react";

import Button from "@mui/material/Button";
import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { DialogProps } from "./types";

export const Dialog = memo((props: DialogProps) => {
  return (
    <MuiDialog open={props.isOpen} onClose={props.onCancel}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.question}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onDecline} color="secondary">
          {props.declineText}
        </Button>
        <Button
          onClick={props.onAgree}
          autoFocus
          variant="contained"
          color="primary"
        >
          {props.agreeText}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
});
