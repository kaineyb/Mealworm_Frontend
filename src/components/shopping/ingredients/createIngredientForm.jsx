import { Button, FormControl, HStack, Input, Select } from "@chakra-ui/react";
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
        <HStack>
          <Input
            type="text"
            value={value}
            onChange={handleChangeInput}
            placeholder={placeHolder}
            width="sm"
            size="sm"
          />
          <Select
            value={selection}
            name="create-ingredient-select"
            id="create-ingredient-select"
            width="sm"
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
            type="submit"
            onClick={(event) => handleOnClick(event, value)}
            width="sm"
            size="sm"
          >
            {buttonLabel}
          </Button>
        </HStack>
      </FormControl>
    </Fragment>
  );
};

export default CreateIngredientForm;
