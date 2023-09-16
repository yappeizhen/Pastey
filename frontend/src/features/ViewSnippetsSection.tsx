import { Card, Text, VStack } from "@chakra-ui/react";

const snippets = [];
const ViewSnippetsSection = () => {
  return (
    <VStack w="full" h="100vh" bg="slate.50" p={100} gap={12}>
      <Text textStyle="h1">All Snippets</Text>
      {snippets.length > 0 ? (
        <Card p={16} w="full" borderRadius={15}></Card>
      ) : (
        <Text>Create a snippet to see them appear here!</Text>
      )}
    </VStack>
  );
};
export default ViewSnippetsSection;
