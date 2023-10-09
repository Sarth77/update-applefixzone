"use client";

const { useEffect } = require("react");
const { axiosAuth } = require("@/lib/axios");
import { useRefreshToken } from "./useRefreshToken";
import { useSession } from "next-auth/react";



const useAxiosAuth = () => {
    const { data: session } = useSession()
    const refreshToken = useRefreshToken();

    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use((config) => {
            if (!config.headers["Authorization"]) {
                config.headers["Authorization"] = session?.accessToken;
            }
            return config;
        },
            (error) => Promise.reject(error)
        );
        const responseIntercept = axiosAuth.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error.config;
                if (error.response.status === 498 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    await refreshToken();
                    prevRequest.headers["Authorization"] = session?.accessToken;
                    return axiosAuth(prevRequest);
                }
                return Promise.reject(error);
            }
        )
        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept);
            axiosAuth.interceptors.response.eject(responseIntercept);
        }
    }, [session, refreshToken]);

    return axiosAuth;
}

export default useAxiosAuth;