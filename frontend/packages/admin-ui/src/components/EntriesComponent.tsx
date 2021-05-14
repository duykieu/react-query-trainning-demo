import React from "react";
import styled from "styled-components";
import { Empty } from "antd";
import { Colors } from "../colors";

const Wrapper = styled.div`
  border: 1px solid #ccc;
  padding: 3rem 0;
  margin-bottom: 2rem;
`;

interface IEntriesComponentProps {
  isEmpty: boolean;
  noDataMessage?: string;
}

const EntriesComponent: React.FunctionComponent<IEntriesComponentProps> = ({
  isEmpty,
  noDataMessage,
  children,
}) => {
  if (isEmpty) {
    return (
      <Wrapper>
        <Empty description={noDataMessage || "Không có dữ liệu"} />
      </Wrapper>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default EntriesComponent;
