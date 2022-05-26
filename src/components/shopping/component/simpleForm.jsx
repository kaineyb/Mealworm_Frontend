import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
// 3rd Party
import { toast } from "react-toastify";
import DataContext from "../../../context/dataContext";
import http from "../../../services/httpService";
import EditableInput from "../../common/editableInput";
import { en } from "./../../../services/textService";
import CreateForm from "./createForm";

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
    toggleEditable(item);
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
        pending: en.simpleForm.promise.pending(item.name),
        success: en.simpleForm.promise.success(item.name),
        error: en.simpleForm.promise.error(item.name),
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

    const deleteMe = window.confirm(en.simpleForm.delete.confirm(item.name));

    const currentState = [...local];

    if (deleteMe === true) {
      // We delete from state, then server.
      const unDeleted = local.filter((_item) => _item.id !== item.id);
      context.setData(name, unDeleted);

      try {
        await toast.promise(http.delete(`${endpoint}${item.id}/`), {
          pending: en.simpleForm.delete.promise.pending(
            singularTitle,
            item.name
          ),
          success: en.simpleForm.delete.promise.success(
            singularTitle,
            item.name
          ),
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error(en.simpleForm.delete.error.alreadyDeleted(singularTitle));
        } else if (!error.response) {
          toast.error(
            en.simpleForm.delete.error.failedTryAgainLater(
              singularTitle,
              item.name
            )
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
        pending: en.simpleForm.created.promise.pending(singularTitle, itemName),
        success: en.simpleForm.created.promise.success(singularTitle, itemName),
      });

      if (result.status === 201) {
        const localCopy = [...local];
        const newSource = [...localCopy, result.data];
        context.setData(name, newSource);
      }
    } catch (error) {
      if (!error.response) {
        toast.error(en.simpleForm.created.error(singularTitle, itemName));
      }
    }
  };

  const renderMap = () => {
    return local
      ? local.map((item) => (
          <EditableInput
            key={item.id}
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
        ))
      : [];
  };

  return (
    <div>
      <Box>
        <Heading as="h1">{props.pluralTitle}</Heading>
      </Box>
      <Divider my={4} />

      <CreateForm
        doCreate={handleCreate}
        placeHolder={`New ${props.singularTitle} name...`}
        buttonLabel={`Create new ${props.singularTitle}`}
      />
      <Divider mt={4} />
      <Box borderWidth="1px" borderRadius="lg" p={4} mt={4}>
        <Flex direction={{ base: "column" }} gap={3}>
          {renderMap()}
        </Flex>
      </Box>
    </div>
  );
}

export default SimpleForm;
