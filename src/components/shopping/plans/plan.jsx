import {
  CalendarIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Input,
} from "@chakra-ui/react";
import _ from "lodash";
import { Fragment, useContext, useState } from "react";
import { AiOutlineClockCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import dataContext from "./../../../context/dataContext";
import http from "./../../../services/httpService";
import CreatePlanDayForm from "./createNewPlanDayForm";
import PlanDay from "./planDay";
import StartDay from "./startDay";

function Plan(props) {
  const { plan } = props;

  const context = useContext(dataContext);

  const {
    data: { plans },
    setData,
  } = context;

  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(plan.name);
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
      const newPlans = [...plans];
      const item = plans.filter((_plan) => _plan.id === plan.id)[0];
      const index = plans.indexOf(item);

      newPlans[index]["name"] = newName;

      setData("plans", newPlans);

      setName(newName);
      doSave(plan.id, newPlans[index]);
    }

    setEditable(false);
  };

  const doSave = async (id, item) => {
    const payload = { name: item.name };

    const endpoint = http.plansEP;
    await toast.promise(http.patch(`${endpoint}${id}/`, payload), {
      pending: `Updating ${item.name} on server...`,
      success: `Updated ${item.name} on server! :)`,
      error: `Couldn't update ${item.name} on server! :(`,
    });
  };

  const handleDelete = () => {
    const deleteMe = window.confirm(`Really delete Plan: "${name}" ?`);

    if (deleteMe) {
      const newPlans = plans.filter((_plan) => _plan.id !== plan.id);

      setData("plans", newPlans);
      doDelete();
    }
  };

  const doDelete = async () => {
    const endpoint = http.plansEP;
    await toast.promise(http.delete(`${endpoint}${plan.id}/`), {
      pending: `Deleting ${name} from server...`,
      success: `Deleted ${name} from server! :)`,
      error: `Couldn't deleted ${name} from server! :(`,
    });
  };

  const sortArray = (array) => {
    return _.orderBy(array, ["order", "id"], ["asc"]);
  };

  const handleReorder = () => {
    const newPlans = [...plans];

    const myPlan = newPlans.filter((_plan) => (_plan.id = plan.id))[0];

    const sortedDaySet = sortArray(myPlan["day_set"]);

    myPlan["day_set"] = sortedDaySet;

    setData("plans", newPlans);
  };

  const planName = editable ? (
    <Fragment>
      <Flex direction={{ base: "column", sm: "row" }} gap={2}>
        <Input
          size="sm"
          name={plan.name}
          id={plan.id}
          defaultValue={plan.name}
          onChange={handleChange}
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
          aria-label="Delete"
          icon={<DeleteIcon />}
          size="sm"
          onClick={handleDelete}
        />
      </Flex>
    </Fragment>
  ) : (
    <Fragment>
      <strong className="clickable" onClick={handleClick}>
        {plan.name} <Icon as={EditIcon} ml={2} w={3} h={3} />
      </strong>
    </Fragment>
  );

  return (
    <Box borderWidth="1px" borderRadius="lg" my={4} p={4} position="relative">
      <Flex>
        <Box width="xl" p={0}>
          {planName}
          <Divider my={4} />
        </Box>
      </Flex>

      <StartDay day={plan.start_day} plan={plan} />

      <ul>
        {plan.day_set.map((day) => (
          <PlanDay key={day.id} plan={plan} day={day} />
        ))}
        <Button leftIcon={<RepeatIcon />} onClick={handleReorder} w="100%">
          Reorder Days
        </Button>
        <CreatePlanDayForm plan={plan} />{" "}
      </ul>

      <Box>
        <Flex direction={{ base: "column", sm: "row" }} gap={2}>
          <Link to={`/plan/${plan.id}/shopping-list`}>
            <Button leftIcon={<AiOutlineShoppingCart />} w="100%">
              Shopping Lists
            </Button>
          </Link>
          <Link to={`/plan/${plan.id}/schedule`}>
            <Button leftIcon={<AiOutlineClockCircle />} w="100%">
              Schedule
            </Button>
          </Link>
          <Link to={`/plan/${plan.id}/recipes`}>
            <Button leftIcon={<CalendarIcon />} w="100%" flexGrow={2}>
              Recipes
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}

export default Plan;
