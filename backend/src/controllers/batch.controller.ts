import type { Request, Response } from "express";

import {
   getProductById,
   findProductByBatchCode,
} from "../services/productService.js";

import { validateProductId } from "../validators/productValidator.js";
import { createBatch } from "../services/batchService.js";

export async function createBatchController(req: Request, res: Response) {
   try {
      const { batch_code, expiration_date, entry_date, status } = req.body;
      const productId = validateProductId(Number(req.params.productId));
      const product = await getProductById(productId);
      const existingBatch = await findProductByBatchCode(productId, batch_code);

      if (!product)
         return res.status(400).json({ error: "Esse produto não existe." });

      if (existingBatch)
         return res
            .status(400)
            .json({
               error: "Já existe um lote com esse código para este produto.",
            });

      await createBatch({
         product_id: productId,
         batch_code,
         expiration_date: new Date(expiration_date),
         entry_date: new Date(entry_date),
         status,
      });

      return res.status(201).json({ message: "Lote cadastrado com sucesso." });
   } catch (error) {
      if (
         error instanceof Error &&
         error.message === "O ID informado é invalido"
      ) {
         return res.status(400).json({ error: error.message });
      }

      console.error(error);
      return res
         .status(500)
         .json({ error: "Houve um erro ao cadastrar o lote do produto." });
   }
}
