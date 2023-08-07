import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (e) => Promise.reject(e)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (e) => {
    if (e.response.status === 401) {
      const token = localStorage.getItem("access_token");
      if (token) {
        localStorage.removeItem("access_token");
        return;
      }
      return;
    }
    return Promise.reject(e);
  }
);

export const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export default instance;
