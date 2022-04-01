import http from "./httpService";

const mealsEP = http.shoppingEndpoint + "meals/";

export async function getMeals() {
  const meals = await http.get(mealsEP);
  return meals.data;
}

export default {
  mealsEP,
  getMeals,
};
