import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>Heyyy</BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
