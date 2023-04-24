import axios from "axios";

const api = axios.create({
  baseURL: 'https://apps.aparecida.go.gov.br/backend-gce'
});

export default api;