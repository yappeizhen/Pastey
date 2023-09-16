import axios from "axios";
import { BASE_URL } from "../constants/api";
import { CreateSnippetReq, GetSnippetRes } from "../types/snippets";

export const getSnippets = async (): Promise<GetSnippetRes[]> => {
  const response = await axios.get(`${BASE_URL}/snippets`);
  return response.data;
};

export const createSnippet = async (
  snippetData: CreateSnippetReq
): Promise<GetSnippetRes> => {
  const response = await axios.post(`${BASE_URL}/snippets`, snippetData);
  return response.data;
};
