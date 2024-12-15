import axios from "axios";

const request = axios.create({
  baseURL: "https://pc.repid.uz/api/v1",
});

export default request;
