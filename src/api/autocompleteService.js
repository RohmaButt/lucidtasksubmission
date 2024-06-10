import axios from "axios";

export const fetchSuggestions = async (input) => {
  const response = await axios.get(`Your API Endpoint?input=${input}`);
  return response.data; // Adapt based on your API response
};
