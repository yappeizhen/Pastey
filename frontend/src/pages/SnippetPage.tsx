import { VStack } from "@chakra-ui/react";
import PasteSection from "../features/PasteSection";
import ViewSnippetsSection from "../features/ViewSnippetsSection";
import { useParams } from "react-router-dom";

const SnippetPage = () => {
  const { id } = useParams();

  return (
    <VStack>
      <PasteSection />
      <ViewSnippetsSection />
    </VStack>
  );
};
export default SnippetPage;
