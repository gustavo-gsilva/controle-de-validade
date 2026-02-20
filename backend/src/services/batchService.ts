import { prisma } from "../../lib/prisma.js";

import { AppError } from "../errors/AppError.js";

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
