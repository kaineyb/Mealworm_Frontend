import { FormLabel, Input as ChakraInput } from "@chakra-ui/react";
import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <React.Fragment>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ChakraInput {...rest} name={name} id={name} />
      {error && <div>{error}</div>}
    </React.Fragment>
  );
};

export default Input;
