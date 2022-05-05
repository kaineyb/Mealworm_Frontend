import { useContext, useEffect, useState } from "react";
import dataContext from "./../../../context/dataContext";
function Plan(props) {
  const { plan } = props;

  const [meals, setMeals] = useState([]);

  const context = useContext(dataContext);

  useEffect(() => {
    async function getMeals() {
      const {
        data: { meals = [] },
      } = context;
      setMeals(meals);
    }
    getMeals();
  }, [context]);

  const mealFromID = (id, object = false) => {
    const item = meals.filter((meal) => meal["id"] === id)[0];
    if (item && object) {
      return item;
    } else if (item) {
      return item.name;
    }
  };

  const longDay = (day) => {
    switch (day) {
      case "Mon":
        return "Monday";
      case "Tue":
        return "Tuesday";
      case "Wed":
        return "Wednesday";
      case "Thu":
        return "Thursday";
      case "Fri":
        return "Friday";
      case "Sat":
        return "Saturday";
      case "Sun":
        return "Sunday";
    }
    return "Day Not Found";
  };

  return (
    <li key={plan.id}>
      <div class="plan">
        <strong>{plan.name}</strong>
        <div class="plan-details">
          <strong>Starts On:</strong> {longDay(plan.start_day)}
          <br />
          <strong>Plan ID:</strong> {plan.id}
        </div>

        <ul>
          {plan.day_set.map((day) => (
            <li key={day.id} class="day_set">
              Day: {day.order} - {mealFromID(day.meal)}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default Plan;
