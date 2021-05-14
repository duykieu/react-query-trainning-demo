import React from "react";
import { Edit } from "react-feather";
import { Button } from "antd";

interface IEditButtonProps {
    onEdit: any;
}

const EditButton: React.FunctionComponent<IEditButtonProps> = ({ onEdit }) => {
    return <Button onClick={onEdit} size="small" type="link" icon={<Edit size={15} />} />;
};

export default EditButton;
