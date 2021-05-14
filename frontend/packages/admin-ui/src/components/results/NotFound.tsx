import React from "react";
import { Button, Result } from "antd";
import styled from "styled-components";
import { useCommons } from "../../hooks";

interface INotFoundProps {
    message: string;
}

export const NotFound: React.FunctionComponent<INotFoundProps> = ({ message }) => {
    const { history } = useCommons();

    return (
        <Result status={404} title="Không tìm thấy" subTitle={message}>
            <Button onClick={() => history.goBack()}>Trở lại</Button>
        </Result>
    );
};
