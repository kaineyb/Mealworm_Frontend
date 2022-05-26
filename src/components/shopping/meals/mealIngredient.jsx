import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DataContext from "../../../context/dataContext";
import http from "../../../services/httpService";
import { en } from "../../../services/textService";

const MealIngredient = (props) => {
  const { meal_ingredient, name, meal } = props;
  const [editable, setEditable] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const [newQuantity, setNewQuantity] = useState(0);
  const [newUnit, setNewUnit] = useState("");
  const [newIngredient, setNewMealIngredient] = useState("");

  const bg = useColorModeValue("gray.100", "whiteAlpha.200");
  const color = useColorModeValue("black", "white");

  const { quantity, unit, ingredient } = meal_ingredient;

  const units = en.units;

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

  const validateSave = newQuantity > 0 ? true : false;

  const handleDelete = () => {
    const deleteMe = window.confirm(
      en.mealIngredient.delete.confirm(quantity, unit, name)
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

  const doDelete = async () => {
    await toast.promise(
      http.delete(
        `${http.mealsEP}${meal.id}/ingredients/${meal_ingredient.id}/`
      ),
      {
        pending: en.mealIngredient.delete.promise.pending(meal.name),
        success: en.mealIngredient.delete.promise.success(meal.name),
        error: en.mealIngredient.delete.promise.error(meal.name),
      }
    );
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
        pending: en.mealIngredient.patchPromise.pending(meal.name),
        success: en.mealIngredient.patchPromise.success(meal.name),
        error: en.mealIngredient.patchPromise.error(meal.name),
      }
    );
  };

  const quantityOnChange = ({ currentTarget: input }) => {
    setNewQuantity(input.value);
  };

  const unitOnChange = (event) => {
    console.log(event.target.value);
    setNewUnit(event.target.value);
  };

  const mealOnChange = (event) => {
    setNewMealIngredient(event.target.value);
  };

  const toggle = editable ? (
    <Box
      bg={bg}
      color={color}
      my={4}
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      className="clickable meal_ingredient"
      key={meal_ingredient.id}
    >
      <Flex direction={{ base: "column", sm: "row" }} gap={2}>
        <Input
          size="sm"
          name={`${meal_ingredient.id}-input-quantity`}
          type="number"
          min="1"
          id={`${meal_ingredient.id}-input-quantity`}
          defaultValue={meal_ingredient.quantity}
          onChange={(event) => quantityOnChange(event)}
        />
        <Select
          size="sm"
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
        </Select>
        <Select
          size="sm"
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
        </Select>

        <IconButton
          disabled={!validateSave}
          colorScheme={"green"}
          aria-label={en.mealIngredient.ariaSave}
          icon={<CheckIcon />}
          size="sm"
          onClick={handleSave}
        />
        <IconButton
          aria-label={en.mealIngredient.ariaCancel}
          icon={<CloseIcon />}
          size="sm"
          onClick={handleCancel}
        />
        <IconButton
          colorScheme={"red"}
          aria-label={en.mealIngredient.ariaDelete}
          icon={<DeleteIcon />}
          size="sm"
          onClick={handleDelete}
        />
      </Flex>
    </Box>
  ) : (
    <Box
      bg={bg}
      color={color}
      position="relative"
      my={4}
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      className="clickable meal_ingredient"
      key={meal_ingredient.id}
      onClick={handleClick}
    >
      {meal_ingredient.quantity} {meal_ingredient.unit}
      {" - "}
      {name}{" "}
      <Icon
        as={EditIcon}
        ml={2}
        w={3}
        h={3}
        position="absolute"
        top="2"
        right="2"
      />
    </Box>
  );

  return toggle;
};

export default MealIngredient;
