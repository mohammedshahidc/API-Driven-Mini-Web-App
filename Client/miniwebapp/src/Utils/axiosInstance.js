import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-driven-mini-web-app-1.onrender.com/api",
  withCredentials:true 
});

export default axiosInstance;
