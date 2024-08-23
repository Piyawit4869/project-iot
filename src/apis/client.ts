import axios from 'axios';
import * as API from './auth';
const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

const client = () => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('accessToken');
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 403 || error.response.status === 401) {
        window.location.href = '/login';
        localStorage.removeItem('accessToken');
      }
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem('refreshToken');
        const resp = await API.refreshToken(refreshToken);
        const access_token = resp.data.accessToken;

        localStorage.setItem('accessToken', access_token);
        instance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${access_token}`;
        return instance(originalRequest);
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export default client();
