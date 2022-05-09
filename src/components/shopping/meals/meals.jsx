import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "../../../context/dataContext";
import http from "../../../services/httpService";
import CreateForm from "../component/createForm";
import Meal from "./meal";

function Meals(props) {
  const [meals, setMeals] = useState([]); // An array of all meals available
  const context = useContext(dataContext);

  useEffect(() => {
    async function getMeals() {
      const {
        data: { meals = [] },
      } = context;
      setMeals(meals);
    }
    getMeals();
  }, [context]);

  const handleCreate = (value) => {
    const newMeal = { id: null, meal_ingredients: [], name: value };
    const newMeals = [...meals, newMeal];

    const index = newMeals.indexOf(newMeal);

    context.setData("meals", newMeals);

    doCreate(newMeal, index);
  };

  const doCreate = async (meal, index) => {
    delete meal["id"];

    const result = await toast.promise(http.post(http.mealsEP, meal), {
      pending: `Creating Meal: ${meal.name} on server`,
      success: `Created Meal: ${meal.name} on server!`,
      error: `Couldn't create Meal: ${meal.name} on server :(`,
    });

    meal["id"] = result.data["id"];
    const newMeals = [...meals];
    newMeals[index] = meal;
    context.setData("meals", newMeals);
  };

  return (
    <div>
      <h2>Meals:</h2>

      <CreateForm
        doCreate={handleCreate}
        placeHolder={"New Meal name..."}
        buttonLabel={"Create new Meal"}
      />
      <div className="meals">
        {meals.map((meal) => (
          <Meal meal={meal} key={meal.id} />
        ))}
      </div>
    </div>
  );
}

export default Meals;
