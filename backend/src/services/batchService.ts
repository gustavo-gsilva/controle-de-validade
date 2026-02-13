import { prisma } from "../../lib/prisma.js";

export async function createBatch(data: {
   product_id: number;
   batch_code: string;
   expiration_date: Date;
   entry_date: Date;
   status: string;
}) {
   return prisma.batch.create({ data });
}