import { createContext, useState, useContext, ReactNode } from "react";
import { CreateSnippetReq, GetSnippetRes } from "../types/snippets";
import { createSnippet, getSnippets } from "../api/snippets";

type SnippetContextProps = {
  snippets: GetSnippetRes[];
  loadSnippets: () => Promise<void>;
  addSnippet: (data: CreateSnippetReq) => Promise<GetSnippetRes>;
};

// Create the context
const SnippetContext = createContext<SnippetContextProps | undefined>(
  undefined
);

// Create a provider component
export const SnippetProvider = ({ children }: { children: ReactNode }) => {
  const [snippets, setSnippets] = useState<GetSnippetRes[]>([]);

  const loadSnippets = async () => {
    const snippets = await getSnippets();
    setSnippets(snippets);
  };

  const addSnippet = async (snippetData: CreateSnippetReq) => {
    const newSnip = await createSnippet(snippetData);
    setSnippets([...snippets, newSnip]);
    return newSnip;
  };

  // Provide the state and functions to children
  return (
    <SnippetContext.Provider value={{ snippets, loadSnippets, addSnippet }}>
      {children}
    </SnippetContext.Provider>
  );
};

// Custom hook to use the SnippetContext
export const useSnippetContext = () => {
  const context = useContext(SnippetContext);
  if (!context) {
    throw new Error("useSnippets must be used within a SnippetProvider");
  }
  return context;
};
