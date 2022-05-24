import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
// 3rd Party
import { toast } from "react-toastify";
import DataContext from "../../../context/dataContext";
import http from "../../../services/httpService";
import CreateForm from "../component/createForm";
import Store from "./store";

function Stores(props) {
  props = {
    name: "stores",
    singularTitle: "Store",
    pluralTitle: "Stores",
    endpoint: http.storesEP,
    ...props,
  };

  const [stores, setStores] = useState([]);
  const [sections, setSections] = useState([]);
  const [pending, setPending] = useState([]);

  const context = useContext(DataContext);

  const { data } = context;

  useEffect(() => {
    async function getStores() {
      setStores(data["stores"]);
    }
    getStores();
  }, [context]);

  useEffect(() => {
    async function getSections() {
      setSections(data["sections"]);
    }
    getSections();
  }, [context]);

  const handleCreate = async (itemName) => {
    const { name, endpoint, singularTitle } = props;
    const payload = { name: itemName };

    try {
      const result = await toast.promise(http.post(`${endpoint}`, payload), {
        pending: `Creating ${singularTitle}: ${itemName}`,
        success: `${singularTitle} "${itemName}" created! `,
      });

      if (result.status === 201) {
        const localCopy = [...stores];
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
          {stores.map((store) => (
            <Store key={store.id} store={store} />
          ))}
        </Flex>
      </Box>
    </div>
  );
}

export default Stores;
