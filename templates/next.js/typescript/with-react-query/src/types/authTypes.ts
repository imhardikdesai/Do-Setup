import { UseMutationResult } from "@tanstack/react-query";
import { UserType } from "./userTypes";

export interface LoginParams {
  username: string;
  password: string;
}

export interface AuthValuesType {
  loading: boolean;
  logout: () => void;
  user: UserType | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserType | null) => void;
  login?: UseMutationResult<any, any, LoginParams, unknown>;
}
