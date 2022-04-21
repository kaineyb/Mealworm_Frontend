import { React, Fragment, useState } from "react";

const CreateForm = (props) => {
  const [value, setValue] = useState("");

  const { doCreate, placeHolder, buttonLabel } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleOnClick = (event, value) => {
    event.preventDefault();
    doCreate(value);
    setValue("");
  };

  return (
    <Fragment>
      <form>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeHolder}
        />
        <button type="submit" onClick={(event) => handleOnClick(event, value)}>
          {buttonLabel}
        </button>
      </form>
    </Fragment>
  );
};

export default CreateForm;
