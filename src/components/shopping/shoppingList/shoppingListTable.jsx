import {
  Box,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import _ from "lodash";
import { Fragment, useContext, useState } from "react";
import mealFromID from "../../../snippets/meals";
import dataContext from "./../../../context/dataContext";

function ShoppingListTable(props) {
  const { meals, plan, ingredients, sections } = props;

  const {
    data: { stores },
  } = useContext(dataContext);

  const [store, setStore] = useState(0);

  const handleChangeSelect = (event) => {
    setStore(parseInt(event.target.value));
  };

  const getAisleForSection = (sectionId) => {
    if (store === 0) {
      return null;
    }

    const myStore = stores.filter((_store) => _store.id === store)[0];

    const myAisle = myStore["aisles"].filter(
      (_aisle) => _aisle.section === sectionId
    )[0];

    if (myAisle) {
      return myAisle.aisle_number;
    } else {
      return null;
    }
  };

  // Go through each meal and look at the ingredient,
  // check the id and unit, and add them to our object.

  // If the id and unit combination already exists then we add to that specific object.else we create a new object.

  const sectionFromId = (id, sections, object) => {
    const item = sections.filter((section) => section["id"] === id)[0];
    if (item && object) {
      return item;
    } else if (item) {
      return item.name;
    } else {
      return "No Section";
    }
  };

  const combineIngredients = (plan) => {
    const mealTotals = {};

    plan.day_set.forEach((day) => {
      if (mealTotals[day.meal]) {
        mealTotals[day.meal] = mealTotals[day.meal] + 1;
      } else {
        mealTotals[day.meal] = 1;
      }
    });

    return mealTotals;
  };

  const generateIngredientTotals = (mealTotals) => {
    const ingredientTotals = {};

    Object.entries(mealTotals).forEach(([mealID, amount]) => {
      const meal = mealFromID(parseInt(mealID), meals, {});

      meal.meal_ingredients.forEach((mealIngredient) => {
        const uniqueId = `${mealIngredient.ingredient}-${mealIngredient.unit}`;

        const ingredient = sectionFromId(
          parseInt(mealIngredient.ingredient),
          ingredients,
          {}
        );

        if (ingredientTotals[uniqueId]) {
          ingredientTotals[uniqueId]["quantity"] +=
            mealIngredient.quantity * amount;
        } else {
          ingredientTotals[uniqueId] = {
            id: uniqueId,
            ingredient: ingredient.id,
            name: ingredient.name,
            sectionId: ingredient.section,
            section: sectionFromId(ingredient.section, sections),
            aisle: getAisleForSection(ingredient.section),
            unit: mealIngredient.unit,
            quantity: mealIngredient.quantity * amount,
          };
        }
      });
    });

    return ingredientTotals;
  };

  const splitDataIntoSections = (obj) => {
    const sections = {};

    const items = Object.values(obj);

    items.forEach((item) => {
      if (!sections[item.sectionId]) {
        sections[item.sectionId] = {
          section: item.section,
          sectionId: item.sectionId,
          aisle: item.aisle,
          items: [],
        };
      }
      sections[item.sectionId]["items"].push({
        id: item.id,
        ingredient: item.ingredient,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
      });
    });

    return sections;
  };

  const sortShoppingData = (obj) => {
    console.log(obj);
    const newResult = _.orderBy(obj, ["aisle", "section"], ["asc"]);

    Object.values(newResult).forEach((item) => {
      item["items"] = _.orderBy(item["items"], ["name"], ["asc"]);
    });

    return newResult;
  };

  const mealTotals = combineIngredients(plan);
  const shoppingListData = generateIngredientTotals(mealTotals);
  const sectionedData = splitDataIntoSections(shoppingListData);
  const sortedSectionedData = sortShoppingData(sectionedData);

  const generateTableRows = (tableRows) => {
    return tableRows.map((row) => (
      <Tr key={row.id}>
        <Td px={3} m={0} width="0px">
          <Checkbox />
        </Td>
        <Td p={0}>
          {row.quantity} {row.unit} {row.unit === " x " ? "" : " - "}
          {row.name}
        </Td>
      </Tr>
    ));
  };

  const generateTables = (obj) => {
    const tables = Object.values(obj);

    return tables.map((table) => (
      <TableContainer
        key={table.sectionId}
        borderWidth="1px"
        borderRadius="lg"
        mb={5}
      >
        <Table variant={"striped"} size={"sm"}>
          <TableCaption placement="top" textAlign={"left"} m={0}>
            <Heading as="h6" size="sm">
              {table.aisle ? `Aisle: ${table.aisle} - ` : ""} {table.section}
            </Heading>
            <Divider mt={2} />
          </TableCaption>
          <Thead>
            <Tr>
              <Th scope="col"></Th>
              <Th scope="col"></Th>
            </Tr>
          </Thead>
          <Tbody>{generateTableRows(table.items)}</Tbody>
        </Table>
      </TableContainer>
    ));
  };

  return (
    <Fragment>
      <Box borderWidth={"1px"} my={5} p={5}>
        <Flex direction={{ base: "row", sm: "row" }} gap={2}>
          <Text>What store are you shopping at today?</Text>
          <Select size="sm" width="sm" ml={5} onChange={handleChangeSelect}>
            {stores.map((store) => (
              <option value={store.id}>{store.name}</option>
            ))}
          </Select>
        </Flex>
      </Box>
      {generateTables(sortedSectionedData)}
    </Fragment>
  );
}

export default ShoppingListTable;
