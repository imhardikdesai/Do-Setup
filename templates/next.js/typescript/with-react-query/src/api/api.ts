// ***** start - import from packages *****
import { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "@/constant/constant";
import { apiClient, userClient } from "@/lib/client";

// ***** end - import from packages *****

type requestType =
  | "get"
  | "post"
  | "delete"
  | "postFormData"
  | "postWithoutToken"
  | "postFormDataWithoutToken";

// ***** start - Api function for call any type of apis *****
export const api = async (
  endpoint: string,
  data: any,
  type: requestType,
  configs?: AxiosRequestConfig<any>
) => {
  let res: any;
  const token = Cookies.get(ACCESS_TOKEN_KEY);

  const BASIC_HEADER = {
    Accept: "application/json",
    "Content-Type":
      type === "postFormData" || type === "postFormDataWithoutToken"
        ? "multipart/form-data"
        : "application/json",
    ...(type === "postWithoutToken" || type === "postFormDataWithoutToken"
      ? {}
      : { Authorization: `Bearer ${token}` }),
  };

  switch (type) {
    case "get":
      res = await apiClient.get(endpoint, {
        headers: BASIC_HEADER,
        ...configs,
      });
      break;
    case "post":
      res = await apiClient.post(endpoint, data, {
        headers: BASIC_HEADER,
        ...configs,
      });
      break;
    case "delete":
      res = await apiClient.delete(endpoint, {
        headers: BASIC_HEADER,
        ...configs,
      });
      break;
    case "postWithoutToken":
      res = await userClient.post(endpoint, data, {
        headers: BASIC_HEADER,
        ...configs,
      });
      break;
    case "postFormData":
      res = await apiClient.post(endpoint, data, {
        headers: BASIC_HEADER,
        ...configs,
      });
      break;
    case "postFormDataWithoutToken":
      res = await userClient.post(endpoint, data, {
        headers: BASIC_HEADER,
        ...configs,
      });
      break;
    default:
      return true;
  }

  if (typeof res.data === "string") {
    try {
      res.data = JSON.parse(res.data);
    } catch (parseError) {
      console.error("Error parsing response data:", parseError);
    }
  }

  return res;
};

// ***** end - Api function for call any type of apis *****
