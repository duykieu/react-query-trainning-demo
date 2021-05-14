import React from "react";
import styled from "styled-components";
import { Colors } from "../colors";

const Wrapper = styled.div`
    max-width: 1100px;
    border: 1px dashed ${Colors.Gray4};
    padding: 2rem;
    background-color: ${Colors.Gray2};
    position: relative;
    &:not(:last-child) {
        margin-bottom: 2rem;
    }

    .title {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        margin-top: -0.5rem;
    }
`;

const FormWrapper: React.FunctionComponent<{
    title?: string | React.ReactNode;
    className?: string;
    style?: any;
    headerProps?: any;
    ref?: any;
}> = ({ children, title, headerProps = {}, ...props }) => (
    <Wrapper {...props}>
        {title && (
            <div className="title" {...headerProps}>
                {title}
            </div>
        )}

        {children}
    </Wrapper>
);

export default FormWrapper;
