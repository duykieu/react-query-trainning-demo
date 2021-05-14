import { useMutation } from "react-query";
import { ILoginPayload, ILoginSuccessPayload, User } from "../models/user";
import { BaseError } from "../models/model";

interface ILoginQueryParams {
  payload: ILoginPayload;
}

export function useLoginMutation() {
  return useMutation<ILoginSuccessPayload, BaseError, ILoginQueryParams>(
    function ({ payload }: ILoginQueryParams) {
      return User.login(payload);
    }
  );
}
