import { Box, Button, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function PlanLinks(props) {
  const { plan } = props;
  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} mb={5}>
      <HStack>
        <Link to={`/plan/${plan.id}/shopping-list`}>
          <Button>Shopping List</Button>
        </Link>

        <Link to={`/plan/${plan.id}/schedule`}>
          <Button>Schedule</Button>
        </Link>

        <Link to={`/plan/${plan.id}/recipes`}>
          <Button>Recipes</Button>
        </Link>
      </HStack>
    </Box>
  );
}

export default PlanLinks;
