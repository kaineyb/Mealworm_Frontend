import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
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
  const bg = useColorModeValue("gray.100", "whiteAlpha.200");
  const color = useColorModeValue("black", "white");

  const bColor = useColorModeValue("purple.400", "purple.400");

  const boxProps = {
    bg: bg,
    color: color,
    p: 4,
    borderTopWidth: "3px",
    borderColor: bColor,
  };

  if (editable) {
    return (
      <React.Fragment>
        <Box {...boxProps} className="clickable">
          <Flex direction={{ base: "column", sm: "row" }} gap={2}>
            <Input
              size="sm"
              name={name}
              id={id}
              defaultValue={name}
              onChange={onChange}
            />{" "}
            <IconButton
              colorScheme={"green"}
              aria-label="Save"
              icon={<CheckIcon />}
              size="sm"
              onClick={onSave}
            />
            <IconButton
              aria-label="Cancel"
              icon={<CloseIcon />}
              size="sm"
              onClick={onCancel}
            />
            <IconButton
              colorScheme={"red"}
              aria-label="Delete"
              icon={<DeleteIcon />}
              size="sm"
              onClick={onDelete}
            />
          </Flex>
        </Box>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Box
          {...boxProps}
          position="relative"
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
