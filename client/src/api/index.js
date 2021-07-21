import axios from "axios";

const baseURL = "https://swasthyasamriddhi.com/api/v1";

const api = axios.create({
  baseURL,
});

export default api;
