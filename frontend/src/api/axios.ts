import axios from "axios";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: `${apiUrl}/api`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// token expired?
API.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status === 401) {

      localStorage.removeItem("token");
      toast.error("Token expired, redirecting to sign-in page.");
      window.location.href = "/signin";

    }
    else if (error.code === "ERR_NETWORK") {

      localStorage.removeItem("token");
      toast.error("Network error.");
      // window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

export default API;
