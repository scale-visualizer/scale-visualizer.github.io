import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import UndoIcon from "@mui/icons-material/Undo";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import styled from "@emotion/styled";

import { t9n } from "../../t9n/t9n";
import { theme } from "../../theme";

const Controls = styled("div")`
  display: grid;
  grid: auto / auto-flow;
  justify-content: start;
  gap: 0 ${theme.spacing(1)};
`;

export const DashboardNamePicker = (props: {
  value: string;
  onCancel: () => void;
  onSave: (name: string) => void;
}) => {
  const [name, setName] = useState(props.value);

  return (
    <Controls>
      <TextField
        size="small"
        sx={{ width: 300 }}
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />

      <IconButton
        title={t9n.headerControls.cancelRename}
        onClick={props.onCancel}
      >
        <CloseIcon />
      </IconButton>
      <IconButton
        disabled={!name || props.value === name}
        title={t9n.headerControls.save}
        onClick={() => props.onSave(name)}
      >
        <SaveOutlinedIcon />
      </IconButton>
      <IconButton
        disabled={props.value === name}
        title={t9n.headerControls.revert}
        onClick={() => setName(props.value)}
      >
        <UndoIcon />
      </IconButton>
    </Controls>
  );
};
