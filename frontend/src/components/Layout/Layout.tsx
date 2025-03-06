import type { ReactNode } from "react";

import styled from "@emotion/styled";

import { Header } from "../Header/Header";

const Container = styled("div")`
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: min-content auto;
`;

export const Layout = (props: { children: ReactNode }) => {
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
};
