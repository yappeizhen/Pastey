import { Flex, Text } from "@chakra-ui/react";
import { AppGrid } from "./AppGrid";

export const AppPublicHeader = (): JSX.Element => {
  return (
    <AppGrid w="full" px="1.5rem" bg="base.canvas.brand-subtle">
      <Flex
        gridColumn={{ base: "1 / -1", md: "2 / 12" }}
        justify="space-between"
        align="center"
        py={{ base: "0.625rem", md: "4.5rem" }}
      >
        <Text textStyle="responsive-heading.heavy">Pastebin Tool</Text>
      </Flex>
    </AppGrid>
  );
};
