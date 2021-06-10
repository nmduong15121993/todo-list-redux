import axiosLibs from "axios";

const axios = axiosLibs.create({
  baseURL: "http://localhost:8000/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
});
export { axios };
