import axios from "axios";
import { AxiosError } from "axios";

const API_BASE_URL = "https://rickandmortyapi.com/api/";
const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchData = async (endpoint: string, queryParams = {}) => {
  try {
    const response = await apiService.get(endpoint, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error(
      `API request error for ${endpoint} endpoint:`,
      (error as AxiosError).message
    );
    throw error;
  }
};
