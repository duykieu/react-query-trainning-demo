import Model from "./model";
import { USER_API_ENDPOINT } from "../../config";

export interface IUser {
  id?: string;
  name: string;
  displayName: string;
  phoneNumber: string;
  phoneNumber2?: string;
  password?: string;
  passwordConfirm?: string;
  email?: string;
  address?: string;
  isActive?: boolean;
}

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginSuccessPayload {
  token: string;
  currentUser: IUser;
}

export const formatPhone = (phone: string) => {
  const nonZero = String(Number(phone));
  const newPhone = nonZero.replace("+84", "");
  return "+84" + newPhone;
};

export class User extends Model {
  /**
   * Loging user
   * @param payload
   */
  static login(payload: ILoginPayload) {
    return this.client()
      .post("/login/", {
        ...payload,
        username: formatPhone(payload.username),
      })
      .then(({ data }) =>
        this.resolve<ILoginSuccessPayload>({
          currentUser: data.user,
          token: data.token,
        })
      );
  }
}

User.initial({ endpoint: USER_API_ENDPOINT });
