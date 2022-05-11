import { AddIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import dataContext from "../../../context/dataContext";
import CreateMealIngredientLine from "./createMealIngredientLine";

const CreateMealIngredientForm = (props) => {
  const { meal } = props;
  const [ingredients, setIngredients] = useState([]);
  const [counter, setCounter] = useState(0);
  const [newLines, setNewLines] = useState([]);

  const context = useContext(dataContext);

  const units = [
    [" x ", "Items"],
    ["g", "Grams"],
    ["kg", "Kilograms"],
    ["ml", "Millilitres"],
    ["l", "Litres"],
  ];

  useEffect(() => {
    async function getIngredients() {
      const {
        data: { ingredients = [] },
      } = context;
      setIngredients(ingredients);
      // console.log("Side Effect: Ingredients Set");
    }
    getIngredients();
  }, [context]);

  const handleAddAnother = () => {
    const newLinesCopy = [...newLines];
    newLinesCopy.push({ id: counter + 1 });
    setCounter((currentState) => currentState + 1);
    setNewLines(newLinesCopy);
  };

  const removeLine = (line_id) => {
    const newLinesCopy = [...newLines];
    const withoutLine = newLinesCopy.filter((line) => line.id !== line_id);
    setNewLines(withoutLine);
  };

  return (
    <Fragment>
      <Flex direction={{ base: "column" }} gap={3}>
        <IconButton
          aria-label="Delete Meal"
          icon={<AddIcon />}
          onClick={handleAddAnother}
        />

        {newLines.map((line) => (
          <CreateMealIngredientLine
            key={line.id}
            line_id={line.id}
            units={units}
            ingredients={ingredients}
            meal={meal}
            removeLine={removeLine}
          />
        ))}
      </Flex>
    </Fragment>
  );
};

export default CreateMealIngredientForm;
