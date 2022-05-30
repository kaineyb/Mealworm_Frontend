import { Box, Heading } from "@chakra-ui/react";
import { Fragment } from "react";
import EditableInputSelect from "../../common/editableInputSelect";

const IngredientSection = (props) => {
  return (
    <Fragment>
      <Heading as="h3" size="sm" variant="sectionHeader">
        {props.heading}
      </Heading>
      <Box borderWidth="1px" borderTop={0} p={4} pb={0} mb={5}>
        {props.items.map((item) => (
          <EditableInputSelect
            key={item.id}
            name={item.name}
            value={item.name}
            id={item.id}
            selectionOptions={props.selectionOptions}
            itemSelection={item.section}
            onClick={() => props.toggleEditable(item)}
            onChangeInput={(event) => props.handleChangeInput(event, item)}
            onChangeSelect={(event) => props.handleChangeSelect(event, item)}
            onSave={() => props.handleSave(item)}
            onCancel={() => props.handleCancel(item)}
            onDelete={() => props.handleDelete(item)}
            editable={item.editable}
          />
        ))}
      </Box>
    </Fragment>
  );
};

export default IngredientSection;
