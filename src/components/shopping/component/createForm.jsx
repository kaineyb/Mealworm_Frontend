import { Button, Flex, FormControl, Input, Spacer } from "@chakra-ui/react";
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
          <Flex direction={{ base: "column", sm: "row" }} gap={1}>
            <Input
              size={"sm"}
              type="text"
              mr={3}
              value={value}
              onChange={handleChange}
              placeholder={placeHolder}
            />
            <Spacer />
            <Button
              px={5}
              type="submit"
              onClick={(event) => handleOnClick(event, value)}
              size={"sm"}
            >
              {buttonLabel}
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Fragment>
  );
};

export default CreateForm;
