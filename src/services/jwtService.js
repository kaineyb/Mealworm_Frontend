import http from "./httpService";
import config from "./config.json";

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
  return await http.post(jwtRefreshEP, refresh);
}

async function verifyToken(token) {
  return await http.post(jwtVerifyEP, token);
}

function getJwtTokens() {
  const access = localStorage.getItem(accessTokenKey);
  const refresh = localStorage.getItem(refreshTokenKey);
  return { access, refresh };
}

const { access, refresh } = getJwtTokens();
http.setJwt(access, refresh);

export default {
  createToken,
  refreshToken,
  verifyToken,
  getJwt: getJwtTokens,
};
