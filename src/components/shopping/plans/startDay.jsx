import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";
import { en } from "../../../services/textService";
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
      pending: en.startDayPlans.promise.pending(plan.name),
      success: en.startDayPlans.promise.success(plan.name),
      error: en.startDayPlans.promise.error(plan.name),
    });
  };

  const handleChange = (event) => {
    setNewDay(event.target.value);
  };
  const bg = useColorModeValue("purple.500", "purple.500");
  const color = useColorModeValue("black", "white");

  const boxProps = { bg: bg, color: color, p: 4 };

  const toggleDay = editable ? (
    <Fragment>
      <Box {...boxProps}>
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap={3}
          justifyContent={"flex-start"}
        >
          <Text>
            <strong>{en.startDayPlans.startsOn}</strong>
          </Text>
          <Select
            size="sm"
            width={["100%", "70%"]}
            defaultValue={currentDay}
            onChange={(event) => handleChange(event)}
          >
            {days.daysArray.map((day) => (
              <option key={day} value={day[0]}>
                {day[1]}
              </option>
            ))}
          </Select>

          <IconButton
            colorScheme={"green"}
            aria-label={en.startDayPlans.ariaSave}
            icon={<CheckIcon />}
            size="sm"
            onClick={handleSave}
          />
          <IconButton
            aria-label={en.startDayPlans.ariaCancel}
            icon={<CloseIcon />}
            size="sm"
            onClick={handleCancel}
          />
        </Flex>
      </Box>
    </Fragment>
  ) : (
    <Fragment>
      <Box
        className="clickable"
        position="relative"
        onClick={handleClick}
        {...boxProps}
      >
        <Text>
          <strong>{en.startDayPlans.startsOn}</strong>
          {days.longDay(currentDay)}
        </Text>{" "}
        <Icon as={EditIcon} w={3} h={3} position="absolute" top="2" right="2" />
      </Box>
    </Fragment>
  );

  return <Fragment>{toggleDay}</Fragment>;
}

export default StartDay;
