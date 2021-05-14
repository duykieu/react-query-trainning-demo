import React from "react";
import styled from "styled-components";
import EditButton from "./EditButton";
import { DeleteButton } from "./DeleteButton";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 1rem;
`;

interface IFunctionButtonsProps {
    onEdit?: any;
    onDelete?: any;
}

export const FunctionButtons: React.FunctionComponent<IFunctionButtonsProps> = ({
    onEdit,
    onDelete,
}) => {
    return (
        <Wrapper>
            {onEdit && <EditButton onEdit={onEdit} />}

            <DeleteButton onDelete={onDelete} />
        </Wrapper>
    );
};
