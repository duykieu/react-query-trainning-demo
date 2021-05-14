import React from "react";
import styled from "styled-components";
import { Colors, ErrorAlert } from "@dontloop/admin-ui";
import { useFormik } from "formik";
import * as Validator from "yup";
import { FormikInputFormGroup } from "../components";
import { Button } from "antd";
import { AuthContext } from "../components/AuthProvider";
import { ILoginPayload } from "../data/models/user";
import { useMutation } from "react-query";
import { useLoginMutation } from "../data/mutations/user.mutation";

const Wrapper = styled.div`
  background-color: ${Colors.Primary};
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FormWrapper = styled.div`
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: ${Colors.White};

  h1 {
    text-align: center;
  }
`;

const LoginPage = () => {
  const { token, setToken } = React.useContext(AuthContext);

  const mutation = useLoginMutation();

  /**
   * Form instance
   */
  const fm = useFormik<ILoginPayload>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Validator.object().shape({
      username: Validator.string().required(),
      password: Validator.string().required(),
    }),
    onSubmit(values) {
      mutation.mutate(
        { payload: values },
        {
          onSuccess(data) {
            setToken(data.token);
          },
        }
      );
    },
  });

  return (
    <Wrapper>
      <FormWrapper>
        <h1>{mutation.isLoading ? "Logging In..." : "Login"}</h1>
        {!!mutation.error && <ErrorAlert messages={mutation.error} />}
        <FormikInputFormGroup fm={fm} name="username" label="Username" />
        <FormikInputFormGroup
          type="password"
          fm={fm}
          name="password"
          label="Password"
        />
        {/*@ts-ignore*/}
        <Button onClick={fm.handleSubmit} block>
          Next
        </Button>
      </FormWrapper>
    </Wrapper>
  );
};

export default LoginPage;
