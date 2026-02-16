import { prisma } from "../../lib/prisma.js";

export async function createBatch(data: {
   product_id: number;
   batch_code: string;
   expiration_date: Date;
   entry_date: Date;
}) {
   return prisma.batch.create({ data });
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