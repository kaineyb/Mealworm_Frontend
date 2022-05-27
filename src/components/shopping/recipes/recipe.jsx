import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { en } from "../../../services/textService";
import days from "../../../snippets/days";
import mealFromID from "../../../snippets/meals";
function Recipe(props) {
  const { meals, plan, ingredients, day } = props;

  const MealIngredients = (mealId) => {
    const meal = mealFromID(mealId, meals, {});
    return meal.meal_ingredients;
  };

  return (
    <Box key={day.id} borderWidth="1px" p={5} my={5}>
      <Heading as="h4" size="sm" mb={2}>
        {mealFromID(day.meal, meals)}
      </Heading>
      <Flex direction={{ base: "column", sm: "row" }} gap={2} mb={2}>
        <Badge variant="outline">
          {en.planDays.day}
          {day.order}
        </Badge>
        <Badge variant="subtle">
          {days.longDay(days.getDay(day.order, plan.start_day))}
        </Badge>
      </Flex>

      <Divider my={5} />
      <TableContainer>
        <Table variant="striped" size={"sm"}>
          <Thead>
            <Tr>
              <Th scope="col">{en.ingredients.titlePlural}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {MealIngredients(day.meal).map((ingredient) => (
              <Tr key={ingredient.id}>
                <Td>
                  {ingredient.quantity} {ingredient.unit}{" "}
                  {ingredient.unit === " x " ? "" : " - "}
                  {mealFromID(ingredient.ingredient, ingredients)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Heading as="h6" size="s" mt={5}>
        {en.recipes.recipe} <Badge>{en.recipes.comingSoonBadge}</Badge>
      </Heading>
      <Divider my={5} />
      <Text>{en.recipes.loremIpsum}</Text>
    </Box>
  );
}

export default Recipe;
