// httpService.js
import axios from "axios";
import config from "./config.json";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const { accessTokenKey, refreshTokenKey } = config;

function setJwt(access, refresh) {
  if (access && refresh) {
    localStorage.setItem(accessTokenKey, access);
    localStorage.setItem(refreshTokenKey, refresh);
    axios.defaults.headers.common[accessTokenKey] = access;
  }
}

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Unexpected Error: Logging the error", error);
  }

  if (error.response.status === 401) {
    console.log("401 Unauthorized");
  } else {
    return Promise.reject(error);
  }
});

const authEP = "auth/";
const shoppingEP = "shopping/";

const storesEP = shoppingEP + "stores/";
const sectionsEP = shoppingEP + "sections/";

const plansEP = shoppingEP + "plans/";
const ingredientsEP = shoppingEP + "ingredients/";
const mealsEP = shoppingEP + "meals/";

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
  authEndPoint: authEP,
  shoppingEP,
  storesEP,
  sectionsEP,
  ingredientsEP,
  mealsEP,
  plansEP,
};
export default http;
