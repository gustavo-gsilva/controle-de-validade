import { api } from "./api";
import type { Batch } from "../types/batchTypes";

export async function getBatches(): Promise<Batch[]> {
   const response = await api.get("/batches");

   return response.data;
}

export async function getBatchesValid(): Promise<Batch[]> {
   const response = await api.get("/batches/valid");

   return response.data;
}

export async function getBatchesExpiringInDays(): Promise<Batch[]> {
   const response = await api.get("/batches/expiring");

   return response.data;
}

export async function getBatchesExpired(): Promise<Batch[]> {
   const response = await api.get("/batches/expired");

   return response.data.data;
}
