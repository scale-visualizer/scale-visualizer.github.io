import { SnackbarMessage, closeSnackbar } from "notistack";

import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";

import styled from "@emotion/styled";

import { theme } from "../../theme";
import { CircleProgress } from "../CircleProgress/CircleProgress";

const CustomIconButton = styled(IconButton)`
  position: relative;
`;

const CircleProgressWrapper = styled("div")`
  position: absolute;
  display: grid;
`;

const CustomAlert = styled(Alert)`
  &:hover {
    svg {
      animation-play-state: paused;
    }
  }
`;

const sx = { bgcolor: "background.paper" };

const Message = styled("div")`
  display: grid;
  grid: auto / auto min-content;
  width: 100%;
  align-items: center;
  gap: 0 ${theme.spacing(1)};
`;

const Controls = styled("div")`
  display: grid;
  grid: auto / auto-flow;
  align-items: center;
  gap: 0 ${theme.spacing(1)};
`;

export const Snackbar = React.memo(
  React.forwardRef<
    HTMLDivElement,
    {
      id: number;
      action?: () => React.ReactNode;
      autoHideDuration?: number;
      message?: SnackbarMessage;
    }
  >((props, ref) => {
    return (
      <CustomAlert
        icon={false}
        variant="outlined"
        severity="info"
        sx={sx}
        ref={ref}
        slots={{
          message: Message,
        }}
      >
        <div>{props.message && props.message}</div>
        <Controls>
          {typeof props.action === "function" ? props.action() : props.action}
          <CustomIconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              closeSnackbar(props.id);
            }}
          >
            <CircleProgressWrapper>
              <CircleProgress
                size={30}
                duration={5}
                onAnimationEnd={() => {
                  closeSnackbar(props.id);
                }}
              />
            </CircleProgressWrapper>
            <CloseIcon fontSize="small" />
          </CustomIconButton>
        </Controls>
      </CustomAlert>
    );
  }),
);
