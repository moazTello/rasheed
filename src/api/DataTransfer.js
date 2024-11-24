import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || "https://org.yaseralsamsam.com/"
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('accessT');
      window.location.href = '/rasheed';
    }
    return Promise.reject(error);
  }
);
axios.defaults.baseURL = BASE_URL;
export default axiosInstance;
