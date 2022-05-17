import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataContext from "../../context/dataContext";
import auth from "../../services/authService";
import jwtService from "../../services/jwtService";

function UserProfile(props) {
  const [user, setUser] = useState({});
  const context = useContext(DataContext);

  const { access, refresh } = jwtService.getJwtTokens();

  const rT = jwtService.tokenTimeOut(refresh);
  const aT = jwtService.tokenTimeOut(access);

  // console.log("accessTime", aT);
  // console.log("refreshTime", rT);

  useEffect(() => {
    async function getUser() {
      const userInfo = await auth.getCurrentUserObj();
      setUser(userInfo);
    }
    getUser();
  }, []);

  return (
    <Box>
      <Heading as="h1">User Profile</Heading>
      <Divider my={4} />
      <Box my={5} p={5} borderWidth="1px" borderRadius="lg">
        <Heading size="md">User Details</Heading>
        <Divider my={4} />
        <Flex direction={{ base: "column", md: "row" }} gap={2}>
          <Box>
            <Text>User ID:{user.id}</Text>
            <Text>Username: {user.username}</Text>
            <Text>Email: {user.email}</Text>
          </Box>
          <Spacer />

          <Button>
            <Link to="/logout">Logout</Link>
          </Button>
        </Flex>
      </Box>

      <Box my={5} p={5} borderWidth="1px" borderRadius="lg">
        <Heading size="md">Secret Admin Box</Heading>
        <Divider my={4} />
        <Box>
          <Heading size="sl">Access Token Time</Heading>
          <Spacer />
          {`${aT.hours} hours, ${aT.minutes} minutes, ${aT.seconds} seconds`}
          <Divider my={4} />

          <Heading size="sl">Refresh Token Time</Heading>
          {`${rT.hours} hours, ${rT.minutes} minutes, ${rT.seconds} seconds`}
        </Box>
        <Flex
          direction={{ base: "column", md: "row" }}
          mt={4}
          gap={2}
          width={"100%"}
        >
          <Button onClick={context.updateData}>Reload Data from Server</Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default UserProfile;
