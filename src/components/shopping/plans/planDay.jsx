import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { en } from "../../../services/textService";
import dataContext from "./../../../context/dataContext";
import http from "./../../../services/httpService";

function PlanDay(props) {
  const { plan, day } = props;
  const [meal, setMeal] = useState(props.day.meal);
  const [meals, setMeals] = useState([]);

  const [newOrder, setNewOrder] = useState(day.order);
  const [newMeal, setNewMeal] = useState(meal);
  const [editable, setEditable] = useState(false);

  const bg = useColorModeValue("gray.100", "whiteAlpha.200");
  const color = useColorModeValue("black", "white");

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
      en.planDays.delete.confirm(day.order, mealName)
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
        pending: en.planDays.delete.promise.pending(plan.name),
        success: en.planDays.delete.promise.success(plan.name),
        error: en.planDays.delete.promise.error(plan.name),
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
        pending: en.planDays.patchPromise.pending(plan.name),
        success: en.planDays.patchPromise.success(plan.name),
        error: en.planDays.patchPromise.error(plan.name),
      }
    );
  };

  const boxProps = {
    bg: bg,
    color: color,
    mb: 4,
    p: 4,
  };

  const toggle = editable ? (
    <Fragment>
      <Box key={day.id} {...boxProps}>
        <Flex direction={{ base: "column", sm: "row" }} gap={2}>
          <Text>{en.planDays.day}</Text>
          <NumberInput
            size="sm"
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
            name={`${day.id}-select-meal`}
            id={`${day.id}-select-meal`}
            defaultValue={meal}
            onChange={handleMealChange}
          >
            <option value="header" disabled>
              {en.planDays.chooseMeal}
            </option>
            {meals.map((meals) => (
              <option key={meals.id} value={meals.id}>
                {meals.name}
              </option>
            ))}
          </Select>

          <IconButton
            colorScheme={"green"}
            aria-label={en.planDays.ariaSave}
            icon={<CheckIcon />}
            size="sm"
            onClick={handleSave}
            disabled={!validateSave}
          />
          <IconButton
            aria-label={en.planDays.ariaCancel}
            icon={<CloseIcon />}
            size="sm"
            onClick={handleCancel}
          />
          <IconButton
            colorScheme={"red"}
            aria-label={en.planDays.ariaDelete}
            icon={<DeleteIcon />}
            size="sm"
            onClick={handleDelete}
          />
        </Flex>
      </Box>
    </Fragment>
  ) : (
    <Box
      key={day.id}
      position="relative"
      className="clickable"
      onClick={handleClick}
      {...boxProps}
    >
      {en.planDays.day} {day.order} - {mealName}{" "}
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
