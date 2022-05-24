import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  Icon,
} from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import _ from "lodash";
import { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "../../../context/dataContext";
import http from "../../../services/httpService";

const Aisle = (props) => {
  const { store, stores, sectionID, sections } = props;

  const getAisle = () => {
    const myAisle = store.aisles.filter(
      (aisle) => aisle.section === sectionID
    )[0];
    return myAisle;
  };

  const getSection = () => {
    const mySection = sections.filter((section) => section.id === sectionID)[0];
    return mySection;
  };

  const aisle = getAisle();
  const section = getSection();

  const defaultAisleNumber = aisle ? aisle.aisle_number : 0;

  const [aisleNumber, setAisleNumber] = useState(defaultAisleNumber);
  const [editable, setEditable] = useState(false);

  const context = useContext(dataContext);

  const { setData } = context;

  const handleToggle = () => {
    setEditable(!editable);
  };

  const handleCancel = () => {
    setAisleNumber(defaultAisleNumber);
    setEditable(false);
  };

  const handleAisleAisleNumberChange = (value) => {
    setAisleNumber(parseInt(value));
  };

  const handleSave = async () => {
    if (defaultAisleNumber === aisleNumber) {
      setEditable(false);
      return;
    }
    const newStores = [...stores];
    const myStore = newStores.filter((_store) => _store.id === store.id)[0];

    if (defaultAisleNumber === 0) {
      const myNewAisle = {
        id: null,
        aisle_number: aisleNumber,
        section: section.id,
        section_name: section.name,
      };

      myStore["aisles"].push(myNewAisle);

      const result = await doNewSave();
      myNewAisle["id"] = result.data.id;
    } else {
      const myAisle = myStore["aisles"].filter(
        (_aisle) => _aisle.id === aisle.id
      )[0];

      myAisle["aisle_number"] = aisleNumber;
      setEditable(false);
      doUpdateSave();
    }

    const orderedNewAisles = _.orderBy(
      myStore["aisles"],
      ["aisle_number", "section_name"],
      ["asc"]
    );

    myStore["aisles"] = orderedNewAisles;
    setData("stores", newStores);
  };

  const doNewSave = async () => {
    const payload = {
      section: section.id,
      aisle_number: aisleNumber,
    };

    const result = await toast.promise(
      http.post(`${http.storesEP}${store.id}/aisles/`, payload),
      {
        pending: `Creating Aisle for ${section.name} at ${store.name} on server`,
        success: `Created Aisle for ${section.name} at ${store.name} on server!`,
        error: `Couldn't create Aisle for ${section.name} at ${store.name} on server :(`,
      }
    );

    return result;
  };

  const doUpdateSave = async () => {
    const payload = { store: store.id, aisle_number: aisleNumber };

    await toast.promise(
      http.patch(`${http.storesEP}${store.id}/aisles/${aisle.id}/`, payload),
      {
        pending: `Updating Aisle Number for Section: ${aisle.section_name} on server`,
        success: `Updated Aisle Number for Section: ${aisle.section_name} on server!`,
        error: `Couldn't update Aisle Number for Section: ${aisle.section_name} on server :(`,
      }
    );
  };

  const handleDelete = () => {
    const deleteMe = window.confirm(
      `Really Delete "Aisle No ${aisleNumber} for Section: ${aisle.section.name} @  ${store.name}" ?`
    );

    if (deleteMe) {
      const {
        data: { sections },
        setData,
      } = context;

      // Remove Locally
      const newStores = [...stores];
      const myStore = newStores.filter((_store) => _store.id === store.id)[0];
      const aisles = myStore["aisles"];

      const newAisleSet = aisles.filter((_aisle) => _aisle.id !== aisle.id);

      myStore["aisles"] = newAisleSet;

      setData("stores", newStores);
      setAisleNumber(0);
      handleToggle();
      // Remove on Server
      doDelete();
    }
  };

  const doDelete = async () => {
    await toast.promise(
      http.delete(`${http.storesEP}${store.id}/aisles/${aisle.id}/`),
      {
        pending: `Deleting Aisle No: ${aisleNumber} for Section: ${aisle.section_name} @  ${store.name} on server`,
        success: `Deleted Aisle No: ${aisleNumber} for Section: ${aisle.section_name} @  ${store.name} on server!`,
        error: `Couldn't delete Aisle No: ${aisleNumber} for Section: ${aisle.section_name} @  ${store.name} on server :(`,
      }
    );
  };

  const isValid = aisleNumber > 0;
  const isDeleteAble = defaultAisleNumber > 0;

  const bg = useColorModeValue("gray.100", "whiteAlpha.200");
  const color = useColorModeValue("black", "white");

  const borderColor = aisleNumber === 0 ? "red.900" : "";

  const boxProps = {
    bg: bg,
    color: color,
    borderWidth: "1px",
    borderRadius: "5px",
    borderColor: borderColor,
    p: 5,
    my: 5,
    position: "relative",
  };

  const flexProps = { direction: { base: "column", sm: "row" }, gap: 2 };

  const editMode = (
    <Fragment>
      <Box {...boxProps}>
        <VStack align={"flex-start"}>
          <strong>{section.name}</strong>
          <Divider />
          <Flex {...flexProps}>
            <Text>
              <strong>Aisle:</strong>
            </Text>
            <NumberInput
              size="sm"
              min="0"
              defaultValue={aisleNumber}
              onChange={(value) => handleAisleAisleNumberChange(value)}
            >
              <NumberInputField id="amount" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <IconButton
              colorScheme={"green"}
              aria-label="Save"
              icon={<CheckIcon />}
              size="sm"
              disabled={!isValid}
              onClick={handleSave}
            />
            <IconButton
              aria-label="Cancel"
              icon={<CloseIcon />}
              size="sm"
              onClick={handleCancel}
            />
            <IconButton
              aria-label="Delete"
              display={isDeleteAble ? "block" : "none"}
              disabled={!isDeleteAble}
              colorScheme={"red"}
              icon={<DeleteIcon />}
              onClick={handleDelete}
              size="sm"
            />
          </Flex>
        </VStack>
      </Box>
    </Fragment>
  );
  const standardMode = (
    <Fragment>
      <Box onClick={handleToggle} className="clickable" {...boxProps}>
        <VStack align={"flex-start"}>
          <Text>
            <strong>{section.name}</strong>
          </Text>
          <Divider />
          <Text>
            <strong>Aisle: </strong>
            {aisleNumber === 0 ? <em>Not Set</em> : aisleNumber}
          </Text>
        </VStack>
        <Icon as={EditIcon} w={3} h={3} position="absolute" top="2" right="2" />
      </Box>
    </Fragment>
  );

  return <Fragment>{editable ? editMode : standardMode}</Fragment>;
};

export default Aisle;
