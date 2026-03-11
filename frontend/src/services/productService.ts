import { api } from "./api";
import type { Product } from "../types/productTypes";

// Função que retorna uma promise baseada no type Product
export async function getProducts(): Promise<Product[]> {
   const response = await api.get("/products");

   return response.data;
}
