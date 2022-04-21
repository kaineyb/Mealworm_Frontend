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
  const stores = await http.get(http.storesEP);
  const sections = await http.get(http.sectionsEP);
  const plans = await http.get(http.plansEP);
  const ingredients = await http.get(http.ingredientsEP);
  const meals = await http.get(http.mealsEP);

  const data = {
    stores: stores.data,
    sections: sections.data,
    plans: plans.data,
    ingredients: ingredients.data,
    meals: meals.data,
  };
  return data;
}

const data = {
  getAll,
  patchStores,
  deleteStore,
  createStore,
};

export default data;
