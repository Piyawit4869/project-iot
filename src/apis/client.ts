import axios from "axios";

const client = () => {
  let instance = axios.create({});

  instance.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem("accessToken");

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 403 || error.response.status === 401) {
        window.location.href = "/login";
        localStorage.removeItem("accessToken");
      }
    }
  );

  return instance;
};

export default client();
