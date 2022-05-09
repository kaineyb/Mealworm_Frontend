import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "../../../context/dataContext";
import http from "./../../../services/httpService";
import CreateForm from "./../component/createForm";
import Plan from "./plan";

function Plans(props) {
  const [plans, setPlans] = useState([]);
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

  const handleCreate = (value) => {
    const newPlan = { id: 999, start_day: "Mon", day_set: [], name: value };
    const newPlans = [...plans, newPlan];

    const index = newPlans.indexOf(newPlan);

    context.setData("plans", newPlans);

    doCreate(newPlan, index);
  };

  const doCreate = async (plan, index) => {
    delete plan["id"];

    const result = await toast.promise(http.post(http.plansEP, plan), {
      pending: `Creating Plan: ${plan.name} on server`,
      success: `Created Plan: ${plan.name} on server!`,
      error: `Couldn't create Plan: ${plan.name} on server :(`,
    });

    plan["id"] = result.data["id"];
    const newPlans = [...plans];
    newPlans[index] = plan;
    context.setData("plans", newPlans);
  };

  return (
    <div>
      <h2>Plans</h2>
      <CreateForm
        doCreate={handleCreate}
        placeHolder={"New Plan name..."}
        buttonLabel={"Create new Plan"}
      />
      <ul>
        {plans.map((plan) => (
          <Plan key={plan.id} plan={plan} />
        ))}
      </ul>
    </div>
  );
}

export default Plans;