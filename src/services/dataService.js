import http from "./httpService";

const ep = http.shoppingEP;

// Stores

export async function patchStores(id, payload) {
  const storesEP = `${ep}stores/${id}/`;
  const response = await http.patch(storesEP, payload);
  return response;
}

export async function deleteStore(id) {
  const storesEP = `${ep}stores/${id}/`;
  return await http.delete(storesEP);
}

export async function createStore(payload) {
  const storesEP = `${ep}stores/`;
  return await http.post(storesEP, payload);
}

export async function getAll() {
  const result = await http.get(http.shoppingEP + "get_all/");

  return result.data;
}

const data = {
  getAll,
  patchStores,
  deleteStore,
  createStore,
};

export default data;
