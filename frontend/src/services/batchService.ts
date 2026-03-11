import { api } from "./api";

export async function getBatchesValid() {
   const response = await api.get("/batches");

   return response.data;
}
