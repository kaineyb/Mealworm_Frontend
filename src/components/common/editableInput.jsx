import { Box, Button, Input } from "@chakra-ui/react";
import React from "react";

const EditableInput = ({
  name,
  id,
  editable,
  onClick,
  onChange,
  onSave,
  onCancel,
  onDelete,
}) => {
  if (editable) {
    return (
      <React.Fragment>
        <Box
          bg="orange.900"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          m={4}
          className="clickable"
        >
          <Input name={name} id={id} defaultValue={name} onChange={onChange} />{" "}
          <Button onClick={onSave}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onDelete}>Delete</Button>
        </Box>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Box
          maxW="sm"
          bg="orange.900"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          m={4}
          onClick={onClick}
          className="clickable"
        >
          {name}
        </Box>
      </React.Fragment>
    );
  }
};

export default EditableInput;
