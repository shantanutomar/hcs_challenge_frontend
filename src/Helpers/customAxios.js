import axios from "axios";

const customAxios = axios.create();

customAxios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default customAxios;
