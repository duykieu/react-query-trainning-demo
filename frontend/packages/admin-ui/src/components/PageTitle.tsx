import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Plus } from "react-feather";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 2rem;
    margin: 0;
  }
  margin-bottom: 1.5rem;
`;

export interface IPageTitle {
  title: string;
  trailing?: any;
  createLink?: string;
}

export const PageTitle: React.FunctionComponent<IPageTitle> = ({
  title,
  trailing,
  createLink,
}) => {
  return (
    <Wrapper>
      <h2>{title}</h2>
      <div>
        {trailing}
        {!!createLink && (
          <Link to={createLink}>
            <Button type="primary">Thêm mới</Button>
          </Link>
        )}
      </div>
    </Wrapper>
  );
};
