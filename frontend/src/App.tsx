import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { theme } from "./theme";
import { SnippetProvider } from "./contexts/SnippetContext";
const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <SnippetProvider>
          <LandingPage />
        </SnippetProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
