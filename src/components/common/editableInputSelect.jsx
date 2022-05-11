import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  Icon,
} from "@chakra-ui/icons";
import { Box, Flex, IconButton, Input, Select } from "@chakra-ui/react";
import React from "react";

const EditableInputSelect = ({
  name,
  editable,
  selectionOptions,
  itemSelection,
  onClick,
  onCancel,
  onChangeInput,
  onChangeSelect,
  onSave,
  onDelete,
}) => {
  if (editable) {
    return (
      <React.Fragment>
        <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} bg="orange.900">
          <Flex gap={3} direction={{ base: "column", sm: "row" }}>
            <Input defaultValue={name} onChange={onChangeInput} />
            <Select
              defaultValue={itemSelection}
              name={`${name}-select`}
              id={`${name}-select`}
              onChange={onChangeSelect}
            >
              <option value="0">----</option>
              {selectionOptions.map((selection) => (
                <option key={selection.id} value={selection.id}>
                  {selection.name}
                </option>
              ))}
            </Select>

            <IconButton
              colorScheme={"green"}
              p={5}
              aria-label="Save"
              icon={<CheckIcon />}
              size="sm"
              onClick={onSave}
            />
            <IconButton
              p={5}
              aria-label="Save"
              icon={<CloseIcon />}
              size="sm"
              onClick={onCancel}
            />
            <IconButton
              colorScheme={"red"}
              p={5}
              aria-label="Save"
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
          position="relative"
          bg="orange.900"
          className="clickable"
          onClick={onClick}
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          mb={4}
        >
          {name}
          <Icon
            as={EditIcon}
            ml={2}
            w={3}
            h={3}
            position="absolute"
            top="2"
            right="2"
          />
        </Box>{" "}
      </React.Fragment>
    );
  }
};

export default EditableInputSelect;
