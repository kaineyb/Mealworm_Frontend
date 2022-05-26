import { Divider, Heading } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "../../../context/dataContext";
import { en } from "../../../services/textService";
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
      pending: en.plans.postPromise.pending(plan.name),
      success: en.plans.postPromise.success(plan.name),
      error: en.plans.postPromise.error(plan.name),
    });

    plan["id"] = result.data["id"];
    const newPlans = [...plans];
    newPlans[index] = plan;
    context.setData("plans", newPlans);
  };

  return (
    <div>
      <Heading as="h1">{en.plans.titlePlural}</Heading>
      <Divider my={4} />
      <CreateForm
        doCreate={handleCreate}
        placeHolder={en.plans.newName}
        buttonLabel={en.plans.createNew}
      />
      <Divider my={4} />
      <div className="plans">
        {plans.map((plan) => (
          <Plan key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}

export default Plans;
