import { Fragment, useState } from "react";
import CreatePlanDayLine from "./createNewPlanDayLine";

const CreatePlanDayForm = (props) => {
  const { plan } = props;
  const [counter, setCounter] = useState(0);
  const [lines, setLines] = useState([]);

  const handleAddDay = () => {
    const newLines = [...lines];
    newLines.push({ id: counter + 1 });
    setCounter((currentState) => currentState + 1);
    setLines(newLines);
  };

  const handleRemoveDay = (line_id) => {
    const newLines = [...lines];
    const withoutLine = newLines.filter((line) => line.id !== line_id);
    setLines(withoutLine);
  };

  return (
    <Fragment>
      <button onClick={handleAddDay}>Add Day</button>
      {lines.map((line) => (
        <CreatePlanDayLine
          key={line.id}
          line_id={line.id}
          removeLine={handleRemoveDay}
          plan={plan}
        />
      ))}
    </Fragment>
  );
};

export default CreatePlanDayForm;
