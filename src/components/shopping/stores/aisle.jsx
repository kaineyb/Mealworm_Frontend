import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  Icon,
} from "@chakra-ui/icons";
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
import _ from "lodash";
import { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "../../../context/dataContext";
import http from "../../../services/httpService";
import { en } from "../../../services/textService";

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
        pending: en.aisles.postPromise.pending(section.name, store.name),
        success: en.aisles.postPromise.success(section.name, store.name),
        error: en.aisles.postPromise.error(section.name, store.name),
      }
    );

    return result;
  };

  const doUpdateSave = async () => {
    const payload = { store: store.id, aisle_number: aisleNumber };

    await toast.promise(
      http.patch(`${http.storesEP}${store.id}/aisles/${aisle.id}/`, payload),
      {
        pending: en.aisles.patchPromise.pending(aisle.section_name),
        success: en.aisles.patchPromise.success(aisle.section_name),
        error: en.aisles.patchPromise.error(aisle.section_name),
      }
    );
  };

  const handleDelete = () => {
    const deleteMe = window.confirm(
      en.aisles.delete.confirm(aisleNumber, aisle.section.name, store.name)
    );

    if (deleteMe) {
      const {
        // data: { sections },
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
        pending: en.aisles.delete.promise.pending(
          aisleNumber,
          aisle.section_name,
          store.name
        ),
        success: en.aisles.delete.promise.success(
          aisleNumber,
          aisle.section_name,
          store.name
        ),
        error: en.aisles.delete.promise.error(
          aisleNumber,
          aisle.section_name,
          store.name
        ),
      }
    );
  };

  const isValid = aisleNumber > 0;
  const isDeleteAble = defaultAisleNumber > 0;

  const bg = useColorModeValue("gray.100", "whiteAlpha.200");
  const color = useColorModeValue("black", "white");

  const boxProps = {
    bg: bg,
    color: color,
    mb: 4,
    position: "relative",
    p: 4,
  };

  const editBoxProps = { ...boxProps, p: 0 };

  const controlFlexBox = {
    direction: { base: "column", sm: "row" },
    gap: 2,
    p: 3,
    pl: 5,
    alignItems: "center",
    width: "100%",
  };

  const flexBox = {
    justifyContent: "space-between",
    alignItems: "center",
    direction: { base: "column", sm: "row" },
  };

  const iconWidths = { base: "100%", sm: "initial" };

  const editMode = (
    <Fragment>
      <Box {...editBoxProps}>
        <Flex {...flexBox}>
          <Text p={4}>
            <strong>{section.name}</strong>
          </Text>
          <Box bg={"blackAlpha.300"}>
            <Flex {...controlFlexBox}>
              <Text>
                <strong>{en.aisles.aisle}</strong>
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
                aria-label={en.aisles.ariaSave}
                icon={<CheckIcon />}
                size="sm"
                width={{ ...iconWidths }}
                disabled={!isValid}
                onClick={handleSave}
              />
              <IconButton
                aria-label={en.aisles.ariaCancel}
                icon={<CloseIcon />}
                size="sm"
                width={{ ...iconWidths }}
                onClick={handleCancel}
              />
              <IconButton
                aria-label={en.aisles.ariaDelete}
                display={isDeleteAble ? "block" : "none"}
                disabled={!isDeleteAble}
                colorScheme={"red"}
                icon={<DeleteIcon />}
                onClick={handleDelete}
                size="sm"
                width={{ ...iconWidths }}
              />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Fragment>
  );
  const standardMode = (
    <Fragment>
      <Box onClick={handleToggle} className="clickable" {...boxProps}>
        <Flex gap={3}>
          <Text>
            <strong>{section.name}</strong>
          </Text>
        </Flex>
        <Icon as={EditIcon} w={3} h={3} position="absolute" top="2" right="2" />
      </Box>
    </Fragment>
  );

  return <Fragment>{editable ? editMode : standardMode}</Fragment>;
};

export default Aisle;
