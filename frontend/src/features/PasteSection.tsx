import {
  Button,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  Textarea,
  VStack,
  keyframes,
} from "@chakra-ui/react";
import { LandingSection } from "../components/LandingSection";
import landingVector from "../assets/landing-vector.png";
import { FaArrowDown } from "react-icons/fa";
import { AppHeader } from "../components/AppHeader";

const moveDown = keyframes({
  "0%": {
    transform: "translate(0, 0px)",
  },
  "50%": {
    transform: "translate(0, -6px)",
  },
  "75%": {
    transform: "translate(0, -6px)",
  },
  "100%": {
    transform: "translate(0, 0px)",
  },
});

const PasteSection = () => {
  return (
    <VStack w="full" h="100vh">
      <AppHeader />
      <LandingSection>
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={{ base: "1.5rem", md: "3.125rem", lg: "7.5rem" }}
        >
          <Flex flexDir="column" flex={1} gap={4}>
            <HStack gap={4} justifyContent={"center"}>
              <Image
                display={{ md: "none", base: "flex" }}
                src={landingVector}
                alt="pastebin hero"
                height={16}
              />
              <Text
                textStyle={{
                  base: "h4",
                  md: "responsive-display.heavy",
                }}
                color="base.content.strong"
              >
                A simple tool to paste and share text snippets
              </Text>
            </HStack>
            <Textarea h={200} placeholder="Paste snippet..." />
            <Button>Get URL</Button>
          </Flex>
          <Flex
            display={{ md: "flex", base: "none" }}
            flex={1}
            aria-hidden
            justify="right"
          >
            <Image src={landingVector} alt="pastebin hero" width={480} />
          </Flex>
        </Stack>
      </LandingSection>
      <Flex w="full" h="100%" justifyContent="center" position="relative">
        <Flex
          w="full"
          justifyContent="center"
          opacity={0.6}
          animation={`${moveDown} 1.5s infinite linear`}
          position={"absolute"}
          bottom={8}
        >
          <FaArrowDown size={30} />
        </Flex>
      </Flex>
    </VStack>
  );
};
export default PasteSection;
