import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { priveteAxios } from "../api/axios";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const requestInterceptor = priveteAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseInterceptor = priveteAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousReq= error?.config
        if (error?.response?.status === 403 && !previousReq?._retry) {
          previousReq._retry = true;
          const newAccessToken = await refresh();
          previousReq.headers["Authorization"] = ` Bearer ${newAccessToken}`;
          return priveteAxios(previousReq);
        } else {
          Promise.reject(error);
        }
      }
    );

    return () => {
      priveteAxios.interceptors.request.eject(requestInterceptor);
      priveteAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [refresh, auth]);

  return priveteAxios;
};

export default useAxiosPrivate;