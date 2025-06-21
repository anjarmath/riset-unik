import { isAxiosError } from "axios";
import axiosInstance from "./axios";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestReturn<T> = {
  data: T | null;
  error?: {
    code: string;
    message: string;
  };
};

async function handleRequest<T>(
  method: HttpMethod,
  endpoint: string,
  body?: any
): Promise<RequestReturn<T>> {
  try {
    const config = {
      method,
      url: endpoint,
      ...(body ? { data: body} : {}),
    };

    const res = await axiosInstance(config);
    return { data: res.data };
  } catch (error) {
    return {
      data: null,
      error: isAxiosError(error)
        ? {
            code: error.response?.status.toString() || "UNKNOWN_ERROR",
            message:
              error.response?.data.message ?? error.response?.data,
          }
        : {
            code: "UNKNOWN_ERROR",
            message: (error as Error).message,
          },
    };
  }
}

export default handleRequest;