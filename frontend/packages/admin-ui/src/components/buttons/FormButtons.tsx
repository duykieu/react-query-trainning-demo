import React from "react";
import styled from "styled-components";
import { Button } from "antd";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

interface IFormButtonsProps {
    loading?: boolean;
    onSave?: any;
    onSaveAndContinue?: any;
    onCancel?: any;
    onDelete?(): any;
}

export const FormButtons: React.FunctionComponent<IFormButtonsProps> = ({
    loading,
    onCancel,
    onSave,
    onSaveAndContinue,
    onDelete,
}) => (
    <Wrapper>
        <span>
            {onSave && (
                <Button
                    loading={loading}
                    onClick={onSave}
                    type="primary"
                    style={{ marginRight: "1rem" }}
                >
                    Lưu lại
                </Button>
            )}

            {onSaveAndContinue && (
                <Button
                    loading={loading}
                    onClick={onSaveAndContinue}
                    type="primary"
                    style={{ marginRight: "1rem" }}
                >
                    Lưu và thêm mới
                </Button>
            )}

            <Button loading={loading} onClick={onCancel}>
                Trở lại
            </Button>
        </span>
        {onDelete && (
            <Button onClick={onDelete} type="ghost">
                Xóa
            </Button>
        )}
    </Wrapper>
);
