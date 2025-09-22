import axios from "axios";
import { useNavigate } from "react-router-dom";
const BackendApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});
BackendApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

BackendApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Token may be expired.");
      const navigate = useNavigate();
      localStorage.removeItem("authToken");
      navigate("/");
    }
    return Promise.reject(error);
  }
);

export default BackendApi;
