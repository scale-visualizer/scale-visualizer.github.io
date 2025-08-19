import React from "react";

import styled from "@emotion/styled";

import { theme } from "../../theme";

import { SwapableListItem } from "./SwapableListItem";

const Container = styled("ul")`
  margin: 0;
  padding: 0;
  display: grid;
  grid: auto-flow / auto;
  gap: ${theme.spacing(1)} 0;
`;

export class SwapableList<Item extends {}> extends React.Component<{
  items: Array<Item>;
  getItemId: (item: Item) => string;
  renderItem: (item: Item) => React.ReactNode;
  onChange: (items: Array<Item>) => void;
}> {
  moveItem = (args: { index: number; direction: 1 | -1 }) => {
    const length = this.props.items.length;
    const nextIndex =
      (length + ((args.index + args.direction) % length)) % length;

    const newItems = [...this.props.items];

    [newItems[nextIndex], newItems[args.index]] = [
      newItems[args.index],
      newItems[nextIndex],
    ];

    this.props.onChange(newItems);
  };

  onUpwardClick = (index: number) => {
    this.moveItem({ index, direction: -1 });
  };

  onDownwardClick = (index: number) => {
    this.moveItem({ index, direction: 1 });
  };

  render = () => {
    return <Container>{this.renderItems()}</Container>;
  };

  renderItems = () => {
    return this.props.items.map((item, index) => {
      return (
        <SwapableListItem
          key={this.props.getItemId(item)}
          item={item}
          renderItem={this.props.renderItem}
          index={index}
          onUpwardClick={this.onUpwardClick}
          onDownwardClick={this.onDownwardClick}
        />
      );
    });
  };
}
