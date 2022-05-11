import { CalendarIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import { AiOutlineClockCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
function PlanLinks(props) {
  const { plan } = props;
  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} mb={5}>
      <Flex direction={{ base: "column", sm: "rows" }} gap={2}>
        <Link as={RouterLink} to={`/plan/${plan.id}/shopping-list`}>
          <Button w="100%" leftIcon={<AiOutlineShoppingCart />}>
            Shopping List
          </Button>
        </Link>

        <Link as={RouterLink} to={`/plan/${plan.id}/schedule`}>
          <Button w="100%" leftIcon={<AiOutlineClockCircle />}>
            Schedule
          </Button>
        </Link>

        <Link as={RouterLink} to={`/plan/${plan.id}/recipes`}>
          <Button w="100%" leftIcon={<CalendarIcon />}>
            Recipes
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}

export default PlanLinks;
