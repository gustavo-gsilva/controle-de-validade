import type { Request, Response } from "express";

import serializeBigInt from "../utils/serializeBigInt.js";

import {
   validateCreateProduct,
   validateProductId,
} from "../validators/productValidator.js";

import {
   createProduct,
   findProductByNameAndBrand,
   listProducts,
   getProductById,
} from "../services/productService.js";

export async function createProductController(req: Request, res: Response) {
   try {
      const data = validateCreateProduct(req.body);

      const existing = await findProductByNameAndBrand(data.name, data.brand);

      if (existing)
         return res.status(409).json({ error: "Esse produto já existe." });

      const product = await createProduct({
         ...data,
         code: req.body.code,
      });

      return res.status(201).json(serializeBigInt(product));
   } catch (error) {
      if (error instanceof Error && error.message === "MISSING_FIELDS") {
         return res
            .status(400)
            .json({ error: "Campos obrigatórios não informados." });
      }

      console.error(error);
      return res
         .status(500)
         .json({ error: "Houve um erro ao cadastrar o produto." });
   }
}

export async function listProductController(_: Request, res: Response) {
   try {
      const products = await listProducts();

      return res.status(200).json(serializeBigInt(products));
   } catch (error) {
      console.error(error);

      return res.status(500).json({
         error: "Houve um erro inesperado ao buscar a lista de produtos.",
      });
   }
}

export async function getProductIdController(req: Request, res: Response) {
   try {
      const id = validateProductId(req.params.id);
      const product = await getProductById(id);

      if (!product)
         return res.status(404).json({ error: "Esse produto não existe." });

      return res.status(200).json(serializeBigInt(product));
   } catch (error) {
      if (error instanceof Error && error.message === "INVALID_ID") {
         return res.status(400).json({ error: "ID inválido." });
      }

      console.error(error);
      return res
         .status(500)
         .json({ error: "Houve um erro ao buscar o produto pelo ID." });
   }
}
