import { Button, Flex, Input, Select } from "@chakra-ui/react";
import { Fragment, React, useState } from "react";
import { en } from "../../../services/textService";

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

  const validate = value !== "" ? true : false;

  return (
    <Fragment>
      <form>
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
              {en.sections.choose}
            </option>
            {selectOptions.map((selection) => (
              <option key={selection.id} value={selection.id}>
                {selection.name}
              </option>
            ))}
          </Select>
          <Button
            disabled={!validate}
            width="100%"
            px={5}
            type="submit"
            onClick={(event) => handleOnClick(event, value)}
            size="sm"
          >
            {buttonLabel}
          </Button>
        </Flex>
      </form>
    </Fragment>
  );
};

export default CreateIngredientForm;
