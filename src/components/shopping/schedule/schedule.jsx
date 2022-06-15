import {
  Box,
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dataContext from "../../../context/dataContext";
import { en } from "../../../services/textService";
import days from "../../../snippets/days";
import { mealFromID } from "../../../snippets/meals";
import { setTitle } from "./../../../snippets/setTitle";
import PlanLinks from "./../../planLinks";

function Schedule() {
  const urlParams = useParams();
  const plan_id = parseInt(urlParams["plan_id"]);
  const navigate = useNavigate();

  if (!plan_id) {
    navigate("not-found");
  }

  const [plans, setPlans] = useState([]);
  const [meals, setMeals] = useState([]);
  const [plan, setPlan] = useState({ id: null, name: null, day_set: [] });

  const context = useContext(dataContext);

  useEffect(() => {
    setTitle(`Schedule for ${plan.name}`);
  }, [plan]);

  useEffect(() => {
    async function getPlans() {
      const {
        data: { plans = [] },
      } = context;
      setPlans(plans);
    }
    getPlans();
  }, [context]);

  useEffect(() => {
    async function getMeals() {
      const {
        data: { meals = [] },
      } = context;
      setMeals(meals);
    }
    getMeals();
  }, [context]);

  useEffect(() => {
    function getPlan() {
      const myPlan = plans.filter((_plan) => _plan.id === plan_id)[0];
      if (myPlan) {
        setPlan(myPlan);
      }
    }
    getPlan();
  }, [plans, plan_id]);

  return (
    <Fragment>
      <Heading as="h6" mt={5}>
        {en.schedule.scheduleFor} {plan.name}
      </Heading>
      <Divider my={5} />
      <PlanLinks plan={plan} />

      <Box borderWidth="1px" p={5} my={5}>
        {en.schedule.blurb(plan, days.longDay(plan.start_day))}
      </Box>
      <Box borderWidth="1px" p={0} pt={3}>
        <TableContainer>
          <Table variant="striped" size="sm" m={0}>
            <Thead>
              <Tr>
                <Th scope="col">{en.plans.day}</Th>
                <Th scope="col">{en.meals.titleSingular}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {plan.day_set.map((day) => (
                <Tr
                  key={day.id}
                  className={days.isWeekend(
                    days.getDay(day.order, plan.start_day)
                  )}
                >
                  <Td>{days.getDay(day.order, plan.start_day)} </Td>
                  <Td>{mealFromID(day.meal, meals)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Fragment>
  );
}

export default Schedule;
