import React, { useState, useEffect, Fragment } from "react";
import http from "../../services/httpService";
import UserContext from "../../context/userContext";

function Plans(props) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function getPlans() {
      const result = await http.get("/shopping/plans/");
      setPlans(result.data);
    }
    getPlans();
  }, []);

  const renderPlans = () => {
    return plans.map((plan) => (
      <li key={plan.id}>
        {plan.id} - <strong>{plan.name}</strong> - {plan.start_day}
        <ul>
          {plan.plan_days.map((day) => (
            <li key={day.id}>
              Order: {day.order} - {day.meal}
            </li>
          ))}
        </ul>
      </li>
    ));
  };

  return (
    <div>
      <h2>Plans</h2>
      <ul>{renderPlans()}</ul>
    </div>
  );
}

export default Plans;
