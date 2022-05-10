import React from "react";
import { Link } from "react-router-dom";

function PlanLinks(props) {
  const { plan } = props;
  return (
    <div>
      <h3>Plan: {plan.name}</h3>
      <p>
        Lasts <strong>{plan.day_set.length}</strong> days
      </p>
      <Link to={`/plan/${plan.id}/shopping-list`}>Shopping List</Link>
      {" | "}
      <Link to={`/plan/${plan.id}/schedule`}>Schedule</Link>
      {" | "}
      <Link to={`/plan/${plan.id}/recipes`}>Recipes</Link>
    </div>
  );
}

export default PlanLinks;
