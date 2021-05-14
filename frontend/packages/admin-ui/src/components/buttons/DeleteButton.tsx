import React from "react";
import { Button, Popconfirm } from "antd";
import { Archive } from "react-feather";

interface IDeleteButtonProps {
    onDelete: any;
}

export const DeleteButton: React.FunctionComponent<IDeleteButtonProps> = ({
    onDelete,
}) => {
    return (
        <Popconfirm onConfirm={onDelete} title="Xác nhận xóa">
            <Button size="small" type="link" icon={<Archive size={15} />} />
        </Popconfirm>
    );
};
