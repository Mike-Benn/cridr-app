import { jwtDecode } from "jwt-decode";
import apiClient from "../../api/apiClient";


const REQ_BUFFER_TIME = 100

function isTokenValid() {
    const token = localStorage.getItem("accessToken");
    if (token) {
        const { exp } = jwtDecode(token);
        const currTime = Math.floor(Date.now() / 1000) + REQ_BUFFER_TIME; // // Added time to handle potential case of token expiring in the middle of http request
        return currTime < exp;
    } else {
        return false;
    }
}

function logoutAndRedirect() {
    localStorage.removeItem("accessToken");
    window.location.href = "/log-in";
}

async function validateToken(config) {
    const token = localStorage.getItem("accessToken");

    if (isTokenValid(token)) {
        config.headers["Authorization"] = `Bearer ${token}`;
    } else {
        const refreshResponse = await apiClient.post("/auth/refresh-token");
        if (refreshResponse?.status === 200 && refreshResponse.data?.data) {
            localStorage.setItem("accessToken", refreshResponse.data.data);
            config.headers["Authorization"] = `Bearer ${refreshResponse.data.data}`;
        }
    }
}

export {
    isTokenValid,
    logoutAndRedirect,
    validateToken,
}



