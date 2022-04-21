import React, { useState, useEffect, useContext } from "react";
import DataContext from "../../context/dataContext";

function Plans(props) {
  const [plans, setPlans] = useState([]);
  const context = useContext(DataContext);

  useEffect(() => {
    async function getPlans() {
      const {
        data: { plans = [] },
      } = context;
      setPlans(plans);
    }
    getPlans();
  }, [context]);

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
