import React, { useState, useEffect, Fragment } from "react";
import http from "../../services/httpService";
import { toast } from "react-toastify";
import UserContext from "../../context/userContext";

function Meals(props) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function getMeals() {
      const result = await http.get("/shopping/meals/");
      setMeals(result.data);
    }
    toast.promise(getMeals, {
      error: "Error: couldn't get meals! Try again later",
    });
  }, []);

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
      <ul>{renderMeals()}</ul>
    </div>
  );
}

export default Meals;
