import LandingPage from "./pages/LandingPage";
import { SnippetProvider } from "./contexts/SnippetContext";
import { Route, Routes } from "react-router-dom";
import SnippetPage from "./pages/SnippetPage";
const App = () => {
  return (
    <SnippetProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/snip/:id" element={<SnippetPage />} />
      </Routes>
    </SnippetProvider>
  );
};

export default App;
