import axios from "axios";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response?.status) {
      case 401:
        console.log("Please login again");
        break;

      case 403:
        console.log("Access denied");
        break;

      case 404:
        console.log("Resource not found");
        break;

      case 500:
        console.log("Internal server error");
        break;

      default:
        console.log("Something went wrong");
    }
    return Promise.reject(error);
  },
);

export default axiosApi;
