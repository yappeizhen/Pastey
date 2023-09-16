import { Box, Flex, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetSnippetRes } from "../types/snippets";
import { getSnippet } from "../api/snippets";
import { redirect } from "react-router-dom";
import { LandingSection } from "../components/LandingSection";
import { AppHeader } from "../components/AppHeader";

const SnippetPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snippet, setSnippet] = useState<GetSnippetRes | undefined>();
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getSnippet(+id)
      .then((snip) => {
        setSnippet(snip);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <Flex h="100vh" justifyContent="center" alignItems="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (!id || (!isLoading && !snippet)) redirect("/");
  const url = `${window.location.origin}/snip/${snippet?.id}`;

  return (
    <>
      <AppHeader />
      <LandingSection w="full">
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={{ base: "1.5rem", md: "3.125rem", lg: "7.5rem" }}
          w="100%"
        >
          <Flex flexDir="column" flex={1} gap={4}>
            <Text
              textAlign="center"
              textStyle="responsive-heading.heavy"
              mb={2}
            >
              {snippet?.title}
            </Text>
            <Box border="1px" w="100%" borderColor="grey" p={4}>
              <Text textStyle="body-1">
                <pre>{snippet?.content}</pre>
              </Text>
            </Box>
          </Flex>
          <Flex flexDir="column" flex={1} gap={4}>
            <Text textStyle="subhead-3">Number of views: {snippet?.views}</Text>
            <Text textStyle="subhead-3">
              Min to expiry: {snippet?.minsToExpiry}
            </Text>
            <Text textStyle="subhead-3">
              Date created:{" "}
              {snippet && new Date(snippet.dateCreated).toLocaleString()}
            </Text>
            <Text textStyle="subhead-3">
              URL:{" "}
              <a href={url} target="_">
                {url}
              </a>
            </Text>
          </Flex>
        </Stack>
      </LandingSection>
    </>
  );
};
export default SnippetPage;
