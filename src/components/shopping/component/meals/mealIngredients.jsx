import { Fragment, useContext, useEffect, useState } from "react";
import DataContext from "../../../../context/dataContext";
import CreateMealIngredientForm from "./createMealIngredientForm";
import MealIngredient from "./mealIngredient";

const MealIngredients = (props) => {
  const { meal_ingredients, meal } = props;

  const context = useContext(DataContext);

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function getIngredients() {
      const {
        data: { ingredients = [] },
      } = context;
      setIngredients(ingredients);
    }
    getIngredients();
  }, [context]);

  const ingredientFromID = (id, object = false) => {
    const item = ingredients.filter((ingredient) => ingredient["id"] === id)[0];
    if (item && object) {
      return item;
    } else if (item) {
      return item.name;
    }
  };

  return (
    <Fragment>
      {meal_ingredients.map((meal_ingredient) => (
        <MealIngredient
          key={meal_ingredient.id}
          meal_ingredient={meal_ingredient}
          name={ingredientFromID(meal_ingredient.ingredient)}
          meal={meal}
        />
      ))}
      <hr />
      <CreateMealIngredientForm meal={meal} />
    </Fragment>
  );
};

export default MealIngredients;
