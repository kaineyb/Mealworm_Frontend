import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
} from "@chakra-ui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "./../../../context/dataContext";
import http from "./../../../services/httpService";
function PlanDay(props) {
  const { plan, day } = props;
  const [meal, setMeal] = useState(props.day.meal);
  const [meals, setMeals] = useState([]);

  const [newOrder, setNewOrder] = useState(day.order);
  const [newMeal, setNewMeal] = useState(meal);
  const [editable, setEditable] = useState(false);

  const context = useContext(dataContext);

  const mealFromID = (id, object = false) => {
    const item = meals.filter((meal) => meal["id"] === id)[0];
    if (item && object) {
      return item;
    } else if (item) {
      return item.name;
    }
  };

  const mealName = mealFromID(day.meal);

  useEffect(() => {
    async function getMeals() {
      const {
        data: { meals = [] },
      } = context;
      setMeals(meals);
    }
    getMeals();
  }, [context]);

  const handleClick = () => {
    setEditable(true);
  };

  const handleCancel = () => {
    setNewOrder(day.order);
    setNewMeal(meal);
    setEditable(false);
  };

  const handleDelete = () => {
    const deleteMe = window.confirm(
      `Really Delete "Day ${day.order}: ${mealName}"?`
    );

    if (deleteMe) {
      const {
        data: { plans },
        setData,
      } = context;

      // Remove Locally
      const newPlans = [...plans];
      const myPlan = newPlans.filter((_plan) => _plan.id === plan.id)[0];
      const daySet = myPlan["day_set"];

      const newDaySet = daySet.filter((_day) => _day.id !== day.id);

      myPlan["day_set"] = newDaySet;

      setData("plans", newPlans);

      // Remove on Server
      doDelete();
    }
  };

  const doDelete = async () => {
    await toast.promise(
      http.delete(`${http.plansEP}${plan.id}/days/${day.id}/`),
      {
        pending: `Deleting Day for Plan: ${plan.name} on server`,
        success: `Deleting Day for Plan: ${plan.name} on server!`,
        error: `Couldn't delete Day for Plan: ${plan.name} on server :(`,
      }
    );
  };

  const handleOrderChange = (value) => {
    setNewOrder(value);
  };
  const handleMealChange = (event) => {
    setNewMeal(parseInt(event.target.value));
  };

  const validateSave = newOrder > 0 ? true : false;

  const handleSave = () => {
    if (newMeal === meal && newOrder === day.order) {
      setEditable(false);
      return;
    }

    const {
      data: { plans },
      setData,
    } = context;

    // Set Locally
    const newPlans = [...plans];
    const myPlan = newPlans.filter((_plan) => _plan.id === plan.id)[0];
    const daySet = myPlan["day_set"];

    const myDay = daySet.filter((_day) => _day.id === day.id)[0];

    myDay["meal"] = newMeal;
    myDay["order"] = newOrder;

    setMeal(newMeal);

    setData("plans", newPlans);

    setEditable(false);

    // Set on Server

    doSave();
  };

  const doSave = async () => {
    const payload = { order: newOrder, meal: newMeal };

    await toast.promise(
      http.patch(`${http.plansEP}${plan.id}/days/${day.id}/`, payload),
      {
        pending: `Updating Day for Plan: ${plan.name} on server`,
        success: `Updated Day for Plan: ${plan.name} on server!`,
        error: `Couldn't update Day for Plan: ${plan.name} on server :(`,
      }
    );
  };

  const toggle = editable ? (
    <Fragment>
      <Box
        key={day.id}
        position="relative"
        bg="orange.900"
        className="clickable"
        borderWidth="1px"
        borderRadius="lg"
        my={4}
        p={4}
      >
        <HStack>
          <Text>Day:</Text>
          <NumberInput
            size="sm"
            width="6rem"
            min="1"
            defaultValue={day.order}
            onChange={(value) => handleOrderChange(value)}
          >
            <NumberInputField id="amount" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            size="sm"
            width="sm"
            name={`${day.id}-select-meal`}
            id={`${day.id}-select-meal`}
            defaultValue={meal}
            onChange={handleMealChange}
          >
            <option value="header" disabled hidden>
              Choose Meal...
            </option>
            {meals.map((meals) => (
              <option key={meals.id} value={meals.id}>
                {meals.name}
              </option>
            ))}
          </Select>
          <Button
            size="sm"
            px={5}
            onClick={handleSave}
            disabled={!validateSave}
          >
            Save
          </Button>
          <Button size="sm" px={5} onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="sm" px={5} onClick={handleDelete}>
            Delete
          </Button>
        </HStack>
      </Box>
    </Fragment>
  ) : (
    <Box
      position="relative"
      bg="orange.900"
      key={day.id}
      className="clickable"
      onClick={handleClick}
      borderWidth="1px"
      borderRadius="lg"
      my={4}
      p={4}
    >
      Day: {day.order} - {mealName}{" "}
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
}

export default PlanDay;
