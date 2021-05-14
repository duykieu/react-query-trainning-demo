import React from "react";
import styled from "styled-components";

import Sidebar, { ISidebarMenu } from "./Sidebar";
import { cls } from "@dontloop/utils";
import { Colors } from "../colors";

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  min-height: calc(100vh - 3rem);
  .main-container {
    flex: 1;
    border-radius: 3rem;
    background-color: ${Colors.MainBackground};
    overflow: auto;
  }
`;

const SidebarWrapper = styled.div`
  top: 0;
  height: 100%;
  overflow: hidden;
`;

interface ILayoutProps {
  routes: React.ReactNode;
  menuData: ISidebarMenu[];
  logoPath: string;
  showSidebar: boolean;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({
  routes,
  menuData,
  logoPath,
  showSidebar,
}) => {
  return (
    <Wrapper className={cls({ "with-sidebar": showSidebar })}>
      <SidebarWrapper className={cls({ active: showSidebar })}>
        <Sidebar logoPath={logoPath} menuData={menuData} />
      </SidebarWrapper>
      <div className="main-container">{routes}</div>
    </Wrapper>
  );
};

export default Layout;
