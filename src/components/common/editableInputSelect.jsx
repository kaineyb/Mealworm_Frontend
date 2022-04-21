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
        <input defaultValue={name} onChange={onChangeInput} />
        <select
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
        </select>
        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onDelete}>Delete</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <span className="clickable" onClick={onClick}>
          {name}
        </span>{" "}
      </React.Fragment>
    );
  }
};

export default EditableInputSelect;
