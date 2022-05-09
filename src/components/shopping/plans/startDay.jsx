import { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";
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
      pending: `Updating Start Day for Plan: ${plan.name} on server`,
      success: `Updated Start Day for Plan: ${plan.name} on server!`,
      error: `Couldn't update Start Day for Plan: ${plan.name} on server :(`,
    });
  };

  const handleChange = (event) => {
    setNewDay(event.target.value);
  };

  const toggleDay = editable ? (
    <Fragment>
      <select
        defaultValue={currentDay}
        onChange={(event) => handleChange(event)}
      >
        {days.daysArray.map((day) => (
          <option key={day} value={day[0]}>
            {day[1]}
          </option>
        ))}
      </select>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </Fragment>
  ) : (
    <Fragment>
      <span className="clickable" onClick={handleClick}>
        {days.longDay(currentDay)}
      </span>
    </Fragment>
  );

  return (
    <Fragment>
      <strong>Starts On: </strong>
      {toggleDay}
    </Fragment>
  );
}

export default StartDay;
