import axios from 'axios'
import { RapidAPIKey, RapidAPIHost } from "../store/constants"

const fetchData = (url, method = 'GET', options) => {
  const requestOption = {
    method: method,
    url: url,
    ...options,
    headers: {
      'X-RapidAPI-Key': RapidAPIKey,
      'X-RapidAPI-Host': RapidAPIHost
    }
  }
  console.log()

  return axios.request(requestOption)
    .then((response) => response.data);
};

export default fetchData;