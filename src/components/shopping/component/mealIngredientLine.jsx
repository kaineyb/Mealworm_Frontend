import { Fragment, useState, useEffect, useContext } from "react";
import DataContext from "../../../context/dataContext";

const MealIngredientLine = () => {
  const [ingredients, setIngredients] = useState([]);

  // In future this could be pulled off the server?
  const units = [
    [" x ", "Items"],
    ["g", "Grams"],
    ["kg", "Kilograms"],
    ["ml", "Millilitres"],
    ["l", "Litres"],
  ];

  const context = useContext(DataContext);

  useEffect(() => {
    async function getIngredients() {
      const {
        data: { ingredients = [] },
      } = context;
      setIngredients(ingredients);
      // console.log("Side Effect: Ingredients Set");
    }
    getIngredients();
  }, [context]);

  return (
    <Fragment>
      <label htmlFor="new-meal-name">Ingredient:</label>
      <select id="new-meal-ingredient">
        {ingredients.map((ingredient) => (
          <option>{ingredient.name}</option>
        ))}
      </select>
      <label htmlFor="new-ingredient-quantity">Quantity:</label>
      <input
        type="text"
        id="new-ingredient-quantity"
        name="new-ingredient-quantity"
        placeholder="Quantity"
      />
      <label htmlFor="new-meal-unit">Unit:</label>
      <select>
        {units.map((unit) => (
          <option key={unit[0]} value={unit[0]}>
            {unit[1]}
          </option>
        ))}
      </select>
    </Fragment>
  );
};

export default MealIngredientLine;
