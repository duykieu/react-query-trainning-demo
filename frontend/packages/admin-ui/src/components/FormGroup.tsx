import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    label {
        font-size: 1.3rem;
        color: #929292;
    }
    margin-bottom: 2rem;
`;

const Error = styled.div`
    font-size: 1.2rem;
    color: red;
`;

interface IFormGroupProps {
    label?: string;
    children?: React.ReactNode;
    error?: string;
    touched?: boolean;
    required?: boolean;
}

const FormGroup: React.FunctionComponent<IFormGroupProps> = ({
    children,
    touched,
    error,
    label,
    required,
}) => (
    <Wrapper>
        {label && (
            <label>
                {label} {required && <span style={{ color: "red" }}>*</span>}
            </label>
        )}
        {children}
        {error && touched && <Error>{error}</Error>}
    </Wrapper>
);

export default FormGroup;
