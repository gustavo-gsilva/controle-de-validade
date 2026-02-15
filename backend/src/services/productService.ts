import { prisma } from "../../lib/prisma.js";

import { AppError } from "../errors/AppError.js";

export async function findProductByNameAndBrand(
   name: string,
   brand: string,
   category: string
) {
   return prisma.product.findFirst({
      where: {
         name: { equals: name, mode: "insensitive" },
         brand: { equals: brand, mode: "insensitive" },
         category: { equals: category, mode: "insensitive" },
      },
   });
}

export async function findProductByBatchCode(
   product_id: number,
   batch_code: string
) {
   return prisma.batch.findFirst({
      where: {
         product_id,
         batch_code: { equals: batch_code, mode: "insensitive" },
      },
   });
}

export async function createProduct(data: {
   name: string;
   brand: string;
   category: string;
   code?: string;
}) {
   return prisma.product.create({ data });
}

export async function listProducts() {
   return prisma.product.findMany({
      orderBy: { name: "asc" },
      where: {
         deleted_at: null,
      },
   });
}

export async function getProductById(id: number) {
   return prisma.product.findUnique({
      where: {
         id,
      },
   });
}

export async function updateProductById(id: number, data: any) {
   return prisma.product.update({
      where: { id },
      data,
   });
}

export async function deleteProductById(id: number) {
   const product = await getProductById(id);

   if (!product) {
      throw new AppError("Produto não encontrado.", 404);
   }

   if (product.deleted_at !== null) {
      throw new AppError("Produto já está inativo.");
   }

   const activeBatches = await prisma.batch.count({
      where: {
         product_id: id,
         status: "valid",
      },
   });

   if (activeBatches > 0) {
      throw new AppError(
         "Não é possível excluir um produto que possui lotes ativos vinculados."
      );
   }

   return prisma.product.update({
      where: { id },
      data: {
         deleted_at: new Date(),
      },
   });
}
