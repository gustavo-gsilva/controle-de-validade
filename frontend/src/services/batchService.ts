import { api } from "./api";

export async function getBatchesValid() {
   const response = await api.get("/batches/valid");

   return response.data;
}
