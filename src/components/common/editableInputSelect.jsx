import { EditIcon, Icon } from "@chakra-ui/icons";
import { Box, Button, HStack, Input, Select } from "@chakra-ui/react";
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
        <Box borderWidth="1px" borderRadius="lg" p={4} m={4} bg="orange.900">
          <HStack>
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
            <Button px={8} onClick={onSave}>
              Save
            </Button>
            <Button px={8} onClick={onCancel}>
              Cancel
            </Button>
            <Button px={8} onClick={onDelete}>
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
          bg="orange.900"
          className="clickable"
          onClick={onClick}
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          m={4}
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
