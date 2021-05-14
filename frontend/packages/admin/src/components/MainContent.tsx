import React from "react";
import styled from "styled-components";

import { TopBar, Devices, IBaseDom } from "@dontloop/admin-ui";
import { useDispatch } from "react-redux";

interface IMainContentProps extends IBaseDom {
  title?: string;
  style?: any;
  loading?: boolean;
  contentStyles?: any;
}

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;

  ${Devices.upMD} {
    padding: 0;
  }
`;

const MainContent: React.FunctionComponent<IMainContentProps> = ({
  title,
  loading = false,
  children,
  contentStyles = {},
  ...props
}) => {
  return (
    <Main {...props}>
      <TopBar title={title} loading={loading} />
      <Content style={contentStyles}>{children}</Content>
    </Main>
  );
};

export default MainContent;
