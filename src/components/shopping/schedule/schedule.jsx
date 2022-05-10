import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dataContext from "../../../context/dataContext";
import days from "../../../snippets/days";
import mealFromID from "../../../snippets/meals";
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
      <PlanLinks plan={plan} />
      <h3>Schedule</h3>
      <hr />
      <p>
        {" "}
        Starts on a <strong>{days.longDay(plan.start_day)}</strong> and lasts{" "}
        <strong>{plan.day_set.length}</strong> days
      </p>

      <table className="schedule-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Day</th>
            <th scope="col">Meal</th>
          </tr>
        </thead>
        <tbody>
          {plan.day_set.map((day) => (
            <tr
              key={day.id}
              className={days.isWeekend(days.getDay(day.order, plan.start_day))}
            >
              <th scope="row">{day.order}</th>
              <td>{days.getDay(day.order, plan.start_day)} </td>
              <td>{mealFromID(day.meal, meals)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Schedule;
