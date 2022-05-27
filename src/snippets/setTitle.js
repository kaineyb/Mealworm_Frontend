import config from "../services/config.json";
export function setTitle(pageName) {
  document.title = `${config.siteName} - ${pageName}`;
}
