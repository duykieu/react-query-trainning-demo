import React from "react";
import styled from "styled-components";
import { Colors } from "../colors";

const Wrapper = styled.div`
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  background-color: ${Colors.White};
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
`;

export const ListItemCard = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
