import axios from "axios";

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const setAuthHeader = (token: string | null) => {
  if (token !== null) {
    window.localStorage.setItem("auth_token", token);
  } else {
    window.localStorage.removeItem("auth_token");
  }
};

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

export const request = (
  method: string,
  url: string,
  params: Object,
  data: Object
) => {
  let headers = {};
  if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = { Authorization: `Bearer ${getAuthToken()}` };
  }

  return axios({
    method: method,
    url: url,
    params: params,
    headers: headers,
    data: data,
  });
};
