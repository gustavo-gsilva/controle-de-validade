import { prisma } from "../../lib/prisma.js";

import { AppError } from "../errors/AppError.js";

type updateBatchData = {
   batch_code: string;
   entry_date: Date;
   expiration_date: Date;
};

export async function createBatch(data: {
   product_id: number;
   batch_code: string;
   expiration_date: Date;
   entry_date: Date;
}) {
   return prisma.batch.create({ data });
}

export async function listBatchesProductById(productId: number) {
   await ensureProductExists(productId);

   const batches = await prisma.batch.findMany({
      where: { product_id: productId },
      orderBy: { expiration_date: "asc" },
   });

   return batches;
}

export async function updateBatchesProductById(
   id: number,
   data: updateBatchData
) {
   await ensureProductExists(id);

   const batch = await prisma.batch.update({
      where: { id },
      data,
   });

   return batch;
}

// Função que buscar apenas um único ID de produto
export async function ensureProductExists(id: number) {
   const product = await prisma.product.findUnique({
      where: { id },
      select: { id: true },
   });

   if (!product) {
      throw new AppError("Produto não encontrado.", 404);
   }

   return product;
}

// Função de soft delete
export async function deleteBatchById(id: number) {
   const batch = await ensureBatchExists(id);

   if (batch.deleted_at !== null) {
      throw new AppError("Lote já está excluído.");
   }

   return prisma.batch.update({
      where: { id },
      data: {
         deleted_at: new Date(),
      },
   });
}

// Função que buscar apenas um único ID de lote
export async function ensureBatchExists(id: number) {
   const batch = await prisma.batch.findUnique({
      where: { id },
      select: { id: true, deleted_at: true },
   });

   if (!batch) {
      throw new AppError("Lote não encontrado.", 404);
   }

   return batch;
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
