import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

import styled from "@emotion/styled";

import { theme } from "../../theme";
import type { Widget } from "../../types";
import { SwapableList } from "../SwapableList/SwapableList";

const Container = styled("div")`
  height: 100%;
  overflow-y: auto;
  padding: ${theme.spacing(1)};
`;

const getItemId = (item: Widget) => item.id;

const renderItem = (item: Widget) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <div>
          <div>
            <TextField
              placeholder="scale name"
              variant="standard"
              value={item.name}
            />
          </div>
          {item.id}
        </div>
      </CardContent>
    </Card>
  );
};

export const Dashboard = (props: {
  widgets: Array<Widget>;
  onChange: (items: Widget[]) => void;
}) => {
  return (
    <Container>
      <SwapableList
        items={props.widgets}
        getItemId={getItemId}
        renderItem={renderItem}
        onChange={props.onChange}
      />
    </Container>
  );
};
