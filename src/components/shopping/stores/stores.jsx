import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
// 3rd Party
import { toast } from "react-toastify";
import DataContext from "../../../context/dataContext";
import http from "../../../services/httpService";
import CreateForm from "../component/createForm";
import { en } from "./../../../services/textService";
import { setTitle } from "./../../../snippets/setTitle";
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

  const context = useContext(DataContext);

  const { data } = context;

  useEffect(() => {
    setTitle("Stores");
  }, []);

  useEffect(() => {
    async function getStores() {
      setStores(data["stores"]);
    }
    getStores();
  }, [context, data]);

  const handleCreate = async (itemName) => {
    const { name, endpoint, singularTitle } = props;
    const payload = { name: itemName };

    try {
      const result = await toast.promise(http.post(`${endpoint}`, payload), {
        pending: en.stores.postPromise.pending(singularTitle, itemName),
        success: en.stores.postPromise.success(singularTitle, itemName),
      });

      if (result.status === 201) {
        const localCopy = [...stores];
        const newSource = [...localCopy, result.data];
        context.setData(name, newSource);
      }
    } catch (error) {
      if (!error.response) {
        toast.error(en.stores.postPromise.error(singularTitle, itemName));
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
        placeHolder={en.stores.newName}
        buttonLabel={en.stores.createNew}
      />
      <Divider my={4} />
      <Flex direction={{ base: "column" }} gap={3}>
        {stores?.map((store) => (
          <Store key={store.id} store={store} />
        ))}
      </Flex>
    </div>
  );
}

export default Stores;
