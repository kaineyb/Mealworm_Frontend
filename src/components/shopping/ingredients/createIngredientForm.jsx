import { Button, Flex, FormControl, Input, Select } from "@chakra-ui/react";
import { Fragment, React, useState } from "react";

const CreateIngredientForm = (props) => {
  const [value, setValue] = useState("");
  const [selection, setSelection] = useState(0);

  const { handleCreate, placeHolder, buttonLabel, selectOptions = [] } = props;

  const handleChangeInput = (event) => {
    setValue(event.target.value);
  };

  const handleChangeSelect = (event) => {
    setSelection(parseInt(event.target.value));
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    handleCreate(value, selection);
    setValue("");
    setSelection(0);
  };

  return (
    <Fragment>
      <FormControl>
        <Flex gap={3} direction={{ base: "column", sm: "row" }}>
          <Input
            type="text"
            value={value}
            onChange={handleChangeInput}
            placeholder={placeHolder}
            size="sm"
          />
          <Select
            value={selection}
            name="create-ingredient-select"
            id="create-ingredient-select"
            size="sm"
            onChange={handleChangeSelect}
          >
            <option value="0" disabled hidden>
              Choose Section...
            </option>
            {selectOptions.map((selection) => (
              <option key={selection.id} value={selection.id}>
                {selection.name}
              </option>
            ))}
          </Select>
          <Button
            width="100%"
            px={5}
            type="submit"
            onClick={(event) => handleOnClick(event, value)}
            size="sm"
          >
            {buttonLabel}
          </Button>
        </Flex>
      </FormControl>
    </Fragment>
  );
};

export default CreateIngredientForm;
