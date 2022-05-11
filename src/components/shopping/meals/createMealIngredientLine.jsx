import { Button, HStack, Input, Select } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "../../../context/dataContext";
import http from "../../../services/httpService";

const CreateMealIngredientLine = (props) => {
  const { meal, units, ingredients, removeLine, line_id } = props;

  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [ingredient, setIngredient] = useState("");

  const name_id = line_id;

  const context = useContext(dataContext);

  const handleChangeQuantity = ({ currentTarget: input }) => {
    setQuantity(parseInt(input.value));
  };
  const handleChangeUnit = (event) => {
    setUnit(event.target.value);
  };
  const handleChangeIngredient = (event) => {
    setIngredient(event.target.value);
  };

  const validateSave = quantity > 0 && unit && ingredient ? true : false;

  const handleSave = async () => {
    if (validateSave) {
      const {
        data: { meals },
        setData,
      } = context;

      // Set Locally
      const newMeals = [...meals];
      const myMeal = newMeals.filter((_meal) => _meal.id === meal.id)[0];

      const newMeal = {
        id: null,
        ingredient: parseInt(ingredient),
        quantity: parseInt(quantity),
        unit: unit,
      };

      myMeal["meal_ingredients"].push(newMeal);

      const index = myMeal["meal_ingredients"].indexOf(newMeal);

      removeLine(line_id);

      const newId = await doSave(newMeal);
      myMeal["meal_ingredients"][index]["id"] = newId;

      setData("meals", newMeals);
    }
  };
  const doSave = async (payload) => {
    delete payload["id"];
    const result = await toast.promise(
      http.post(`${http.mealsEP}${meal.id}/ingredients/`, payload),
      {
        pending: `Creating Meal Ingredient for Meal: ${meal.name} on server`,
        success: `Created Meal Ingredient for meal: ${meal.name} on server!`,
        error: `Couldn't create Meal Ingredient for meal: ${meal.name} on server :(`,
      }
    );
    return result.data["id"];
  };

  return (
    <HStack key={1} my={4}>
      <Input
        width="sm"
        size="sm"
        name={`${name_id}-input-quantity`}
        type="number"
        min="1"
        id={`${name_id}-input-quantity`}
        placeholder="Enter Quantity..."
        onChange={(event) => handleChangeQuantity(event)}
      />
      <Select
        width="sm"
        size="sm"
        name={`${name_id}-select-unit`}
        id={`${name_id}-select-unit`}
        onChange={(event) => handleChangeUnit(event)}
        defaultValue="header"
      >
        <option value="header" disabled hidden>
          Choose Unit...
        </option>
        {units.map((selection) => (
          <option key={selection[0]} value={selection[0]}>
            {selection[1]}
          </option>
        ))}
      </Select>
      <Select
        width="sm"
        size="sm"
        name={`${name_id}-select-ingredient`}
        id={`${name_id}-select-ingredient`}
        onChange={(event) => handleChangeIngredient(event)}
        defaultValue="header"
      >
        <option value="header" disabled hidden>
          Choose Ingredient...
        </option>
        {ingredients.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.id}>
            {ingredient.name}
          </option>
        ))}
      </Select>
      <Button size="sm" px={5} disabled={!validateSave} onClick={handleSave}>
        Save
      </Button>
      <Button size="sm" px={5} onClick={() => removeLine(line_id)}>
        Cancel
      </Button>
    </HStack>
  );
};

export default CreateMealIngredientLine;
