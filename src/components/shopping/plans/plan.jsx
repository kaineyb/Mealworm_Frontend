import _ from "lodash";
import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import dataContext from "./../../../context/dataContext";
import http from "./../../../services/httpService";
import CreatePlanDayForm from "./createNewPlanDayForm";
import PlanDay from "./planDay";
import StartDay from "./startDay";

function Plan(props) {
  const { plan } = props;

  const context = useContext(dataContext);

  const {
    data: { plans },
    setData,
  } = context;

  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(plan.name);
  const [newName, setNewName] = useState(name);

  const handleChange = ({ currentTarget: input }) => {
    setNewName(input.value);
  };

  const handleClick = () => {
    if (editable) {
      setEditable(false);
    } else {
      setEditable(true);
    }
  };

  const handleCancel = () => {
    setNewName(name);
    setEditable(false);
  };

  const handleSave = () => {
    if (name !== newName) {
      const newPlans = [...plans];
      const item = plans.filter((_plan) => _plan.id === plan.id)[0];
      const index = plans.indexOf(item);

      newPlans[index]["name"] = newName;

      setData("plans", newPlans);

      setName(newName);
      doSave(plan.id, newPlans[index]);
    }

    setEditable(false);
  };

  const doSave = async (id, item) => {
    const payload = { name: item.name };

    const endpoint = http.plansEP;
    await toast.promise(http.patch(`${endpoint}${id}/`, payload), {
      pending: `Updating ${item.name} on server...`,
      success: `Updated ${item.name} on server! :)`,
      error: `Couldn't update ${item.name} on server! :(`,
    });
  };

  const handleDelete = () => {
    const deleteMe = window.confirm(`Really delete Plan: "${name}" ?`);

    if (deleteMe) {
      const newPlans = plans.filter((_plan) => _plan.id !== plan.id);

      setData("plans", newPlans);
      doDelete();
    }
  };

  const doDelete = async () => {
    const endpoint = http.plansEP;
    await toast.promise(http.delete(`${endpoint}${plan.id}/`), {
      pending: `Deleting ${name} from server...`,
      success: `Deleted ${name} from server! :)`,
      error: `Couldn't deleted ${name} from server! :(`,
    });
  };

  const sortArray = (array) => {
    return _.orderBy(array, ["order", "id"], ["asc"]);
  };

  const handleReorder = () => {
    const newPlans = [...plans];

    const myPlan = newPlans.filter((_plan) => (_plan.id = plan.id))[0];

    const sortedDaySet = sortArray(myPlan["day_set"]);

    myPlan["day_set"] = sortedDaySet;

    setData("plans", newPlans);
  };

  const planName = editable ? (
    <Fragment>
      <input
        name={plan.name}
        id={plan.id}
        defaultValue={plan.name}
        onChange={handleChange}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </Fragment>
  ) : (
    <Fragment>
      <strong className="clickable" onClick={handleClick}>
        {plan.name}
      </strong>
    </Fragment>
  );

  return (
    <div className="plan">
      <div></div>
      {planName}

      <div className="plan_buttons">
        <button onClick={handleReorder}>Reorder</button>
        {" | "}
        <button onClick={handleDelete}>X</button>
      </div>

      <div className="plan-details">
        <StartDay day={plan.start_day} plan={plan} />
      </div>

      <ul>
        {plan.day_set.map((day) => (
          <PlanDay key={day.id} plan={plan} day={day} />
        ))}
        <CreatePlanDayForm plan={plan} />
      </ul>
      <Link to={`/shopping_plan/${plan.id}`}>Shopping List</Link>
    </div>
  );
}

export default Plan;
