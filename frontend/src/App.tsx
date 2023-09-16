import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { theme } from "./theme";
const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
