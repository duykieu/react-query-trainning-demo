import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Card = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Card;
