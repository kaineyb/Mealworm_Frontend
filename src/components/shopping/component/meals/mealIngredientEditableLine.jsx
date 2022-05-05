import { Fragment, useContext, useEffect, useState } from "react";
import DataContext from "../../../../context/dataContext";

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
      <input
        type="text"
        id="new-ingredient-quantity"
        name="new-ingredient-quantity"
        placeholder="Quantity"
      />
      <select>
        {units.map((unit) => (
          <option key={unit[0]} value={unit[0]}>
            {unit[1]}
          </option>
        ))}
      </select>
      <select id="new-meal-ingredient">
        {ingredients.map((ingredient) => (
          <option key={ingredient.id}>{ingredient.name}</option>
        ))}
      </select>
      <button>Delete Line</button>
    </Fragment>
  );
};

export default MealIngredientLine;
