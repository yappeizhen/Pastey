import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import SnippetPage from "./pages/SnippetPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/snip/:id" element={<SnippetPage />} />
    </Routes>
  );
};

export default App;
