import axios from "axios";

const API_BASE_URL = "https://rickandmortyapi.com/api/";
const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchData = async (endpoint, queryParams = {}) => {
  try {
    const response = await apiService.get(endpoint, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error(`API request error for ${endpoint} endpoint:`, error.message);
    throw error;
  }
};
