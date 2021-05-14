import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { Plus, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";

import { Colors } from "../colors";
import { IBaseDom } from "../types/dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
`;

const Title = styled.div`
  height: 4rem;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  justify-content: space-between;
  font-weight: bold;
  color: #434f89;
  .left {
    display: flex;
    align-items: center;
  }
  .icon {
    margin-right: 1rem;
    height: 10px;
    width: 10px;
    background-color: #434f89;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Body = styled.div`
  flex: 1;
  padding: 2rem;
`;

interface IPanelProps extends IBaseDom {
  title?: string;
  trailing?: React.ReactNode | string;
  bodyStyles?: any;
  createLink?: string;
}

const Panel: React.FunctionComponent<IPanelProps> = ({
  title,
  trailing,
  children,
  bodyStyles = {},
  createLink,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      {!!title && (
        <Title>
          <div className="left">
            {title && <div className="icon"></div>}

            {title}
          </div>

          <div>
            {createLink && (
              <Link to={createLink}>
                <Button type="link" size="small" icon={<Plus size={20} />} />
              </Link>
            )}
            {trailing}
          </div>
        </Title>
      )}

      <Body style={bodyStyles}>{children}</Body>
    </Wrapper>
  );
};

export default Panel;
