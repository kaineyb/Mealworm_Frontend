import { Button, Divider } from "@chakra-ui/react";
import _ from "lodash";
import { Fragment, useState } from "react";
import CreatePlanDayLine from "./createNewPlanDayLine";

const CreatePlanDayForm = (props) => {
  const { plan } = props;
  const [counter, setCounter] = useState(0);
  const [lines, setLines] = useState([]);

  const handleAddDay = () => {
    const newLines = [...lines];
    newLines.push({ id: counter + 1, defaultDay: nextDay() });
    setCounter((currentState) => currentState + 1);
    setLines(newLines);
  };

  const handleRemoveDay = (line_id) => {
    const newLines = [...lines];
    const withoutLine = newLines.filter((line) => line.id !== line_id);
    setLines(withoutLine);
  };

  const nextDay = () => {
    const daySet = [...plan["day_set"]];

    const lastLine = lines[lines.length - 1];

    if (daySet.length === 0) {
      if (!lastLine) {
        return lines.length + 1;
      } else {
        return lastLine["defaultDay"] + 1;
      }
    } else {
      const highestOrder = _.orderBy(daySet, ["order", "id"], ["desc"])[0][
        "order"
      ];

      return highestOrder + lines.length + 1;
    }
  };

  return (
    <Fragment>
      <Divider my={4} />
      <Button onClick={handleAddDay}>Add Day</Button>
      <Divider my={4} />
      {lines.map((line) => (
        <CreatePlanDayLine
          key={line.id}
          line_id={line.id}
          removeLine={handleRemoveDay}
          plan={plan}
          defaultDay={line.defaultDay}
        />
      ))}
    </Fragment>
  );
};

export default CreatePlanDayForm;
