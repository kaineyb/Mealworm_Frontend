import { Box, Button, Divider, Heading, Spacer, Text } from "@chakra-ui/react";
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

  function setStores() {
    const array1 = [
      { id: 99990, name: "Boris Johnson" },
      { id: 99991, name: "Kaine Bruce" },
      { id: 99992, name: "Lucy Clarke" },
    ];
    context.setData("stores", array1);
  }

  return (
    <Box>
      <Heading as="h1">User Profile</Heading>
      <Divider my={4} />
      <Box my={5} p={5} borderWidth="1px" borderRadius="lg" position="relative">
        <Heading size="md">User Details</Heading>
        <Divider my={4} />
        <Text>User ID:{user.id}</Text>
        <Text>Username: {user.username}</Text>
        <Text>Email: {user.email}</Text>

        <Button mt={5} position="absolute" bottom="5" right="5">
          <Link to="/logout">Logout</Link>
        </Button>
      </Box>

      <Box my={5} p={4} borderWidth="1px" borderRadius="lg">
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
        <Box mt={4}>
          <Button mr={4} onClick={context.updateData}>
            Reload Data from Server
          </Button>
          <Button onClick={setStores}>Set Stores to Faux Data</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default UserProfile;
