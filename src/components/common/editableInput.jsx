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
        <input name={name} id={id} defaultValue={name} onChange={onChange} />{" "}
        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onDelete}>Delete</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <span className="clickable" onClick={onClick}>
          {name}{" "}
        </span>
      </React.Fragment>
    );
  }
};

export default EditableInput;
