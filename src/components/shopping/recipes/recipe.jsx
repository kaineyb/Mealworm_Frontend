import {
  Badge,
  Box,
  Divider,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import days from "../../../snippets/days";
import mealFromID from "../../../snippets/meals";
function Recipe(props) {
  const { meals, plan, ingredients, day } = props;

  const MealIngredients = (mealId) => {
    const meal = mealFromID(mealId, meals, {});
    return meal.meal_ingredients;
  };

  return (
    <Box
      key={day.id}
      borderWidth="1px"
      borderRadius="lg"
      p={5}
      my={5}
      position="relative"
    >
      <Heading as="h4" size="sm" mb={2}>
        {mealFromID(day.meal, meals)}
      </Heading>
      <Stack direction="row" position="absolute" top="5" right="5">
        <Badge variant="outline">{day.order}</Badge>
        <Badge variant="subtle">{days.getDay(day.order, plan.start_day)}</Badge>
      </Stack>

      <Divider my={5} />
      <Box borderWidth="1px" borderRadius="lg" p={5} my={5}>
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th scope="col">Quantity</Th>
                <Th scope="col">Unit</Th>
                <Th scope="col">Ingredient</Th>
              </Tr>
            </Thead>
            <Tbody>
              {MealIngredients(day.meal).map((ingredient) => (
                <Tr key={ingredient.id}>
                  <Td>{ingredient.quantity}</Td>
                  <Td>{ingredient.unit}</Td>
                  <Td>{mealFromID(ingredient.ingredient, ingredients)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Box borderWidth="1px" borderRadius="lg" p={5} my={5}>
        <Heading as="h6" size="s">
          Recipe <Badge>Coming Soon :)</Badge>
        </Heading>
        <Divider my={5}></Divider>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore
          neque pariatur itaque minus similique odit asperiores. Maiores,
          aliquid commodi adipisci esse libero officia. Beatae doloremque ipsam
          architecto quisquam soluta eaque.
        </Text>
      </Box>
    </Box>
  );
}

export default Recipe;
