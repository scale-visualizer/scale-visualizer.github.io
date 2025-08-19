import type { ReactNode } from "react";

import styled from "@emotion/styled";

import { Header } from "../Header/Header";

const Container = styled("div")`
  height: 100%;
  display: grid;
  grid: min-content auto / 100%;
`;

export const Layout = (props: {
  CustomHeaderControls: React.ReactNode;
  children: ReactNode;
}) => {
  return (
    <Container>
      <Header CustomControls={props.CustomHeaderControls} />
      {props.children}
    </Container>
  );
};
