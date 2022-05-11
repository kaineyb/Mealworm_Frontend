import { CalendarIcon } from "@chakra-ui/icons";
import { Box, Button, HStack } from "@chakra-ui/react";
import React from "react";
import { AiOutlineClockCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
function PlanLinks(props) {
  const { plan } = props;
  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} mb={5}>
      <HStack>
        <Link to={`/plan/${plan.id}/shopping-list`}>
          <Button leftIcon={<AiOutlineShoppingCart />}>Shopping List</Button>
        </Link>

        <Link to={`/plan/${plan.id}/schedule`}>
          <Button leftIcon={<AiOutlineClockCircle />}>Schedule</Button>
        </Link>

        <Link to={`/plan/${plan.id}/recipes`}>
          <Button leftIcon={<CalendarIcon />}>Recipes</Button>
        </Link>
      </HStack>
    </Box>
  );
}

export default PlanLinks;
