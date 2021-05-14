import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "react-feather";
import cls from "classnames";

import { Colors } from "../colors";
import { AdminUIConfig } from "../setup";

const Wrapper = styled.div`
  background-color: ${Colors.Primary};
  height: 100%;
  width: 25rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  padding: 1.5rem;
`;

const Menu = styled.div`
  display: grid;
  grid-template-columns: auto;
  a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
  }
`;

const MenuItem = styled.div`
  &.active > .submenu {
    display: block;
  }
  a {
    display: flex;
    justify-content: space-between;
    height: 5rem;
    align-items: center;
    padding: 0 2rem;
    color: ${Colors.MainBackground};
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    &:hover {
      background-color: ${Colors.PrimaryLight};
    }

    &.active {
      background-color: ${Colors.MainBackground};
      color: ${Colors.Primary};
      position: relative;
      &::before {
        content: "";
        width: 3rem;
        height: 3rem;
        background-size: 100%;
        background-image: url("/images/bottom-menu-corner.svg");
        margin-right: -1.25rem;
        position: absolute;
        top: -3rem;
        right: 1.3rem;
        transform: rotate(90deg);
      }
      &::after {
        content: "";
        width: 3rem;
        height: 3rem;
        background-size: 100%;
        background-image: url("/images/top-menu-corner.svg");
        margin-right: -1.25rem;
        position: absolute;
        top: 5rem;
        right: 1.3rem;
      }
    }
  }
  .submenu {
    display: none;
    padding-left: 3.2rem;
    a {
      background-color: transparent;
      &.active {
        background-color: transparent !important;
        color: ${Colors.MainBackground};
        &::after,
        &::before {
          display: none;
        }
      }
    }
  }

  .icon {
    margin-right: 1rem;
  }
  svg {
    display: flex;
  }

  .left {
    display: flex;
  }
`;

export interface ISidebarMenu {
  label: string;
  path: string;
  icon?: React.ReactNode;
  permissions?: string[];
  children?: ISidebarMenu[];
  active?: RegExp;
  module?: string;
}

interface ISidebarProps {
  menuData: ISidebarMenu[];
  logoPath: string;
}

const Sidebar: React.FunctionComponent<ISidebarProps> = ({
  menuData,
  logoPath,
}) => {
  /**
   * Url location
   */
  const location = useLocation();

  /**
   * Show right chev
   * @param item
   */
  const showChev = (item: ISidebarMenu) => {
    return item.children && item.children.length;
  };

  /**
   * Check is menu is active
   * @param item: ISidebarMenu
   */
  const isActive = (item: ISidebarMenu) => {
    if (item.active) {
      if (item.active.test(location.pathname)) {
        return true;
      }
    }
    return location.pathname === item.path;
  };

  /**
   * Render menu item
   * @param item
   * @param index
   * @param className
   */
  const renderMenuItem = (
    item: ISidebarMenu,
    index: number,
    className?: string
  ) => {
    if (item.module) {
      if (!AdminUIConfig.modules?.includes(item.module)) {
        return null;
      }
    }
    return (
      <MenuItem
        key={index}
        className={cls({
          active: isActive(item),
        })}
      >
        <Link
          to={item.path}
          className={cls({
            active: item.path === location.pathname,
          })}
        >
          <div className="left">
            {/* @ts-ignore */}
            {item.icon && <item.icon className="icon" />}
            {item.label}
          </div>
          {showChev(item) && <ChevronDown size={15} />}
        </Link>

        {item.children && (
          <div className="submenu">
            {item.children.map((child, index) =>
              renderMenuItem(child, index, "menu-item")
            )}
          </div>
        )}
      </MenuItem>
    );
  };
  return (
    <Wrapper>
      <LogoWrapper>
        <Link to="/">
          <img src={logoPath} alt="" />
        </Link>
      </LogoWrapper>
      <Menu>{menuData.map((item, index) => renderMenuItem(item, index))}</Menu>
    </Wrapper>
  );
};

export default Sidebar;
