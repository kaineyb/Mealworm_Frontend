import { Box, Divider, Heading } from "@chakra-ui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dataContext from "../../../context/dataContext";
import { en } from "../../../services/textService";
import PlanLinks from "./../../planLinks";
import Recipe from "./recipe";

function Recipes(props) {
  const urlParams = useParams();
  const plan_id = parseInt(urlParams["plan_id"]);
  const navigate = useNavigate();

  if (!plan_id) {
    navigate("not-found");
  }
  const [plans, setPlans] = useState([]);
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [plan, setPlan] = useState({ id: null, name: null, day_set: [] });

  const context = useContext(dataContext);

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
    async function getIngredients() {
      const {
        data: { ingredients = [] },
      } = context;
      setIngredients(ingredients);
    }
    getIngredients();
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
      <Box>
        <Heading as="h6" mt={5}>
          {en.recipes.recipesFor} {plan.name}
        </Heading>
        <Divider my={5} />
        <PlanLinks plan={plan} />

        {plan.day_set.map((day) => (
          <Recipe
            key={day.id}
            day={day}
            meals={meals}
            plan={plan}
            ingredients={ingredients}
          />
        ))}
      </Box>
    </Fragment>
  );
}

export default Recipes;
