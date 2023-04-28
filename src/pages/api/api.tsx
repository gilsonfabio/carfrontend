import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3333'
  //baseURL: 'https://apps.aparecida.go.gov.br/backend-gce'
});

export default api;