import { Box, Divider, Heading } from "@chakra-ui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import dataContext from "../../../context/dataContext";
import Aisle from "./aisle";

const Aisles = () => {
  const context = useContext(dataContext);

  const [sections, setSections] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function getSections() {
      const {
        data: { sections = [] },
      } = context;
      setSections(sections);
    }
    getSections();
  }, [context]);

  useEffect(() => {
    async function getStores() {
      const {
        data: { stores = [] },
      } = context;
      setStores(stores);
    }
    getStores();
  }, [context]);

  return (
    <Fragment>
      {sections.map((section) => (
        <Box key={section.id} borderWidth="1px" my={5} p={5}>
          <Heading as="h2" size="sm">
            {section.name}
          </Heading>
          <Divider my={5} />

          {stores.map((store) => (
            <Aisle
              key={`${section.id}-${store.id}`}
              store={store}
              stores={stores}
              section={section}
              sections={sections}
            />
          ))}
        </Box>
      ))}
    </Fragment>
  );
};

export default Aisles;
