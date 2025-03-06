import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";

import { theme } from "../../theme";

import { ButtonToRepo } from "../ButtonToRepo/ButtonToRepo";

const ButtonToRepoLeft = styled(ButtonToRepo)`
  margin-left: auto;
`;

const sx = {
  padding: theme.spacing(1),
};

export const Header = () => {
  return (
    <AppBar position="static" sx={sx}>
      <ButtonToRepoLeft />
    </AppBar>
  );
};
