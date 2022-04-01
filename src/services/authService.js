import http from "./httpService";
import jwt from "./jwtService";
import config from "./config.json";

// 3rd Party
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const { accessTokenKey, jwtPrefix, refreshTokenKey } = config;

// Register Endpoints
const registerEP = http.authEndPoint + "users/";
const userInfo = registerEP + "me/";

export async function register(user) {
  return await http.post(registerEP, {
    email: user.email,
    username: user.username,
    password: user.password,
  });
}

export async function login(user) {
  const response = await jwt.createToken(user);

  if (response.status === 200) {
    const { access, refresh } = response.data;
    http.setJwt(jwtPrefix + access, refresh);
    if (await setCurrentUserLocallyFromServer()) {
      return true;
    }
  }
  return false;
}

export function logout() {
  localStorage.clear();
}

// From Backend

async function setCurrentUserLocallyFromServer() {
  const response = await getCurrentUserFromServer();
  if (response.status === 200) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return true;
  } else return false;
}

async function getCurrentUserFromServer() {
  return http.get(userInfo);
}

//

// From Memory
export function getCurrentUserObj() {
  return JSON.parse(localStorage.getItem("user"));
}

export function getCurrentUserName() {
  return getCurrentUserObj()["username"];
}
//

// Check if Logged In:
export function loggedIn() {
  const access = localStorage.getItem(accessTokenKey);
  const refresh = localStorage.getItem(refreshTokenKey);
  const user = JSON.parse(localStorage.getItem("user"));

  if (access && refresh && user) {
    return true;
  }
  return false;
}

export default {
  register,
  login,
  logout,
  loggedIn,
  getCurrentUserObj,
  getCurrentUserName,
};
