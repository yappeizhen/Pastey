import { VStack } from "@chakra-ui/react";
import PasteSection from "../features/PasteSection";
import ViewSnippetsSection from "../features/ViewSnippetsSection";

const LandingPage = () => {
  return (
    <VStack>
      <PasteSection />
      <ViewSnippetsSection />
    </VStack>
  );
};
export default LandingPage;
