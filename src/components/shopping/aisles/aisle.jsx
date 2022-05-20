import { CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "../../../context/dataContext";
import http from "../../../services/httpService";

const Aisle = (props) => {
  const { store, stores, section, sections } = props;

  const getAisleNumber = () => {
    const ourAisle = section.storeaisle_set.filter(
      (aisle) => aisle.store === store.id
    )[0];

    if (ourAisle) {
      return ourAisle.aisle_number;
    } else {
      return 0;
    }
  };

  const getAisleId = () => {
    const ourAisle = section.storeaisle_set.filter(
      (aisle) => aisle.store === store.id
    )[0];

    if (ourAisle) {
      return ourAisle.id;
    } else {
      return null;
    }
  };

  const aisleId = getAisleId();
  const defaultAisleNumber = getAisleNumber();

  const [aisleNumber, setAisleNumber] = useState(defaultAisleNumber);
  const [editable, setEditable] = useState(false);

  const context = useContext(dataContext);

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
      handleToggle();
      return;
    }

    if (defaultAisleNumber === 0) {
      const newSections = [...sections];
      const mySection = newSections.filter(
        (_section) => _section.id === section.id
      )[0];

      const myAisle = {
        store: store.id,
        aisle_number: aisleNumber,
      };

      mySection["storeaisle_set"].push(myAisle);

      const result = await doNewSave();
      myAisle["id"] = result.data.id;
    } else {
      const newSections = [...sections];
      const mySection = newSections.filter(
        (_section) => _section.id === section.id
      )[0];

      const myAisle = mySection["storeaisle_set"].filter(
        (_aisle) => _aisle.id === aisleId
      )[0];

      myAisle["aisle_number"] = aisleNumber;

      doUpdateSave();
    }

    handleToggle();
  };

  const doNewSave = async () => {
    const payload = {
      store: store.id,
      section: section.id,
      aisle_number: aisleNumber,
    };

    const result = await toast.promise(
      http.post(`${http.sectionsEP}${section.id}/aisles/`, payload),
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
      http.patch(`${http.sectionsEP}${section.id}/aisles/${aisleId}/`, payload),
      {
        pending: `Updating Aisle for Section: ${section.name} on server`,
        success: `Updated Aisle for Section: ${section.name} on server!`,
        error: `Couldn't update Aisle for Section: ${section.name} on server :(`,
      }
    );
  };

  const handleDelete = () => {
    const deleteMe = window.confirm(
      `Really Delete "Aisle No ${aisleNumber} for Section: ${section.name} @  ${store.name}" ?`
    );

    if (deleteMe) {
      const {
        data: { sections },
        setData,
      } = context;

      // Remove Locally
      const newSections = [...sections];
      const mySection = newSections.filter(
        (_section) => _section.id === section.id
      )[0];
      const aisleSet = mySection["storeaisle_set"];

      const newAisleSet = aisleSet.filter((_aisle) => _aisle.id !== aisleId);

      mySection["storeaisle_set"] = newAisleSet;

      setData("sections", newSections);
      setAisleNumber(0);
      handleToggle();
      // Remove on Server
      doDelete();
    }
  };

  const doDelete = async () => {
    await toast.promise(
      http.delete(`${http.sectionsEP}${section.id}/aisles/${aisleId}/`),
      {
        pending: `Deleting Aisle No ${aisleNumber} for Section: ${section.name} @  ${store.name} on server`,
        success: `Deleted Aisle No ${aisleNumber} for Section: ${section.name} @  ${store.name} on server!`,
        error: `Couldn't delete Aisle No ${aisleNumber} for Section: ${section.name} @  ${store.name} on server :(`,
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
  };

  const flexProps = { direction: { base: "column", sm: "row" }, gap: 2 };

  const editMode = (
    <Fragment>
      <Box {...boxProps}>
        <Flex {...flexProps}>
          <strong>{store.name} - Aisle:</strong>
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
      </Box>
    </Fragment>
  );
  const standardMode = (
    <Fragment>
      <Box onClick={handleToggle} {...boxProps}>
        <Flex {...flexProps}>
          <Text>
            <strong>{store.name} - Aisle:</strong>{" "}
            {aisleNumber === 0 ? <em>Not Set</em> : aisleNumber}
          </Text>
        </Flex>
      </Box>
    </Fragment>
  );

  return <Fragment>{editable ? editMode : standardMode}</Fragment>;
};

export default Aisle;
