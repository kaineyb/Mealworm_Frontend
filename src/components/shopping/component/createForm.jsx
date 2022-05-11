import { Button, FormControl, HStack, Input } from "@chakra-ui/react";
import { Fragment, React, useState } from "react";

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
        <FormControl>
          <HStack>
            {" "}
            <Input
              size={"sm"}
              width={"md"}
              type="text"
              mr={3}
              value={value}
              onChange={handleChange}
              placeholder={placeHolder}
            />
            <Button
              type="submit"
              onClick={(event) => handleOnClick(event, value)}
              size={"sm"}
            >
              {buttonLabel}
            </Button>
          </HStack>
        </FormControl>
      </form>
    </Fragment>
  );
};

export default CreateForm;
