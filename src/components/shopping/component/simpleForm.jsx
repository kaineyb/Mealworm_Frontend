import React, { useState, useEffect, useContext } from "react";
import DataContext from "../../../context/dataContext";
import http from "../../../services/httpService";

import EditableInput from "../../common/editableInput";
import CreateForm from "./createForm";

// 3rd Party

import { toast } from "react-toastify";

function SimpleForm(props) {
  const [local, setLocal] = useState([]);
  const [pending, setPending] = useState([]);

  const context = useContext(DataContext);

  const { data } = context;
  const { name } = props;
  const contextArray = data[name];

  useEffect(() => {
    async function getSource() {
      setLocal(contextArray);
    }
    getSource();
  }, [contextArray]);

  const toggleEditable = (item) => {
    const index = local.indexOf(item);
    const newArray = [...local];

    if (item.editable) {
      delete newArray[index].editable;
      setLocal(newArray);
    } else {
      newArray[index].editable = true;
      setLocal(newArray);
    }
  };

  const handleChange = ({ currentTarget: input }, item) => {
    const index = local.indexOf(item);
    const targetCopy = pending.map((_item) => ({ ..._item }));

    const savedChange = targetCopy.filter(
      (change) => change.sourceIndex === index
    );

    if (savedChange.length === 0) {
      const change = { sourceIndex: index, value: input.value };
      setPending([change, ...targetCopy]);
    } else {
      const unchanged = targetCopy.filter(
        (change) => change.sourceIndex !== index
      );

      savedChange[0]["value"] = input.value;

      setPending([savedChange[0], ...unchanged]);
    }
  };

  const handleSave = (item) => {
    const { name } = props;

    const index = local.indexOf(item);

    const pendingCopy = pending.map((_item) => ({ ..._item }));
    const localCopy = local.map((item) => ({ ...item }));

    const pendingItem = pendingCopy.filter(
      (_item) => _item.sourceIndex === index
    );

    const newValue = pendingItem[0]["value"];
    localCopy[index]["name"] = newValue;

    // Remove Editable Flag
    delete localCopy[index].editable;

    // Update the App State
    context.setData(name, localCopy);

    // Remove the item from the pendingArray
    const unchanged = pendingCopy.filter(
      (change) => change.sourceIndex !== index
    );
    setPending(unchanged);

    doSave({ id: item.id, name: localCopy[index]["name"] });
  };

  const doSave = async (item) => {
    const { endpoint } = props;
    await toast.promise(
      http.patch(`${endpoint}${item.id}/`, { name: item.name }),
      {
        pending: `Updating ${item.name} on server...`,
        success: `Updated ${item.name} on server! :)`,
        error: `Couldn't update ${item.name} on server! :(`,
      }
    );
  };

  const handleCancel = (item) => {
    const index = local.indexOf(item);
    const targetCopy = pending.map((_item) => ({ ..._item }));

    const unchanged = targetCopy.filter(
      (change) => change.sourceIndex !== index
    );

    setPending(unchanged);
    toggleEditable(item);
  };

  const handleDelete = async (item) => {
    const { name, endpoint, singularTitle } = props;

    const deleteMe = window.confirm(`Really Delete "${item.name}"?`);

    const currentState = [...local];

    if (deleteMe === true) {
      // We delete from state, then server.
      const unDeleted = local.filter((_item) => _item.id !== item.id);
      context.setData(name, unDeleted);

      try {
        await toast.promise(http.delete(`${endpoint}${item.id}/`), {
          pending: `Deleting ${singularTitle}: ${item.name}`,
          success: `Deleted ${singularTitle}: ${item.name}!`,
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error(`This ${singularTitle} has already been deleted!`);
        } else if (!error.response) {
          toast.error(
            `Deleting ${singularTitle} Failed!: ${item.name}, please try again later`
          );
          context.setData(name, currentState);
          toggleEditable(item);
        }
      }
    } else {
      // Do we toggle or not?
      toggleEditable(item);
    }
  };

  const handleCreate = async (itemName) => {
    const { name, endpoint, singularTitle } = props;
    const payload = { name: itemName };

    try {
      const result = await toast.promise(http.post(`${endpoint}`, payload), {
        pending: `Creating ${singularTitle}: ${itemName}`,
        success: `${singularTitle} "${itemName}" created! `,
      });

      if (result.status === 201) {
        const localCopy = [...local];
        const newSource = [...localCopy, result.data];
        context.setData(name, newSource);
      }
    } catch (error) {
      if (!error.response) {
        toast.error(
          ` Creating ${singularTitle}: ${itemName} failed! Please try again later`
        );
      }
    }
  };

  const renderMap = () => {
    return local
      ? local.map((item) => (
          <li key={item.id}>
            <EditableInput
              name={item.name}
              value={item.name}
              id={item.id}
              onClick={() => toggleEditable(item)}
              onChange={(event) => handleChange(event, item)}
              onSave={() => handleSave(item)}
              onCancel={() => handleCancel(item)}
              onDelete={() => handleDelete(item)}
              editable={item.editable}
            />
          </li>
        ))
      : [];
  };

  return (
    <div>
      <h2>{props.pluralTitle}</h2>
      <CreateForm
        doCreate={handleCreate}
        placeHolder={`New ${props.singularTitle} name...`}
        buttonLabel={`Create new ${props.singularTitle}`}
      />
      <ul>{renderMap()}</ul>
    </div>
  );
}

export default SimpleForm;
