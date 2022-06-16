import { en } from "../services/textService";

export const mealFromID = (id, meals, object) => {
  const item = meals.filter((meal) => meal["id"] === id)[0];
  if (item && object) {
    return item;
  } else if (item) {
    return item.name;
  } else {
    return en.meals.notFound;
  }
};

export const recipeFromMealId = (id, meals) => {
  const item = meals.filter((meal) => meal["id"] === id)[0];

  if (!item.recipe) {
    return en.recipes.noRecipeForThisMeal;
  }

  return item.recipe;
};

const meals = { mealFromID, recipeFromMealId };

export default meals;
