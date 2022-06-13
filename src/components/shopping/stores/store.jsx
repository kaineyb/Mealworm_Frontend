import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "../../../context/dataContext";
import http from "../../../services/httpService";
import { en } from "../../../services/textService";
import Aisle from "./aisle";

const Store = (props) => {
  const [editable, setEditable] = useState(false);
  const [store, setStore] = useState(props.store);
  const [newStoreName, setNewStoreName] = useState("");

  const [sectionsWithAisle, setSectionsWithAisle] = useState([]);
  const [sectionsWithoutAisle, setSectionsWithoutAisle] = useState([]);

  const bg = useColorModeValue("gray.100", "whiteAlpha.200");
  const color = useColorModeValue("black", "white");

  const {
    data: { stores, sections },
    setData,
  } = useContext(dataContext);

  useEffect(() => {
    let aisleNumbers = [];
    store.aisles.forEach((aisle) => aisleNumbers.push(aisle.aisle_number));
    const aisleNumbersSet = new Set(aisleNumbers);
    aisleNumbers = Array.from(aisleNumbersSet);
    setSectionsWithAisle(aisleNumbers);
  }, [store.aisles]);

  useEffect(() => {
    const assignedSectionIds = [
      ...store.aisles.map((aisle) => parseInt(aisle.section)),
    ];

    const filteredUnassignedSections = sections.filter(
      (section) => !assignedSectionIds.includes(section.id)
    );

    setSectionsWithoutAisle(filteredUnassignedSections);
  }, [store.aisles]);

  console.log("*********");
  console.log(store.name, "sectionsWithAisle", sectionsWithAisle);
  console.log(store.name, "sectionsWithoutAisle", sectionsWithoutAisle);

  const handleClick = () => {
    setEditable(true);
  };

  const handleCancel = () => {
    setNewStoreName("");
    setEditable(false);
  };

  const handleDelete = () => {
    const deleteConfirmed = window.confirm(
      en.stores.delete.confirm(store.name)
    );

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
      pending: en.stores.delete.promise.pending(store.name),
      success: en.stores.delete.promise.success(store.name),
      error: en.stores.delete.promise.error(store.name),
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
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
      pending: en.stores.patchPromise.pending(newStoreName),
      success: en.stores.patchPromise.success(newStoreName),
      error: en.stores.patchPromise.error(newStoreName),
    });
  };

  const handleChange = ({ currentTarget: input }) => {
    setNewStoreName(input.value);
  };

  const subBoxProps = {
    borderWidth: "1px",
    borderTopWidth: "0",
    borderBottomWidth: "1px",
    px: 4,
    pt: 4,
  };

  const headingProps = { as: "h3", size: "sm", variant: "sectionHeader" };
  const subHeadingProps = { as: "h3", size: "sm", variant: "subSectionHeader" };

  const editStoreMode = (
    <Heading {...headingProps}>
      <form onSubmit={(e) => handleSave(e)}>
        <Flex direction={{ base: "column", sm: "row" }} gap={2}>
          <Input
            onChange={handleChange}
            size="sm"
            name={store.name}
            id={store.id}
            defaultValue={store.name}
          />{" "}
          <IconButton
            type="submit"
            colorScheme={"green"}
            aria-label={en.aria.save}
            icon={<CheckIcon />}
            size="sm"
          />
          <IconButton
            onClick={handleCancel}
            aria-label={en.aria.cancel}
            icon={<CloseIcon />}
            size="sm"
          />
          <IconButton
            onClick={handleDelete}
            colorScheme={"red"}
            aria-label={en.aria.delete}
            icon={<DeleteIcon />}
            size="sm"
          />
        </Flex>
      </form>
    </Heading>
  );

  const standardStoreMode = (
    <Heading
      {...headingProps}
      className="clickable"
      position="relative"
      onClick={handleClick}
    >
      <strong>{store.name}</strong>{" "}
      <Icon
        as={EditIcon}
        ml={2}
        w={3}
        h={3}
        position="absolute"
        top={2}
        right={2}
      />
    </Heading>
  );

  const currentStoreMode = editable ? editStoreMode : standardStoreMode;

  const assignedAislesRender = (
    <Box>
      {sectionsWithAisle.map((aisle) => (
        <Fragment>
          <Heading {...subHeadingProps}>Aisle {aisle}</Heading>
          <Box {...subBoxProps}>
            {store.aisles
              .filter((_aisle) => aisle === _aisle.aisle_number)
              .map((_aisle) => (
                <Aisle
                  key={_aisle.id}
                  store={store}
                  stores={stores}
                  sectionID={_aisle.section}
                  sections={sections}
                />
              ))}
          </Box>
        </Fragment>
      ))}
    </Box>
  );

  const unassignedAislesRender =
    sectionsWithoutAisle.length > 0 ? (
      <Fragment>
        <Heading {...subHeadingProps}>No Aisle Assigned</Heading>
        <Box {...subBoxProps}>
          {sectionsWithoutAisle.map((section) => (
            <Aisle
              key={section.id}
              store={store}
              stores={stores}
              sectionID={section.id}
              sections={sections}
            />
          ))}
        </Box>
      </Fragment>
    ) : (
      ""
    );

  return (
    <Fragment>
      <Box>
        {currentStoreMode}
        {assignedAislesRender}
        {unassignedAislesRender}
      </Box>
      <Divider my={5} />
    </Fragment>
  );
};

export default Store;
