import React from "react";
import styled from "styled-components";
import { MainContent } from "../components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

interface IHomePageProps {}

export const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  return (
    <MainContent>
      <Wrapper>Hello There</Wrapper>
    </MainContent>
  );
};

export default HomePage;
