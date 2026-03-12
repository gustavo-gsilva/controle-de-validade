import { api } from "./api";
import type { Batch } from "../types/batchTypes";

export async function getBatchesValid(): Promise<Batch[]> {
   const response = await api.get("/batches/valid");

   return response.data;
}
