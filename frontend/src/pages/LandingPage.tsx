import {
  Button,
  Flex,
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
import { AppPublicHeader } from "../components/AppHeader";

const moveDown = keyframes({
  "0%": {
    transform: "translate(0, 0px)",
  },
  "50%": {
    transform: "translate(0, -4px)",
  },
  "75%": {
    transform: "translate(0, -4px)",
  },
  "100%": {
    transform: "translate(0, 0px)",
  },
});

const LandingPage = () => {
  return (
    <VStack w="full" h="100vh">
      <AppPublicHeader />
      <LandingSection>
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={{ base: "1.5rem", md: "3.125rem", lg: "7.5rem" }}
        >
          <Flex flexDir="column" flex={1} gap={6}>
            <Flex gap={4}>
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
                A simple tool to paste and share text!
              </Text>
            </Flex>
            <Textarea h={200} />
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
      <Flex
        w="full"
        justifyContent="center"
        opacity={0.6}
        animation={`${moveDown} 1.5s infinite linear`}
      >
        <FaArrowDown size={30} />
      </Flex>
    </VStack>
  );
};
export default LandingPage;
