import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Icon, useColorMode } from "@chakra-ui/react";

function ToggleColour() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button onClick={toggleColorMode} size="sm">
        {colorMode === "light" ? <Icon as={MoonIcon} /> : <Icon as={SunIcon} />}
      </Button>
    </header>
  );
}
export default ToggleColour;
