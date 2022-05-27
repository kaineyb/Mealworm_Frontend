import { toast } from "react-toastify";
import config from "./config.json";
import http from "./httpService";
import { default as jwt, default as jwtService } from "./jwtService";

const { jwtPrefix } = config;

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

    const userSet = await setCurrentUserLocallyFromServer();
    // console.log("userSet", userSet);

    return userSet;
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
export async function getCurrentUserObj() {
  const localUser = await JSON.parse(localStorage.getItem("user"));

  if (!localUser) {
    // console.log("Had to get user from server, not in local?");
    const user = await getCurrentUserFromServer();
    return user.data;
  }
  return localUser;
}

export function getCurrentUserName() {
  return getCurrentUserObj()["username"];
}
//

async function refreshAccessToken(refreshToken) {
  const response = await jwt.refreshToken(refreshToken);
  const {
    data: { access },
  } = response;

  if (response.status === 200) {
    http.setJwt(jwtPrefix + access, refreshToken);
    toast.success("Access Token Refreshed!");
    return true;
  } else {
    toast.warning("Couldn't Refresh the Access token :(");
    return false;
  }
}

export function quickCheck() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { access, refresh } = jwtService.getJwtTokens();

  if (!access || !refresh || !user) {
    return false;
  }

  const accessHasTime = jwtService.tokenNotExpired(access);
  const refreshHasTime = jwtService.tokenNotExpired(refresh);

  if (accessHasTime && refreshHasTime) {
    return true;
  }
}

// Check if Logged In:
export async function loggedIn() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { access, refresh } = jwtService.getJwtTokens();

  if (!access || !refresh || !user) {
    logout();
    // console.log(
    //   "loggedIn: missing access token, refresh token or user, therefore logging out"
    // );
    return false;
  }

  const accessHasTime = jwtService.tokenNotExpired(access);
  const refreshHasTime = jwtService.tokenNotExpired(refresh);

  if (accessHasTime && refreshHasTime) {
    return true;
  }

  const accessValid = await jwtService.checkTokenValid("access", access);
  const refreshValid = await jwtService.checkTokenValid("refresh", refresh);

  if (accessValid && refreshValid) {
    console.log("loggedIn: true");
    return true;
  } else if (!accessValid && refreshValid) {
    console.log(
      "loggedIn: valid refresh token, trying to get a new access token..."
    );
    const refreshAccepted = await refreshAccessToken(refresh);
    if (refreshAccepted) {
      console.log("loggedIn: refresh accepted, should be good?");
      return true;
    }
  } else {
    console.log("loggedIn: logging you out mate!");
    logout();
    window.location = "/";
    return false;
  }
}

const auth = {
  register,
  login,
  logout,
  loggedIn,
  getCurrentUserObj,
  getCurrentUserName,
  quickCheck,
};
export default auth;
