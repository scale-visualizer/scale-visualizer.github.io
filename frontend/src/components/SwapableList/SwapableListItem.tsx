import React from "react";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import IconButton from "@mui/material/IconButton";

import styled from "@emotion/styled";

const Container = styled("li")`
  list-style-type: none;
  display: grid;
  grid: auto / min-content auto;
`;

const Controls = styled("div")`
  display: grid;
  align-content: space-between;
  grid: auto auto / min-content;
`;

const Content = styled("div")`
  height: 100%;
`;

const CustomIconButton = styled(IconButton)`
  font-size: 0.7rem;
`;

export class SwapableListItem<Item extends {}> extends React.PureComponent<{
  item: Item;
  index: number;
  renderItem: (item: Item) => React.ReactNode;
  onUpwardClick: (index: number) => void;
  onDownwardClick: (index: number) => void;
}> {
  onUpwardClick = () => {
    this.props.onUpwardClick(this.props.index);
  };

  onDownwardClick = () => {
    this.props.onDownwardClick(this.props.index);
  };

  render = () => {
    return (
      <Container>
        <Controls>
          <CustomIconButton onClick={this.onUpwardClick} size="small">
            <ArrowUpwardIcon fontSize="inherit" />
          </CustomIconButton>
          <CustomIconButton onClick={this.onDownwardClick} size="small">
            <ArrowDownwardIcon fontSize="inherit" />
          </CustomIconButton>
        </Controls>
        <Content>{this.props.renderItem(this.props.item)}</Content>
      </Container>
    );
  };
}
