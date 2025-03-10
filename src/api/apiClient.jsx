import axios from "axios"

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/*
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (err) => {
        if (err.response?.status === 401 && !err.response.data?.refreshAttempted) {
            try {
                console.log("running");
                return apiClient.post("/auth/refresh-token");
            } catch (refreshError) {
                Promise.reject(refreshError);
            }
        }
        console.log("This is the error", err);
        Promise.reject(err);
    }
)


/*
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (accessError) => {
        if (accessError.response && accessError.response.status === 401) {
            try {
                const refreshResponse = await apiClient.post("/auth/refresh-token");
                if (refreshResponse.data?.data) {
                    localStorage.setItem("accessToken", refreshResponse.data.data);

                }

            } catch (refreshError) {
                Promise.reject(refreshError)
            }

        }
        Promise.reject(accessError);
    }
)
*/
export default apiClient