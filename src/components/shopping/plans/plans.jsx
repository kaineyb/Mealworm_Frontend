import React, { useContext, useEffect, useState } from "react";
import dataContext from "../../../context/dataContext";
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

  const handleCreate = () => {};

  const doCreate = async () => {};

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
          <Plan plan={plan} />
        ))}
      </ul>
    </div>
  );
}

export default Plans;
