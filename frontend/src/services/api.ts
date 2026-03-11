import axios from "axios";

// Configuração padrão da API
export const api = axios.create({
   baseURL: "http://localhost:3000",
});
