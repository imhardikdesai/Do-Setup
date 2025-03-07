import axios from "axios";
import {
  InvalidateOptions,
  InvalidateQueryFilters,
  QueryClient,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constant/constant";
import endpoints from "../constant/endpoints";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export const invalidateQueries = (
  filters?: InvalidateQueryFilters | undefined,
  options?: InvalidateOptions | undefined
): Promise<void> => queryClient.invalidateQueries(filters, options);

export const refetchQueries = (
  filters?: RefetchQueryFilters | undefined,
  options?: RefetchOptions | undefined
): Promise<void> => queryClient.refetchQueries(filters, options);

/**
 * This is general api client which will be used for most of the stuff
 */
export const userClient = axios.create();

/**
 * This is general api client which will be used for most of the stuff
 */
export const apiClient = axios.create();

apiClient.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (
      error?.response?.data?.error_message?.details[0] ===
      "Given token not valid for any token type"
    ) {
      try {
        const res = await axios.post(endpoints.auth.refresh, {
          refresh: Cookies.get(REFRESH_TOKEN_KEY),
        });

        if (res.status === 200) {
          Cookies.set(ACCESS_TOKEN_KEY, res.data.access);
          axios.defaults.headers.common["Authorization"] =
            `Bearer ${res.data.access}`;

          return axios({
            ...error.config,
            headers: { Authorization: `Bearer ${res.data.access}` },
          });
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);
