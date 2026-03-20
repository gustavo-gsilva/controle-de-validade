import { api } from "./api";
import type { ProductsResponse } from "../types/productTypes";

// Função que retorna uma promise baseada no type ProductResponse
export async function getProducts(): Promise<ProductsResponse> {
   const response = await api.get("/products?page=1&limit=4");

   return response.data;
}
