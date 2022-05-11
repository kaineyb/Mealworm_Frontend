import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Icon, Select, Text } from "@chakra-ui/react";
import { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";
// Snippets
import days from "../../../snippets/days";
import dataContext from "./../../../context/dataContext";
import http from "./../../../services/httpService";

function StartDay(props) {
  const { day, plan } = props;

  const [editable, setEditable] = useState(false);
  const [currentDay, setCurrentDay] = useState(day);
  const [newDay, setNewDay] = useState(day);

  const context = useContext(dataContext);

  const handleClick = () => {
    if (editable) {
      setEditable(false);
    } else {
      setEditable(true);
    }
  };

  const handleCancel = () => {
    setEditable(false);
    setNewDay(day);
  };

  const handleSave = () => {
    setEditable(false);
    setCurrentDay(newDay);

    const {
      data: { plans },
      setData,
    } = context;

    const newPlans = [...plans];
    const myPlan = newPlans.filter((_plan) => _plan.id === plan.id)[0];
    myPlan["start_day"] = newDay;
    setData("plans", newPlans);

    doSave({ start_day: newDay });
  };

  const doSave = async (payload) => {
    await toast.promise(http.patch(`${http.plansEP}${plan.id}/`, payload), {
      pending: `Updating Start Day for Plan: ${plan.name} on server`,
      success: `Updated Start Day for Plan: ${plan.name} on server!`,
      error: `Couldn't update Start Day for Plan: ${plan.name} on server :(`,
    });
  };

  const handleChange = (event) => {
    setNewDay(event.target.value);
  };

  const toggleDay = editable ? (
    <Fragment>
      <Box position="relative" borderWidth="1px" my={4} p={4} bg="gray.900">
        <HStack>
          <Text>
            <strong>Starts On: </strong>
          </Text>
          <Select
            size="sm"
            width="sm"
            defaultValue={currentDay}
            onChange={(event) => handleChange(event)}
          >
            {days.daysArray.map((day) => (
              <option key={day} value={day[0]}>
                {day[1]}
              </option>
            ))}
          </Select>
          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
          <Button size="sm" onClick={handleCancel}>
            Cancel
          </Button>
        </HStack>
      </Box>
    </Fragment>
  ) : (
    <Fragment>
      <Box
        bg="gray.900"
        className="clickable"
        onClick={handleClick}
        position="relative"
        borderWidth="1px"
        my={4}
        p={4}
      >
        <Text>
          <strong>Starts On: </strong>
          {days.longDay(currentDay)}
        </Text>{" "}
        <Icon as={EditIcon} w={3} h={3} position="absolute" top="2" right="2" />
      </Box>
    </Fragment>
  );

  return <Fragment>{toggleDay}</Fragment>;
}

export default StartDay;
