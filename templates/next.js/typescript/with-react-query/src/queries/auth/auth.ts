import Cookies from "js-cookie";
import { api } from "@/api/api";
import endpoints from "@/constant/endpoints";
import { LoginParams } from "@/types/authTypes";
import { UserType } from "@/types/userTypes";
import { REFRESH_TOKEN_KEY } from "@/constant/constant";

interface signupWithDjangoType {
  access: string;
  refresh: string;
  user: UserType;
}
interface refreshTokenType {
  access: string;
  access_expiration: string;
}

export async function loginWithDjango(
  dto: LoginParams
): Promise<signupWithDjangoType> {
  const { data } = await api(endpoints.auth.login, dto, "postWithoutToken");

  return data;
}

export async function refreshToken(): Promise<refreshTokenType> {
  const { data } = await api(
    endpoints.auth.refresh,
    { refresh: Cookies.get(REFRESH_TOKEN_KEY) },
    "post"
  );

  return data;
}

export async function fetchUser(): Promise<UserType> {
  const { data } = await api(endpoints.user.userDetails, {}, "get");

  return data;
}
