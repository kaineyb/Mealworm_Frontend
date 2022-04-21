import { React, Fragment, useState } from "react";

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
      <form>
        <input
          type="text"
          value={value}
          onChange={handleChangeInput}
          placeholder={placeHolder}
        />
        <select
          value={selection}
          name="create-ingredient-select"
          id="create-ingredient-select"
          onChange={handleChangeSelect}
        >
          <option value="0">----</option>
          {selectOptions.map((selection) => (
            <option key={selection.id} value={selection.id}>
              {selection.name}
            </option>
          ))}
        </select>
        <button type="submit" onClick={(event) => handleOnClick(event, value)}>
          {buttonLabel}
        </button>
      </form>
    </Fragment>
  );
};

export default CreateIngredientForm;
