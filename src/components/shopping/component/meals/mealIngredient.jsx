import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DataContext from "../../../../context/dataContext";
import http from "../../../../services/httpService";

const MealIngredient = (props) => {
  const { meal_ingredient, name, meal } = props;
  const [editable, setEditable] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const [newQuantity, setNewQuantity] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [newIngredient, setNewMealIngredient] = useState("");

  const { quantity, unit, ingredient } = meal_ingredient;

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

  const handleClick = () => {
    setNewQuantity(quantity);
    setNewUnit(unit);
    setNewMealIngredient(ingredient);
    setEditable(true);
  };

  const handleCancel = () => {
    setNewQuantity("");
    setNewUnit("");
    setNewMealIngredient("");
    setEditable(false);
  };

  const canSave = newQuantity === "" ? false : true;

  const handleDelete = () => {
    const deleteMe = window.confirm(
      `Really Delete "${quantity} ${unit} ${name}"?`
    );

    if (deleteMe) {
      const {
        data: { meals },
        setData,
      } = context;

      // Remove Locally
      const newMeals = [...meals];
      const myMeal = newMeals.filter((_meal) => _meal.id === meal.id)[0];
      const mealIngredients = myMeal["meal_ingredients"];

      const newMealIngredients = mealIngredients.filter(
        (mi) => mi.id !== meal_ingredient.id
      );

      myMeal["meal_ingredients"] = newMealIngredients;

      setData("meals", newMeals);

      // Remove on Server
      doDelete();
    }
  };

  const handleSave = () => {
    if (
      newQuantity === quantity &&
      newIngredient === ingredient &&
      newUnit === unit
    ) {
      setEditable(false);
      return;
    }

    const {
      data: { meals },
      setData,
    } = context;

    // Set Locally
    const newMeals = [...meals];
    const myMeal = newMeals.filter((_meal) => _meal.id === meal.id)[0];
    const mealIngredients = myMeal["meal_ingredients"];

    const myMealIngredient = mealIngredients.filter(
      (mi) => mi.id === meal_ingredient.id
    )[0];

    myMealIngredient["ingredient"] = parseInt(newIngredient);
    myMealIngredient["unit"] = newUnit;
    myMealIngredient["quantity"] = parseInt(newQuantity);
    setData("meals", newMeals);

    // Set on server
    const payload = {};

    payload["ingredient"] = parseInt(newIngredient);
    payload["quantity"] = parseInt(newQuantity);
    payload["unit"] = newUnit;

    doSave(payload);

    setEditable(false);
  };

  const doSave = async (payload) => {
    await toast.promise(
      http.patch(
        `${http.mealsEP}${meal.id}/ingredients/${meal_ingredient.id}/`,
        payload
      ),
      {
        pending: `Updating Meal Ingredient for Meal: ${meal.name} on server`,
        success: `Updated Meal Ingredient for meal: ${meal.name} on server!`,
        error: `Couldn't update Meal Ingredient for meal: ${meal.name} on server :(`,
      }
    );
  };

  const doDelete = async () => {
    await toast.promise(
      http.delete(
        `${http.mealsEP}${meal.id}/ingredients/${meal_ingredient.id}/`
      ),
      {
        pending: `Deleting Meal Ingredient for Meal: ${meal.name} on server`,
        success: `Deleted Meal Ingredient for meal: ${meal.name} on server!`,
        error: `Couldn't delete Meal Ingredient for meal: ${meal.name} on server :(`,
      }
    );
  };

  const quantityOnChange = ({ currentTarget: input }) => {
    setNewQuantity(input.value);
  };

  const unitOnChange = (event) => {
    setNewUnit(event.target.value);
  };

  const mealOnChange = (event) => {
    setNewMealIngredient(event.target.value);
  };

  const toggle = editable ? (
    <li className="clickable meal_ingredient" key={meal_ingredient.id}>
      <input
        name={`${meal_ingredient.id}-input-quantity`}
        id={`${meal_ingredient.id}-input-quantity`}
        defaultValue={meal_ingredient.quantity}
        onChange={(event) => quantityOnChange(event)}
      />
      <select
        onChange={(event) => unitOnChange(event)}
        defaultValue={meal_ingredient.unit}
        name={`${meal_ingredient.id}-select-unit`}
        id={`${meal_ingredient.id}-select-unit`}
      >
        {units.map((selection) => (
          <option key={selection[0]} value={selection[0]}>
            {selection[1]}
          </option>
        ))}
      </select>
      <select
        onChange={(event) => mealOnChange(event)}
        defaultValue={meal_ingredient.ingredient}
        name={`${meal_ingredient.id}-select-ingredient`}
        id={`${meal_ingredient.id}-select-ingredient`}
      >
        {ingredients.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.id}>
            {ingredient.name}
          </option>
        ))}
      </select>

      <button onClick={handleSave} disabled={!canSave}>
        Save
      </button>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  ) : (
    <li
      className="clickable meal_ingredient"
      key={meal_ingredient.id}
      onClick={handleClick}
    >
      {meal_ingredient.quantity} {meal_ingredient.unit}
      {" - "}
      {name}
    </li>
  );

  return toggle;
};

export default MealIngredient;