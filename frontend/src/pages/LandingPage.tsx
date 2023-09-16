import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Table,
  TableContainer,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
  keyframes,
} from "@chakra-ui/react";
import { LandingSection } from "../components/LandingSection";
import landingVector from "../assets/landing-vector.png";
import { FaArrowDown, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { AppHeader } from "../components/AppHeader";
import { useEffect, useState } from "react";
import { GetSnippetRes } from "../types/snippets";
import SnippetModal from "../features/SnippetModal";
import { createSnippet, getPaginatedSnippets } from "../api/snippets";
import { SortTypes } from "../constants/sort";
import { MAX_PER_PAGE } from "../constants/api";

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

const LandingPage = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>();
  const [minsToExpiry, setMinsToExpiry] = useState<number | undefined>();
  const [snippetContent, setSnippetContent] = useState<string | undefined>();
  const [newSnippet, setSnippet] = useState<GetSnippetRes | undefined>();
  const [snippetList, setSnippetList] = useState<GetSnippetRes[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [snippetPage, setSnippetPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortTypes>(SortTypes.dateCreated);

  useEffect(() => {
    setIsFetching(true);
    getPaginatedSnippets({ page: snippetPage, sortBy })
      .then((res) => {
        const { snippets, totalNum } = res;
        setSnippetList(snippets);
        setTotalPages(Math.floor(totalNum / MAX_PER_PAGE));
      })
      .catch((err) => console.error(err))
      .finally(() => setIsFetching(false));
  }, [snippetPage, sortBy, newSnippet]);

  const onSubmit = async () => {
    setIsLoading(true);
    if (title && snippetContent && minsToExpiry) {
      try {
        const newSnippet = await createSnippet({
          title,
          minsToExpiry,
          content: snippetContent,
        });
        setSnippet(newSnippet);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <VStack w="full" h="100vh">
        {newSnippet && (
          <SnippetModal
            isOpen={!!newSnippet}
            onClose={() => {
              setTitle("");
              setMinsToExpiry(0);
              setSnippetContent("");
              setSnippet(undefined);
            }}
            snippet={newSnippet}
          />
        )}
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

              <HStack
                alignItems="center"
                justifyContent="space-between"
                gap={4}
              >
                <FormLabel m={0}>Expiry</FormLabel>
                <NumberInput
                  w="85%"
                  min={0}
                  value={minsToExpiry}
                  keepWithinRange
                >
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
                h={148}
                value={snippetContent}
                onChange={(e) => {
                  setSnippetContent(e.target.value);
                }}
                placeholder="Paste snippet..."
              />
              <Button
                isLoading={isLoading}
                isDisabled={!title || !snippetContent || !minsToExpiry}
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
      <VStack
        w="full"
        minH="100vh"
        bg="slate.50"
        p={{ base: 8, sm: 20 }}
        gap={4}
        justifyContent="center"
        alignItems="center"
      >
        <Text textStyle="h1" textAlign="center">
          All Snippets
        </Text>
        {snippetList.length > 0 ? (
          <VStack w="full">
            <FormControl>
              <HStack
                justifyContent={{ base: "center", sm: "flex-end" }}
                alignItems={"center"}
                mb={4}
              >
                <FormLabel m={0}>Sort by: </FormLabel>
                <Select
                  defaultValue={SortTypes.dateCreated}
                  variant="outline"
                  onChange={(e) => {
                    setSortBy(e.target.value as SortTypes);
                  }}
                  w={200}
                >
                  <option value={SortTypes.dateCreated}>Date Created</option>
                  <option value={SortTypes.views}>Views</option>
                </Select>
              </HStack>
            </FormControl>
            <TableContainer
              h={480}
              w="full"
              overflowY="scroll"
              overflowX="scroll"
            >
              <Table>
                <Thead>
                  <Tr>
                    <Th>No.</Th>
                    <Th>Title</Th>
                    <Th>Content</Th>
                    <Th>Views</Th>
                    <Th>URL</Th>
                    <Th>Expiry (min)</Th>
                    <Th>Date Created</Th>
                  </Tr>
                </Thead>
                {snippetList.map((snip, idx) => {
                  const url = `${window.location.origin}/snip/${snip.id}`;
                  return (
                    <Tr key={snip.id}>
                      <Th maxW="300px" overflowX="clip">
                        {idx + 1}
                      </Th>
                      <Th maxW="300px" overflowX="clip">
                        {snip.title}
                      </Th>
                      <Th maxW="300px" overflowX="clip">
                        {snip.content}
                      </Th>
                      <Th>{snip.views}</Th>
                      <Th maxW="300px" overflowX="clip">
                        <a href={url} target="_">
                          {url}
                        </a>
                      </Th>
                      <Th maxW="300px" overflowX="clip">
                        {snip.minsToExpiry}
                      </Th>
                      <Th>{new Date(snip.dateCreated).toLocaleString()}</Th>
                    </Tr>
                  );
                })}
              </Table>
            </TableContainer>
            <HStack w="100%" justifyContent="flex-end" zIndex={100} gap={2}>
              {isFetching && <Text>Fetching data...</Text>}
              <IconButton
                aria-label="next page"
                variant="ghost"
                isRound
                icon={<FaAngleLeft />}
                fontSize="16px"
                size="xs"
                opacity="0.7"
                _hover={{
                  opacity: "1",
                }}
                isDisabled={snippetPage <= 1}
                onClick={() => setSnippetPage(snippetPage - 1)}
              />
              <IconButton
                aria-label="next page"
                variant="ghost"
                isRound
                icon={<FaAngleRight />}
                fontSize="16px"
                size="xs"
                opacity="0.7"
                _hover={{
                  opacity: "1",
                }}
                isDisabled={snippetPage > totalPages}
                onClick={() => setSnippetPage(snippetPage + 1)}
              />
            </HStack>
          </VStack>
        ) : (
          <Text>Create a snippet to see them appear here!</Text>
        )}
      </VStack>
    </>
  );
};
export default LandingPage;
