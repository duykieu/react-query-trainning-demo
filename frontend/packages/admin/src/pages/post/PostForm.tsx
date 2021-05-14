import React from "react";
import styled from "styled-components";
import { PageTitle } from "@dontloop/admin-ui";
import { MainContent } from "../../components";

const Wrapper = styled.div``;

interface IPostFormProps {}

export const PostForm: React.FunctionComponent<IPostFormProps> = () => {
  return (
    <MainContent>
      <Wrapper></Wrapper>
    </MainContent>
  );
};

export default PostForm;
