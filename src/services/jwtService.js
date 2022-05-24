// 3rd Party
import jwtDecode from "jwt-decode";
import { DateTime } from "luxon";
import config from "./config.json";
import http from "./httpService";

const { accessTokenKey, refreshTokenKey } = config;

// JWT Endpoints
const jwtEP = http.authEndPoint + "jwt/";

const jwtCreateEP = jwtEP + "create/";
const jwtRefreshEP = jwtEP + "refresh/";
const jwtVerifyEP = jwtEP + "verify/";

async function createToken(user) {
  return await http.post(jwtCreateEP, {
    username: user.username,
    password: user.password,
  });
}

async function refreshToken(refresh) {
  return await http.post(jwtRefreshEP, { refresh: refresh });
}

async function verifyToken(token) {
  return await http.post(jwtVerifyEP, token);
}

function getJwtTokens() {
  const access = localStorage.getItem(accessTokenKey);
  const refresh = localStorage.getItem(refreshTokenKey);
  return { access, refresh };
}

async function checkTokenValid(type, token = "") {
  if (type === "access") {
    token = token.replace(config.jwtPrefix, "");
  }

  const verify = await verifyToken({ token: token });

  if (verify === undefined) {
    // console.log(type, "token bad");
    return false;
  }
  // console.log(type, "token verified");
  return true;
}

async function checkTokensValid(access, refresh) {
  const accessValid = await checkTokenValid("access", access);
  const refreshValid = await checkTokenValid("refresh", refresh);

  if (accessValid && refreshValid) {
    return true;
  }
  return false;
}

function tokenNotExpired(token) {
  const now = DateTime.now();

  if (token) {
    const tokenEpoch = jwtDecode(token).exp;
    const tokenISO = DateTime.fromSeconds(tokenEpoch).toISO();
    const tokenDT = DateTime.fromISO(tokenISO);

    const tokenDurationObj = tokenDT.diff(now, ["seconds"]).toObject();

    if (tokenDurationObj.seconds > 0) {
      return true;
    }
  }
}

function tokenTimeOut(token) {
  const now = DateTime.now();

  if (token) {
    const tokenEpoch = jwtDecode(token).exp;
    const tokenISO = DateTime.fromSeconds(tokenEpoch).toISO();
    const tokenDT = DateTime.fromISO(tokenISO);

    const tokenDurationObj = tokenDT
      .diff(now, ["days", "hours", "minutes", "seconds"])
      .toObject();

    return tokenDurationObj;
  }
}

const { access, refresh } = getJwtTokens();
http.setJwt(access, refresh);

const jwt = {
  createToken,
  refreshToken,
  verifyToken,
  getJwtTokens,
  checkTokensValid,
  checkTokenValid,
  tokenTimeOut,
  tokenNotExpired,
};
export default jwt;
