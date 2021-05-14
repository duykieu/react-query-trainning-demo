import React from "react";
import styled, { keyframes } from "styled-components";
import { Menu, Loader } from "react-feather";
import { Link } from "react-router-dom";

import { Avatar, Button, Popover } from "antd";
import { cls } from "@dontloop/utils";
import { Colors } from "../colors";

const OuterWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: ${Colors.MainBackground};
`;

const Wrapper = styled.div`
  height: 6.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  border-top-left-radius: 3rem;
  padding: 0 2rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  .title {
    font-size: 1.8rem;
    text-transform: uppercase;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .spinner {
    animation: ${rotate} 1s linear infinite;
    display: none;
    &.active {
      display: block;
    }
  }
`;

const AccountMenu = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 1rem;
`;

const LineWrapper = styled.div`
  display: flex;
  justify-content: center;
  & > div {
    width: 80%;
    border-bottom: 1px solid ${Colors.Gray5};
  }
`;

interface ITopBarProps {
  title?: string;
  loading?: boolean;
  onToggleMenu?: any;
  onLogout?: any;
}

const TopBar: React.FunctionComponent<ITopBarProps> = ({
  title,
  loading = false,
  onLogout,
  onToggleMenu,
}) => {
  return (
    <OuterWrapper>
      <Wrapper>
        <Left>
          <Menu
            onClick={onToggleMenu ? onToggleMenu : null}
            style={{ marginRight: "1.5rem", cursor: "pointer" }}
            size={16}
          />
          <div className="title">{title}</div>
        </Left>
        <Right>
          <Loader
            className={cls({ spinner: true, active: loading })}
            style={{ marginRight: "1.5rem" }}
          />
          <Popover
            content={
              <AccountMenu>
                <Link to="/users/profile">Quản lý tài khoản</Link>
                <Button type="link" onClick={onLogout ? onLogout : null}>
                  Thoát ra
                </Button>
              </AccountMenu>
            }
          >
            <Avatar>K</Avatar>
          </Popover>
        </Right>
      </Wrapper>
      <LineWrapper>
        <div />
      </LineWrapper>
    </OuterWrapper>
  );
};

export default TopBar;
