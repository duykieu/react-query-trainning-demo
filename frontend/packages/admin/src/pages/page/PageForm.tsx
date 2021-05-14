import React from "react";
import styled from "styled-components";
import { MainContent } from "../../components";

const Wrapper = styled.div``;

interface IPageFormProps {}

export const PageForm: React.FunctionComponent<IPageFormProps> = () => {
  return (
    <MainContent>
      <Wrapper>
        <h1>Page Form</h1>
      </Wrapper>
    </MainContent>
  );
};

export default PageForm;
