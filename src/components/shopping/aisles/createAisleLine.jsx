import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  IconButton,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import dataContext from "./../../../context/dataContext";
import http from "./../../../services/httpService";
const CreateAisleLine = (props) => {
  const { line_id, removeLine, section } = props;

  const context = useContext(dataContext);

  const [stores, setStores] = useState([]);

  const [aisleNumber, setAisleNumber] = useState(1);
  const [store, setStore] = useState();

  useEffect(() => {
    async function getStores() {
      const {
        data: { stores = [] },
      } = context;
      setStores(stores);
    }
    getStores();
  }, [context]);

  const handleChangeAisleNumber = (event) => {
    setAisleNumber(parseInt(event.target.value));
  };

  const handleChangeStore = (event) => {
    setStore(parseInt(event.target.value));
  };
  const validateSave = aisleNumber ? true : false;

  const handleSave = async () => {
    if (validateSave) {
      const {
        data: { sections },
        setData,
      } = context;

      // Set Locally
      const newSections = [...sections];
      const mySection = newSections.filter(
        (_section) => _section.id === section.id
      )[0];

      const newAisle = {
        id: 0,
        aisle_number: aisleNumber,
        store,
      };

      mySection["storeaisle_set"].push(newAisle);

      const index = mySection["storeaisle_set"].indexOf(newAisle);

      removeLine(line_id);

      const newId = await doSave(newAisle);
      mySection["storeaisle_set"][index]["id"] = newId;

      setData("sections", newSections);
    }
  };

  const doSave = async (payload) => {
    delete payload["id"];
    const result = await toast.promise(
      http.post(`${http.sectionsEP}${section.id}/aisles/`, payload),
      {
        pending: `Creating Aisle for Section: ${section.name} on server`,
        success: `Created Aisle for Section: ${section.name} on server!`,
        error: `Couldn't create Aisle for Section: ${section.name} on server :(`,
      }
    );
    return result.data["id"];
  };

  return (
    <Box key={line_id}>
      <Flex direction={{ base: "column", sm: "row" }} gap={2}>
        <Text>Aisle:</Text>
        <Input
          size="sm"
          type="number"
          defaultValue={aisleNumber}
          min="1"
          onChange={(event) => handleChangeAisleNumber(event)}
        />
        <Select
          size="sm"
          name={`${line_id}-select-meal`}
          id={`${line_id}-select-meal`}
          onClick={handleChangeStore}
          defaultValue="header"
        >
          <option value="header" disabled hidden>
            Choose Store...
          </option>
          {stores.map((stores) => (
            <option key={stores.id} value={stores.id}>
              {stores.name}
            </option>
          ))}
        </Select>

        <IconButton
          colorScheme={"green"}
          aria-label="Save"
          icon={<CheckIcon />}
          size="sm"
          onClick={handleSave}
          disabled={!validateSave}
        />
        <IconButton
          aria-label="Cancel"
          icon={<CloseIcon />}
          size="sm"
          onClick={() => removeLine(line_id)}
        />
      </Flex>
      <Divider my={4} />
    </Box>
  );
};

export default CreateAisleLine;
