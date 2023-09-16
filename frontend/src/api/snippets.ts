import axios from "axios";
import { BASE_URL, DEFAULT_ORDER, MAX_PER_PAGE } from "../constants/api";
import {
  CreateSnippetReq,
  GetPaginatedSnippets,
  GetSnippetRes,
} from "../types/snippets";
import { SortTypes } from "../constants/sort";

export const getSnippet = async (id: number): Promise<GetSnippetRes> => {
  const response = await axios.get(`${BASE_URL}/snippets/${id}`, {
    params: {},
  });
  return response.data;
};

export const getPaginatedSnippets = async ({
  page,
  limit,
  sortBy,
  order,
}: {
  page: number;
  limit?: number;
  sortBy: SortTypes;
  order?: "ASC" | "DESC";
}): Promise<GetPaginatedSnippets> => {
  limit = limit ?? MAX_PER_PAGE;
  order = order ?? DEFAULT_ORDER;
  const response = await axios.get(`${BASE_URL}/snippets`, {
    params: { page, limit, sortBy, order },
  });
  return response.data;
};

export const createSnippet = async (
  snippetData: CreateSnippetReq
): Promise<GetSnippetRes> => {
  const response = await axios.post(`${BASE_URL}/snippets`, snippetData);
  return response.data;
};
