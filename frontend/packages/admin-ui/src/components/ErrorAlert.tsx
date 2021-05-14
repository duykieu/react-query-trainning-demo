import React from "react";
import { Alert } from "antd";

interface IErrorAlertProps {
    messages: string | string[] | null;
    closable?: boolean;
    onClose?: any;
}

const ErrorAlert: React.FunctionComponent<IErrorAlertProps> = ({
    messages,
    closable,
    onClose,
}) => {
    return (
        <Alert
            type="error"
            message="Có lỗi xảy ra"
            closable={closable}
            onClose={onClose}
            description={
                <ul style={{ paddingLeft: "3rem" }}>
                    {typeof messages === "string" && <li>{messages}</li>}
                    {Array.isArray(messages) &&
                        messages.map((msg, index) => <li key={index}>{msg}</li>)}
                </ul>
            }
        />
    );
};

export default ErrorAlert;
