import React from "react";
import styled from "styled-components";
import { ListItemCard } from "../../../admin-ui/src";
import { EditDelete } from "@dontloop/admin-ui";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

interface IListItemProps {
  label: string;
  editLink?: string;
  onDelete?: any;
}

export const ListItem: React.FunctionComponent<IListItemProps> = ({
  label,
  editLink,
  onDelete,
}) => {
  return (
    <ListItemCard>
      <Wrapper>
        <div>{label}</div>
        <EditDelete editLink={editLink} onDelete={onDelete} />
      </Wrapper>
    </ListItemCard>
  );
};

export default ListItem;
