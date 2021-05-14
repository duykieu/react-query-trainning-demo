import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Edit, Archive } from "react-feather";
import { Colors } from "../colors";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > div,
  & > a {
    display: flex;
    align-items: center;
    svg {
      margin-right: 1rem;
    }
  }
  .delete {
    cursor: pointer;
  }
`;

interface IEditDeleteProps {
  editLink?: string;
  onDelete?: any;
}

export const EditDelete: React.FunctionComponent<IEditDeleteProps> = ({
  editLink,
  onDelete,
}) => {
  return (
    <Wrapper>
      {editLink && (
        <Link to={editLink} style={{ color: Colors.TextPrimary }}>
          <Edit size={15} /> Sửa
        </Link>
      )}
      {onDelete && (
        <div
          className="delete"
          style={{ marginLeft: "2rem", color: Colors.Danger }}
          onClick={onDelete}
        >
          <Archive size={15} /> Xóa
        </div>
      )}
    </Wrapper>
  );
};
