import { AxiosResponse } from "axios";
import API, { METHOD } from "../interceptor";

type CREATE_USER = (
  loginId: string,
  password: string,
  email: string,
  nickname: string
) => Promise<AxiosResponse<any, any>>;

type SIGN_IN = (
  loginId: string,
  password: string
) => Promise<AxiosResponse<any, any>>;

type CHECK_DUPLICATE = (
  loginId?: string,
  email?: string,
  nickname?: string,
  authCode?: string
) => Promise<AxiosResponse<any, any>>;

export const createUser: CREATE_USER = (loginId, password, email, nickname) => {
  return API({
    method: METHOD.POST,
    url: "/signup",
    data: {
      loginId,
      password,
      email,
      nickname,
    },
  });
};

export const checkIdDuplicate: CHECK_DUPLICATE = (loginId) => {
  return API({
    method: METHOD.POST,
    url: "/iddupcheck",
    data: {
      userInputId: loginId,
    },
  });
};

export const checkNickNameDuplicate: CHECK_DUPLICATE = (nickname) => {
  return API({
    method: METHOD.POST,
    url: "/nicknamedupcheck",
    data: {
      nickname: nickname,
    },
  });
};

export const sendAuthCodeToUserEmail: CHECK_DUPLICATE = (email, authCode) => {
  return API({
    method: METHOD.POST,
    url: "/sendauthcode",
    data: {
      userEmail: email,
      authCode: authCode,
    },
  });
};

export const signin: SIGN_IN = (loginId, password) => {
  return API({
    method: METHOD.POST,
    url: "/signin",
    data: {
      loginId,
      password,
    },
  });
};

export const tokenTest = () => {
  return API({
    method: METHOD.GET,
    url: "/token-test",
  });
};
