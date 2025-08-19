import AppBar from "@mui/material/AppBar";

import styled from "@emotion/styled";

import { theme } from "../../theme";
import { ButtonToRepo } from "../ButtonToRepo/ButtonToRepo";

const Container = styled("div")`
  display: grid;
  padding: ${theme.spacing(1)};
  grid: auto / auto min-content;
`;

export const Header = (props: { CustomControls: React.ReactNode }) => {
  return (
    <AppBar position="static">
      <Container>
        <div>{props.CustomControls}</div>
        <div>
          <ButtonToRepo />
        </div>
      </Container>
    </AppBar>
  );
};
