import axios from "axios";

const API = axios.create({
  baseURL: "https://blogplatform-eprb.onrender.com/api",
});

export default API;
