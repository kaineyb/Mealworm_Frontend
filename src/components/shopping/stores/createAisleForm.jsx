import { AddIcon } from "@chakra-ui/icons";
import { Button, Divider } from "@chakra-ui/react";
import { Fragment, useState } from "react";
import CreateAisleLine from "./createAisleLine";

const CreateAisleForm = (props) => {
  const { section } = props;
  const [counter, setCounter] = useState(0);
  const [lines, setLines] = useState([]);

  const handleAddAisle = () => {
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
      <Divider my={4} />
      <Button leftIcon={<AddIcon />} onClick={handleAddAisle} w="100%">
        Add Aisle
      </Button>
      <Divider my={4} />
      {lines.map((line) => (
        <CreateAisleLine
          key={line.id}
          line_id={line.id}
          removeLine={handleRemoveDay}
          section={section}
        />
      ))}
    </Fragment>
  );
};

export default CreateAisleForm;
