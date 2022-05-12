import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import React from "react";

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? (
        <IconButton icon={<CloseIcon />} />
      ) : (
        <IconButton icon={<HamburgerIcon />} />
      )}
    </Box>
  );
};
export default MenuToggle;
