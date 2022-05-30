import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Icon, IconButton, Input } from "@chakra-ui/react";
import { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "../../../context/dataContext";
import http from "../../../services/httpService";
import { en } from "../../../services/textService";
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
      pending: en.meals.patchPromise.pending(item.name),
      success: en.meals.patchPromise.success(item.name),
      error: en.meals.patchPromise.error(item.name),
    });
  };

  const handleDelete = () => {
    const deleteMe = window.confirm(en.meals.delete.confirm(name));

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
      pending: en.meals.delete.promise.pending(name),
      success: en.meals.delete.promise.success(name),
      error: en.meals.delete.promise.error(name),
    });
  };

  const headerProps = {
    mb: 0,
    as: "h3",
    size: "sm",
    variant: "sectionHeader",
    position: "relative",
  };

  const mealName = editable ? (
    <Heading {...headerProps}>
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
          aria-label={en.meals.ariaSave}
          icon={<CheckIcon />}
          size="sm"
          onClick={handleSave}
        />
        <IconButton
          aria-label={en.meals.ariaCancel}
          icon={<CloseIcon />}
          size="sm"
          onClick={handleCancel}
        />
        <IconButton
          colorScheme={"red"}
          aria-label={en.meals.ariaDelete}
          icon={<DeleteIcon />}
          size="sm"
          onClick={handleDelete}
        />
      </Flex>
    </Heading>
  ) : (
    <Heading {...headerProps} className="clickable" onClick={handleClick}>
      <strong>
        {name}{" "}
        <Icon
          as={EditIcon}
          ml={2}
          w={3}
          h={3}
          position="absolute"
          top={2}
          right={2}
        />
      </strong>
    </Heading>
  );

  return (
    <Fragment>
      {mealName}
      <Box mb={4} borderWidth="1px" borderTopWidth={0} p={4}>
        <MealIngredients meal_ingredients={meal.meal_ingredients} meal={meal} />
      </Box>
    </Fragment>
  );
};

export default Meal;
