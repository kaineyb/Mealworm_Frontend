import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Icon, Input } from "@chakra-ui/react";
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
          <HStack>
            <Input
              size="sm"
              name={name}
              id={id}
              defaultValue={name}
              onChange={onChange}
            />{" "}
            <Button size="sm" onClick={onSave}>
              Save
            </Button>
            <Button size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={onDelete}>
              Delete
            </Button>
          </HStack>
        </Box>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Box
          position="relative"
          maxW="sm"
          bg="orange.900"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          m={4}
          onClick={onClick}
          className="clickable"
        >
          <strong>{name}</strong>{" "}
          <Icon
            as={EditIcon}
            ml={2}
            w={3}
            h={3}
            position="absolute"
            top="2"
            right="2"
          />
        </Box>
      </React.Fragment>
    );
  }
};

export default EditableInput;
