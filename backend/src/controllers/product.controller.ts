import { prisma } from "../../lib/prisma.js";
import type { Request, Response } from "express";

import serializeBigInt from "../utils/serializeBigInt.js";

export async function createProduct(req: Request, res: Response) {
   const { name, brand, category, code } = req.body;

   if (!name || !brand || !category) {
      return res
         .status(400)
         .json({ error: "Campos obrigatórios não informados." });
   }

   // Impede cadastrar um produto com espaços no inicío ou final da string EX: "Sabão "
   const normalizedName = name.trim();
   const normalizedBrand = brand.trim();

   const existingProduct = await prisma.product.findFirst({
      where: {
         name: { equals: normalizedName, mode: "insensitive" },
         brand: { equals: normalizedBrand, mode: "insensitive" },
      },
   });

   if (existingProduct)
      return res.status(400).json({ error: "Esse produto já existe." });

   try {
      const product = await prisma.product.create({
         data: {
            name,
            brand,
            category,
            code,
         },
      });

      return res.status(201).json(serializeBigInt(product));
   } catch (error) {
      console.error(error);
      return res.status(500).json({
         error: "Houve um erro ao cadastrar o produto.",
      });
   }
}

export async function listProducts(_: Request, res: Response) {
   try {
      const getProducts = await prisma.product.findMany({
         orderBy: {
            name: "asc",
         },
      });

      res.status(200).json(serializeBigInt(getProducts));
   } catch (error) {
      console.error(error);
      res.status(500).json({
         error: "Houve um erro inesperado ao buscar a lista de produtos.",
      });
   }
}
