import { Divider, Heading } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dataContext from "../../../context/dataContext";
import PlanLinks from "./../../planLinks";
import ShoppingListTable from "./shoppingListTable";

function ShoppingList(props) {
  const urlParams = useParams();
  const plan_id = parseInt(urlParams["plan_id"]);
  const navigate = useNavigate();

  if (!plan_id) {
    navigate("not-found");
  }

  const [plans, setPlans] = useState([]);
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [sections, setSections] = useState([]);
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
    async function getSections() {
      const {
        data: { sections = [] },
      } = context;
      setSections(sections);
    }
    getSections();
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
    <div>
      <Heading as="h6" mt={5}>
        Shopping List
      </Heading>
      <Divider my={5} />
      <PlanLinks plan={plan} />
      <ShoppingListTable
        plan={plan}
        meals={meals}
        ingredients={ingredients}
        sections={sections}
      />
    </div>
  );
}

export default ShoppingList;
