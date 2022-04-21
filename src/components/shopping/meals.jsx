import React, { useState, useEffect, useContext } from "react";

import MealIngredientLine from "./component/mealIngredientLine";

import DataContext from "../../context/dataContext";

function Meals(props) {
  const [meals, setMeals] = useState([]);
  const context = useContext(DataContext);

  useEffect(() => {
    async function getMeals() {
      const {
        data: { meals = [] },
      } = context;
      setMeals(meals);
    }
    getMeals();
  }, [context]);

  const createMealsForm = () => {
    return (
      <div>
        <label htmlFor="new-meal-name">Name:</label>
        <input
          type="text"
          id="new-meal-name"
          name="new-meal-name"
          placeholder="New meal name"
        />
        <br />
        {/* Below will be dynamic and can be infinite lines */}
        <MealIngredientLine />
      </div>
    );
  };

  const renderMeals = () => {
    return meals.map((meal) => (
      <li key={meal.id}>
        <strong>{meal.name}</strong>
        <ul>
          {meal.meal_ingredients.map((meal_ingredient) => (
            <li key={meal_ingredient.id}>
              {meal_ingredient.quantity}
              {meal_ingredient.unit} {meal_ingredient.ingredient["name"]}
            </li>
          ))}
        </ul>
      </li>
    ));
  };

  return (
    <div>
      <h2>Meals:</h2>
      {createMealsForm()}
      <ul>{renderMeals()}</ul>
    </div>
  );
}

export default Meals;
