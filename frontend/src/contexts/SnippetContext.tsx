import { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/api";

export type CreateSnippetReq = {
  title: string;
  minsToExpiry: number;
  content: string;
};
export type GetSnippetRes = {
  id: number;
  title: string;
  minsToExpiry: number;
  content: string;
  dateCreated: Date;
};
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
    const response = await axios.get(`${BASE_URL}/snippets`); // replace with your API endpoint
    setSnippets(response.data);
  };

  const addSnippet = async (snippetData: CreateSnippetReq) => {
    const response = await axios.post(`${BASE_URL}/snippets`, snippetData);
    setSnippets([...snippets, response.data]);
    return response.data;
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
