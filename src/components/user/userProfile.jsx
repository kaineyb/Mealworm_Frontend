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
import { en } from "../../services/textService";
import { setTitle } from "./../../snippets/setTitle";

function UserProfile(props) {
  const [user, setUser] = useState({});
  const context = useContext(DataContext);

  const { access, refresh } = jwtService.getJwtTokens();

  const rT = jwtService.tokenTimeOut(refresh);
  const aT = jwtService.tokenTimeOut(access);

  // console.log("accessTime", aT);
  // console.log("refreshTime", rT);

  useEffect(() => {
    setTitle("User Profile");
  }, []);

  useEffect(() => {
    async function getUser() {
      const userInfo = await auth.getCurrentUserObj();
      setUser(userInfo);
    }
    getUser();
  }, []);

  const boxProps = { mb: 5, p: 5, borderWidth: "1px", borderTopWidth: "0" };

  return (
    <Box>
      <Heading as="h1">{en.user.userProfile}</Heading>
      <Divider my={4} />
      <Heading as="h3" size="sm" variant="sectionHeader">
        {en.user.userDetails}
      </Heading>
      <Box {...boxProps}>
        <Flex direction={{ base: "column", md: "row" }} gap={2}>
          <Box>
            <Text>
              {en.user.userName} {user.username}
            </Text>
            <Text>
              {en.user.email} {user.email}
            </Text>
          </Box>
          <Spacer />

          <Link to="/logout">
            <Button width="100%">{en.user.logOut}</Button>
          </Link>
        </Flex>
      </Box>

      <Heading as="h3" size="sm" variant="sectionHeader">
        {en.user.secretAdminBox}
      </Heading>
      <Box {...boxProps}>
        <Box>
          <Heading size="sl">
            {en.user.userID} {user.id}
          </Heading>
          <Divider my={4} />
          <Heading size="sl">{en.user.accessTokenTime}</Heading>
          {`${aT.hours} hours, ${aT.minutes} minutes, ${aT.seconds} seconds`}
          <Divider my={4} />

          <Heading size="sl">{en.user.refreshTokenTime}</Heading>
          {`${rT.hours} hours, ${rT.minutes} minutes, ${rT.seconds} seconds`}
        </Box>
        <Flex
          direction={{ base: "column", md: "row" }}
          mt={4}
          gap={2}
          width={"100%"}
        >
          <Button onClick={context.updateData}>
            {en.user.reloadDataFromServer}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default UserProfile;
