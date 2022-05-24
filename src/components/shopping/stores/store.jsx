import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Icon,
  IconButton,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "../../../context/dataContext";
import http from "../../../services/httpService";
import Aisle from "./aisle";

const Store = (props) => {
  const [editable, setEditable] = useState(false);
  const [store, setStore] = useState(props.store);
  const [newStoreName, setNewStoreName] = useState("");

  const bg = useColorModeValue("gray.100", "whiteAlpha.200");
  const color = useColorModeValue("black", "white");

  const {
    data: { stores, sections },
    setData,
  } = useContext(dataContext);

  const handleClick = () => {
    setEditable(true);
  };

  const handleCancel = () => {
    setNewStoreName("");
    setEditable(false);
  };

  const handleDelete = () => {
    const deleteConfirmed = window.confirm(`Really Delete "${store.name}"?`);

    if (!deleteConfirmed) {
      setEditable(false);
      return;
    } else {
      const newStores = stores.filter((_store) => _store.id !== store.id);
      setData("stores", newStores);
      doDelete();
    }
  };

  const doDelete = async () => {
    await toast.promise(http.delete(`${http.storesEP}${store.id}/`), {
      pending: `Deleting ${store.name} from server...`,
      success: `Deleted ${store.name} from server! :)`,
      error: `Couldn't deleted ${store.name} from server! :(`,
    });
  };

  const handleSave = () => {
    if (newStoreName === "") {
      setEditable(false);
      return;
    } else {
      setStore({ ...store, name: newStoreName });
      setEditable(false);

      doSave();
    }
  };

  const doSave = async () => {
    const payload = { name: newStoreName };

    await toast.promise(http.patch(`${http.storesEP}${store.id}/`, payload), {
      pending: `Updating ${newStoreName} on server...`,
      success: `Updated ${newStoreName} on server! :)`,
      error: `Couldn't update ${newStoreName} on server! :(`,
    });
  };

  const handleChange = ({ currentTarget: input }) => {
    setNewStoreName(input.value);
  };

  const boxProps = {
    bg: bg,
    color: color,
    position: "relative",
    borderWidth: "1px",
    borderRadius: "lg",
    p: 4,
  };

  const editStoreMode = (
    <Box>
      <Flex direction={{ base: "column", sm: "row" }} gap={2}>
        <Input
          onChange={handleChange}
          size="sm"
          name={store.name}
          id={store.id}
          defaultValue={store.name}
        />{" "}
        <IconButton
          onClick={handleSave}
          colorScheme={"green"}
          aria-label="Save"
          icon={<CheckIcon />}
          size="sm"
        />
        <IconButton
          onClick={handleCancel}
          aria-label="Cancel"
          icon={<CloseIcon />}
          size="sm"
        />
        <IconButton
          onClick={handleDelete}
          colorScheme={"red"}
          aria-label="Delete"
          icon={<DeleteIcon />}
          size="sm"
        />
      </Flex>
    </Box>
  );

  const standardStoreMode = (
    <Box className="clickable" onClick={handleClick} position="relative">
      <strong>{store.name}</strong>{" "}
      <Icon as={EditIcon} ml={2} w={3} h={3} position="relative" top="-0.5" />
    </Box>
  );

  const currentStoreMode = editable ? editStoreMode : standardStoreMode;

  const assignedSectionIds = [
    ...store.aisles.map((aisle) => parseInt(aisle.section)),
  ];

  const filteredUnassignedSections = sections.filter(
    (section) => !assignedSectionIds.includes(section.id)
  );

  const assignedSections = (
    <Box>
      {store.aisles.map((aisle) => (
        <Aisle
          key={aisle.section}
          store={store}
          stores={stores}
          sectionID={aisle.section}
          sections={sections}
        />
      ))}
    </Box>
  );

  const unassignedSections = (
    <Fragment>
      {filteredUnassignedSections.map((section) => (
        <Aisle
          key={section.id}
          store={store}
          stores={stores}
          sectionID={section.id}
          sections={sections}
        />
      ))}
    </Fragment>
  );

  return (
    <Box {...boxProps}>
      {currentStoreMode}
      <Divider my={5} />
      {assignedSections}
      {unassignedSections}
    </Box>
  );
};

export default Store;
