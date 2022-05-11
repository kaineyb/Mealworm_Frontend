import { Box, Button, Divider, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function PlanLinks(props) {
  const { plan } = props;
  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} mb={5}>
      <Heading as="h3">Plan: {plan.name}</Heading>
      <Divider my={5} />
      <p>
        Lasts <strong>{plan.day_set.length}</strong> days
      </p>
      <Divider my={5} />

      <HStack>
        <Button>
          <Link to={`/plan/${plan.id}/shopping-list`}>Shopping List</Link>
        </Button>
        <Button>
          <Link to={`/plan/${plan.id}/schedule`}>Schedule</Link>
        </Button>
        <Button>
          <Link to={`/plan/${plan.id}/recipes`}>Recipes</Link>
        </Button>
      </HStack>
    </Box>
  );
}

export default PlanLinks;
