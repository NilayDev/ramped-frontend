import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { axiosClient } from "../configs/api.config";
import { getLocalStorageKeys } from "../utils";
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Check the success.
 *
 */
const checkSuccess = (response: any) => {
  if (
    response?.data?.message &&
    (response.status === 200 || response.status === 201)
  ) {
    toast.success(response?.data?.message, { autoClose: 2000 });
  } else {
    toast.success("Success!!", { autoClose: 2000 });
  }
};

/**
 * Check the errors.
 *
 */
const checkError = (error: any) => {
  if (error?.response && error.response?.data) {
    let { data } = error.response;
    if (data?.message) {
      data?.status !== 401 &&
        toast.error(data?.message, {
          autoClose: 2000,
        });
    } else {
      toast.error("Internal server error", {
        autoClose: 2000,
      });
    }
  } else if (error?.message === "Network Error") {
    // clearToken();
    toast.error(error?.message, {
      autoClose: 2000,
    });
  } else {
    toast.error(error?.message, {
      autoClose: 2000,
    });
  }
  if (error.response) {
    if (error.response.status === 401) {
    } else if (error.response.status === 403) {
      // clearToken();
      // changeRoute("/login");
    }
  }
};

/**
 * Gets the headers.
 *
 */
const getHeaders = (data: any, isDeleteMethod?: boolean) => {
  let axiosConfig: any = {
    headers: {},
  };
  const userToken = getLocalStorageKeys("token");
  axiosConfig.headers["accept-language"] = "en";
  axiosConfig.headers["Content-Type"] = "application/json";

  if (data) {
    if (data.isMultipart) {
      axiosConfig.headers["Content-Type"] = "multipart/form-data";
    }

    if (data.headers) {
      for (var key in data.headers) {
        if (data.headers.hasOwnProperty(key)) {
          axiosConfig.headers[key] = data.headers[key];
        }
      }
    }
    if (data.params) {
      axiosConfig.params = { ...data.params };
    }
    if (data.data && isDeleteMethod) {
      axiosConfig.data = { ...data.data };
    }
  }
  if (userToken) {
    axiosConfig.headers["authorization"] = `Bearer ${userToken}`;
  } else {
    axiosConfig.headers["authorization"] = ``;
  }

  return axiosConfig;
};

export const get = async (
  path: string,
  config?: AxiosRequestConfig,
  showToast?: Boolean,
  urlType?: string
) => {
  return await axiosClient
    .get(`${path}`, getHeaders(config))
    .then((response) => {
      if (showToast) {
        checkSuccess(response);
      }

      return response.data;
    })
    .catch((error) => {
      checkError(error);
      throw error.response.data;
    });
};

export const post = async (
  path: string,
  payload: any,
  config?: AxiosRequestConfig,
  showToast?: Boolean,
  urlType?: string
) => {
  return await axiosClient
    .post(`${path}`, payload, getHeaders(config))
    .then((response: any) => {
      if (showToast) {
        checkSuccess(response);
      }
      if (response?.data?.data?.user?.accessToken) {
        localStorage.setItem("token", response?.data?.data?.user?.accessToken);
        localStorage.setItem(
          "refreshToken",
          response?.data?.data?.user?.refreshToken
        );
        localStorage.setItem("userId", response?.data?.data?.user?.id);
      }
      return response.data;
    })
    .catch((error) => {
      checkError(error);
      throw error.response.data;
    });
};

export const put = async (
  path: string,
  payload: any,
  config?: AxiosRequestConfig,
  showToast?: Boolean,
  urlType?: string
) => {
  return await axiosClient
    .put(`${path}`, payload, getHeaders(config))
    .then((response: any) => {
      if (showToast) {
        checkSuccess(response);
      }
      return response.data;
    })
    .catch((error) => {
      checkError(error);
      throw error.response.data;
    });
};

export const deleteMethod = async (
  path: string,
  config?: AxiosRequestConfig,
  showToast?: Boolean,
  urlType?: string
) => {
  return await axiosClient
    .delete(`${path}`, getHeaders(config, true))
    .then((response: any) => {
      if (showToast) {
        checkSuccess(response);
      }
      return response.data;
    })
    .catch((error) => {
      checkError(error);
      throw error.response.data;
    });
};
