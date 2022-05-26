import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Divider, Flex, IconButton, Input, Select } from "@chakra-ui/react";
import { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "../../../context/dataContext";
import http from "../../../services/httpService";
import { en } from "./../../../services/textService";

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
        pending: en.mealIngredient.postPromise.pending(meal.name),
        success: en.mealIngredient.postPromise.success(meal.name),
        error: en.mealIngredient.postPromise.error(meal.name),
      }
    );
    return result.data["id"];
  };

  return (
    <Fragment>
      <Divider />
      <Flex key={1} gap={2} direction={{ base: "column", sm: "row" }}>
        <Input
          size="sm"
          name={`${name_id}-input-quantity`}
          type="number"
          min="1"
          id={`${name_id}-input-quantity`}
          placeholder={en.mealIngredient.enterQuantity}
          onChange={(event) => handleChangeQuantity(event)}
        />
        <Select
          size="sm"
          name={`${name_id}-select-unit`}
          id={`${name_id}-select-unit`}
          onChange={(event) => handleChangeUnit(event)}
          defaultValue="header"
        >
          <option value="header" disabled hidden>
            {en.mealIngredient.chooseUnit}
          </option>
          {units.map((selection) => (
            <option key={selection[0]} value={selection[0]}>
              {selection[1]}
            </option>
          ))}
        </Select>
        <Select
          size="sm"
          name={`${name_id}-select-ingredient`}
          id={`${name_id}-select-ingredient`}
          onChange={(event) => handleChangeIngredient(event)}
          defaultValue="header"
        >
          <option value="header" disabled hidden>
            {en.mealIngredient.chooseIngredient}
          </option>
          {ingredients.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          ))}
        </Select>

        <IconButton
          disabled={!validateSave}
          onClick={handleSave}
          colorScheme={"green"}
          aria-label={en.mealIngredient.ariaSave}
          icon={<CheckIcon />}
          size="sm"
        />
        <IconButton
          aria-label={en.mealIngredient.ariaCancel}
          icon={<CloseIcon />}
          size="sm"
          onClick={() => removeLine(line_id)}
        />
      </Flex>
    </Fragment>
  );
};

export default CreateMealIngredientLine;
