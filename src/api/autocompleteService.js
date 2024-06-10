import axios from "axios";

export const fetchSuggestions = async (input) => {
  const response = await axios.get(`Your API Endpoint?input=${input}`);
  return response.data; //given API URL to get data
};
