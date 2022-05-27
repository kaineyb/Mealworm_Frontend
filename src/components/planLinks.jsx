import { CalendarIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import { AiOutlineClockCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { en } from "./../services/textService";

function PlanLinks(props) {
  const { plan } = props;
  return (
    <Box borderWidth="1px" p={5} mb={5}>
      <Flex direction={{ base: "column", sm: "rows" }} gap={2}>
        <Link as={RouterLink} to={`/plan/${plan.id}/shopping-list`}>
          <Button w="100%" leftIcon={<AiOutlineShoppingCart />}>
            {en.plans.shoppingList}
          </Button>
        </Link>

        <Link as={RouterLink} to={`/plan/${plan.id}/schedule`}>
          <Button w="100%" leftIcon={<AiOutlineClockCircle />}>
            {en.plans.schedule}
          </Button>
        </Link>

        <Link as={RouterLink} to={`/plan/${plan.id}/recipes`}>
          <Button w="100%" leftIcon={<CalendarIcon />}>
            {en.plans.recipes}
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}

export default PlanLinks;
