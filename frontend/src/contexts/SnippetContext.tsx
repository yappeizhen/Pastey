import { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/api";

type CreateSnippetReq = {
  title: string;
  minsToExpiry?: number;
  content: string;
};
type GetSnippetRes = {
  id: number;
  title: string;
  minsToExpiry?: number;
  content: string;
};
type SnippetContextProps = {
  snippets: GetSnippetRes[];
  getSnippets: () => Promise<void>;
  addSnippet: (data: CreateSnippetReq) => Promise<void>;
};

// Create the context
const SnippetContext = createContext<SnippetContextProps | undefined>(
  undefined
);

// Create a provider component
export const SnippetProvider = ({ children }: { children: ReactNode }) => {
  const [snippets, setSnippets] = useState<GetSnippetRes[]>([]);

  const getSnippets = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/snippets`); // replace with your API endpoint
      setSnippets(response.data);
    } catch (error) {
      console.error("Couldn't load snippets:", error);
    }
  };

  const addSnippet = async (snippetData: CreateSnippetReq) => {
    try {
      const response = await axios.post(`${BASE_URL}/snippets`, snippetData);
      setSnippets([...snippets, response.data]);
    } catch (error) {
      console.error("Couldn't add snippet:", error);
    }
  };

  // Provide the state and functions to children
  return (
    <SnippetContext.Provider value={{ snippets, getSnippets, addSnippet }}>
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
