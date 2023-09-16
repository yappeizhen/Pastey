import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
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
import { useState } from "react";
import { useSnippetContext } from "../contexts/SnippetContext";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [minsToExpiry, setMinsToExpiry] = useState<number>();
  const [snippetContent, setPasty] = useState<string>("");
  const { addSnippet } = useSnippetContext();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await addSnippet({ title, minsToExpiry, content: snippetContent });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

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
            <FormControl>
              <HStack
                alignItems="center"
                justifyContent="space-between"
                gap={4}
              >
                <FormLabel m={0}>Title</FormLabel>
                <Input
                  placeholder="A cool name"
                  w="85%"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </HStack>
            </FormControl>

            <HStack alignItems="center" justifyContent="space-between" gap={4}>
              <FormLabel m={0}>Expiry</FormLabel>
              <NumberInput w="85%" min={0} keepWithinRange>
                <NumberInputField
                  placeholder="# of minutes until this expires"
                  value={minsToExpiry}
                  onChange={(e) => {
                    setMinsToExpiry(+e.target.value);
                  }}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
            <Textarea
              h={160}
              value={snippetContent}
              onChange={(e) => {
                setPasty(e.target.value);
              }}
              placeholder="Paste snippet..."
            />
            <Button
              isLoading={isLoading}
              isDisabled={!title || !snippetContent}
              onClick={onSubmit}
            >
              Get URL
            </Button>
          </Flex>
          <Flex
            display={{ md: "flex", base: "none" }}
            flex={1}
            aria-hidden
            justify="right"
          >
            <Image src={landingVector} alt="pastebin hero" width={"100%"} />
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
