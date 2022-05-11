import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "../../../context/dataContext";
import http from "../../../services/httpService";
import MealIngredients from "./mealIngredients";

const Meal = (props) => {
  const { meal } = props;

  const context = useContext(dataContext);

  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(meal.name);
  const [newName, setNewName] = useState(name);

  const handleChange = ({ currentTarget: input }) => {
    setNewName(input.value);
  };

  const handleClick = () => {
    if (editable) {
      setEditable(false);
    } else {
      setEditable(true);
    }
  };

  const handleCancel = () => {
    setNewName(name);
    setEditable(false);
  };

  const handleSave = () => {
    if (name !== newName) {
      const {
        data: { meals },
        setData,
      } = context;

      const newMeals = [...meals];
      const item = meals.filter((_meal) => _meal.id === meal.id)[0];
      const index = meals.indexOf(item);

      newMeals[index]["name"] = newName;

      setData("meals", newMeals);

      setName(newName);
      doSave(meal.id, newMeals[index]);
    }

    setEditable(false);
  };

  const doSave = async (id, item) => {
    const payload = { name: item.name };

    const endpoint = http.mealsEP;
    await toast.promise(http.patch(`${endpoint}${id}/`, payload), {
      pending: `Updating ${item.name} on server...`,
      success: `Updated ${item.name} on server! :)`,
      error: `Couldn't update ${item.name} on server! :(`,
    });
  };

  const handleDelete = () => {
    const deleteMe = window.confirm(`Really delete Meal: "${name}" ?`);

    if (deleteMe) {
      const {
        data: { meals },
        setData,
      } = context;

      const newMeals = meals.filter((_meal) => _meal.id !== meal.id);

      setData("meals", newMeals);
      doDelete();
    }
  };

  const doDelete = async () => {
    const endpoint = http.mealsEP;
    await toast.promise(http.delete(`${endpoint}${meal.id}/`), {
      pending: `Deleting ${name} from server...`,
      success: `Deleted ${name} from server! :)`,
      error: `Couldn't deleted ${name} from server! :(`,
    });
  };

  const mealName = editable ? (
    <Fragment>
      <Flex direction={{ base: "column", sm: "row" }} gap={2}>
        <Input
          size="sm"
          name={name}
          id={meal.id}
          defaultValue={name}
          onChange={(event) => handleChange(event)}
        />
        <IconButton
          colorScheme={"green"}
          aria-label="Save"
          icon={<CheckIcon />}
          size="sm"
          onClick={handleSave}
        />
        <IconButton
          aria-label="Cancel"
          icon={<CloseIcon />}
          size="sm"
          onClick={handleCancel}
        />
        <IconButton
          colorScheme={"red"}
          aria-label="Delete Meal"
          icon={<DeleteIcon />}
          size="sm"
          onClick={handleDelete}
        />
      </Flex>
    </Fragment>
  ) : (
    <Fragment>
      <strong className="clickable" onClick={handleClick}>
        {name} <Icon as={EditIcon} ml={2} w={3} h={3} />
      </strong>
    </Fragment>
  );

  return (
    <div className="meal">
      <Box my={4} borderWidth="1px" borderRadius="lg" p={4}>
        <Heading mb={4} as="h3" size="sm">
          {mealName} <Divider mt={4} />
        </Heading>

        <MealIngredients meal_ingredients={meal.meal_ingredients} meal={meal} />
      </Box>
    </div>
  );
};

export default Meal;
