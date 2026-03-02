import axios from "axios";
import { logout } from "../services/authService";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

//Request Interceptor
//runs before request is sent!
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.set("Authorization", `Bearer ${token}`);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
//Response Interceptor
//runs after response is received!
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear token and notify app to update auth state 
            logout();
        }
        return Promise.reject(error);
    }
);


export default apiClient;