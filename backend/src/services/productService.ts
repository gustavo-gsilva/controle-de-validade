import { prisma } from "../../lib/prisma.js";

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
   });
}

export async function getProductById(id: number) {
   return prisma.product.findUnique({
      where: { id },
   });
}

export async function updateProductById(id: number, data: any) {
   return prisma.product.update({
      where: { id },
      data,
   });
}

export async function deleteProductById(id: number) {
   return prisma.product.delete({ where: { id } });
}
