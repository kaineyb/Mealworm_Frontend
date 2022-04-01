// httpService.js
import axios from "axios";
import config from "./config.json";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

const { accessTokenKey, refreshTokenKey } = config;

function setJwt(access, refresh) {
  if (access && refresh) {
    localStorage.setItem(accessTokenKey, access);
    localStorage.setItem(refreshTokenKey, refresh);
    axios.defaults.headers.common[accessTokenKey] = access;
  }
}

const authEndPoint = "auth/";
const shoppingEndpoint = "/shopping/";

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  authEndPoint,
  shoppingEndpoint,
  setJwt,
};
