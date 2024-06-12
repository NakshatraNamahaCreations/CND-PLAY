import axios from "axios";

const http = axios.create({
  baseURL: "https://api.cndplay.com/api",
});
// https://api.cndplay.com/api

export default http;
