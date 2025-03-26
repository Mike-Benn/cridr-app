import axios from "axios"
import { logoutAndRedirect, validateToken } from "../utils/auth/utils";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

apiClient.interceptors.request.use(
    async (config) => {
        if (config.url === "/auth/refresh-token" || config.url === "/auth/login") {
            return config;
        }
        try {
            await validateToken(config);
            return config;
        } catch (error) {
            if (error.response?.status === 401) {
                logoutAndRedirect();
            }
            return Promise.reject(error);
        }
    },
    (error) => Promise.reject(error)
)

export default apiClient