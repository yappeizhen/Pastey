import {
  Table,
  TableContainer,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSnippetContext } from "../contexts/SnippetContext";

const ViewSnippetsSection = () => {
  const { snippets, loadSnippets } = useSnippetContext();

  useEffect(() => {
    loadSnippets(); // initialise snippets
  }, [loadSnippets]);

  return (
    <VStack w="full" minH="100vh" bg="slate.50" p={100} gap={12}>
      <Text textStyle="h1">All Snippets</Text>
      {snippets.length > 0 ? (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Content</Th>
                <Th>URL</Th>
                <Th>Expiry (min)</Th>
                <Th>Date Created</Th>
              </Tr>
              {snippets.map((snip) => {
                const url = `${window.location}snip/${snip.id}`;
                return (
                  <Tr key={snip.id}>
                    <Th maxW="300px" overflowX="clip">
                      {snip.title}
                    </Th>
                    <Th maxW="300px" overflowX="clip">
                      {snip.content}
                    </Th>
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
            </Thead>
          </Table>
        </TableContainer>
      ) : (
        <Text>Create a snippet to see them appear here!</Text>
      )}
    </VStack>
  );
};
export default ViewSnippetsSection;
