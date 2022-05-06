import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "./../../../context/dataContext";
import http from "./../../../services/httpService";
const CreatePlanDayLine = (props) => {
  const { line_id, removeLine, plan } = props;

  const context = useContext(dataContext);

  const [meals, setMeals] = useState([]);

  const [order, setOrder] = useState(0);
  const [meal, setMeal] = useState();

  useEffect(() => {
    async function getMeals() {
      const {
        data: { meals = [] },
      } = context;
      setMeals(meals);
    }
    getMeals();
  }, [context]);

  const handleChangeOrder = (event) => {
    setOrder(parseInt(event.target.value));
  };

  const handleChangeMeal = (event) => {
    setMeal(parseInt(event.target.value));
  };
  const validateSave = order > 0 ? true : false;

  const handleSave = async () => {
    if (validateSave) {
      const {
        data: { plans },
        setData,
      } = context;

      // Set Locally
      const newPlans = [...plans];
      const myPlan = newPlans.filter((_plan) => _plan.id === plan.id)[0];

      const newDay = {
        id: 0,
        order,
        meal,
      };

      myPlan["day_set"].push(newDay);

      const index = myPlan["day_set"].indexOf(newDay);

      removeLine(line_id);

      const newId = await doSave(newDay);
      myPlan["day_set"][index]["id"] = newId;

      setData("plans", newPlans);
    }
  };

  const doSave = async (payload) => {
    delete payload["id"];
    const result = await toast.promise(
      http.post(`${http.plansEP}${plan.id}/days/`, payload),
      {
        pending: `Creating Day for Plan: ${plan.name} on server`,
        success: `Created Day for Plan: ${plan.name} on server!`,
        error: `Couldn't create Day for Plan: ${plan.name} on server :(`,
      }
    );
    return result.data["id"];
  };

  return (
    <li key={line_id} className="day_set">
      Day:
      <input
        type="number"
        defaultValue={order}
        min="1"
        onChange={(event) => handleChangeOrder(event)}
      />
      <select
        name={`${line_id}-select-meal`}
        id={`${line_id}-select-meal`}
        onClick={handleChangeMeal}
        defaultValue="header"
      >
        <option value="header" disabled hidden>
          Choose Meal...
        </option>
        {meals.map((meals) => (
          <option key={meals.id} value={meals.id}>
            {meals.name}
          </option>
        ))}
      </select>
      <button disabled={!validateSave} onClick={handleSave}>
        Save
      </button>
      <button onClick={() => removeLine(line_id)}>Cancel</button>
    </li>
  );
};

export default CreatePlanDayLine;
