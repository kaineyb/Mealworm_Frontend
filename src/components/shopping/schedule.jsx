import { Fragment } from "react";
import days from "../../snippets/days";
import mealFromID from "../../snippets/meals";

function Schedule(props) {
  const { plan, meals } = props;

  return (
    <Fragment>
      <h3>Schedule: {plan.name}</h3>
      <h4> Starts on a {days.longDay(plan.start_day)}</h4>
      <p>Offset :{days.calculateOffset(plan.start_day)}</p>
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
