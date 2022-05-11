import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Input,
  Spacer,
} from "@chakra-ui/react";
import _ from "lodash";
import { Fragment, useContext, useState } from "react";
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
      <HStack>
        <Input
          size="sm"
          width="xs"
          name={plan.name}
          id={plan.id}
          defaultValue={plan.name}
          onChange={handleChange}
        />
        <Button size="sm" onClick={handleSave}>
          Save
        </Button>
        <Button size="sm" px={5} onClick={handleCancel}>
          Cancel
        </Button>
      </HStack>
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
      <HStack>
        <Box width="xl" p={0}>
          {planName}
          <Divider my={4} />
        </Box>

        <Box my={4} p={4}>
          <HStack>
            <Button onClick={handleReorder}>Reorder Days</Button>
            <Spacer />
            <Button onClick={handleDelete}>X</Button>
          </HStack>
        </Box>
      </HStack>

      <StartDay day={plan.start_day} plan={plan} />

      <ul>
        {plan.day_set.map((day) => (
          <PlanDay key={day.id} plan={plan} day={day} />
        ))}
        <CreatePlanDayForm plan={plan} />
      </ul>

      <Box>
        <HStack>
          <Link to={`/plan/${plan.id}/shopping-list`}>
            <Button>Shopping List</Button>
          </Link>
          <Link to={`/plan/${plan.id}/schedule`}>
            <Button>Schedule</Button>
          </Link>
          <Link to={`/plan/${plan.id}/recipes`}>
            <Button>Recipes</Button>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
}

export default Plan;
