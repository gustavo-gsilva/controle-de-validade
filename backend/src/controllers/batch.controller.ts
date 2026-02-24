import type { Request, Response } from "express";

import { getProductById } from "../services/productService.js";
import { findProductByBatchCode } from "../services/batchService.js";
import {
   createBatch,
   listBatchesProductById,
   updateBatchesProductById,
} from "../services/batchService.js";

import { validateId } from "../validators/productValidator.js";
import { validateBatchDates } from "../validators/batchValidator.js";
import { AppError } from "../errors/AppError.js";
import serializeBigInt from "../utils/serializeBigInt.js";

export async function createBatchController(req: Request, res: Response) {
   try {
      const { batch_code, expiration_date, entry_date } = req.body;
      const { entryDate, expirationDate } = validateBatchDates(
         entry_date,
         expiration_date
      );

      const productId = validateId(Number(req.params.productId));
      const product = await getProductById(productId);
      const existingBatch = await findProductByBatchCode(productId, batch_code);

      if (!product)
         return res.status(400).json({ error: "Esse produto não existe." });

      if (existingBatch)
         return res.status(400).json({
            error: "Já existe um lote com esse código para este produto.",
         });

      await createBatch({
         product_id: productId,
         batch_code,
         expiration_date: expirationDate,
         entry_date: entryDate,
      });

      return res.status(201).json({ message: "Lote cadastrado com sucesso." });
   } catch (error) {
      if (error instanceof AppError) {
         return res.status(error.statusCode).json({ error: error.message });
      }

      console.error(error);
      return res
         .status(500)
         .json({ error: "Houve um erro ao cadastrar o lote do produto." });
   }
}

export async function listBatchesByProductController(
   req: Request,
   res: Response
) {
   try {
      const productId = validateId(req.params.productId);

      const batches = await listBatchesProductById(productId);

      return res.status(200).json(serializeBigInt(batches));
   } catch (error) {
      if (error instanceof AppError) {
         return res.status(error.statusCode).json({ error: error.message });
      }

      console.error(error);
      return res
         .status(500)
         .json({ error: "Erro ao listar lotes do produto." });
   }
}

export async function updateBatchesByProductController(
   req: Request,
   res: Response
) {
   try {
      const { batch_code, entry_date, expiration_date } = req.body;

      const { entryDate, expirationDate } = validateBatchDates(
         entry_date,
         expiration_date
      );

      const id = validateId(req.params.id);

      await updateBatchesProductById(id, {
         batch_code,
         entry_date: entryDate,
         expiration_date: expirationDate,
      });

      return res.status(200).json({ message: "Lote atualizado com sucesso." });
   } catch (error) {
      if (error instanceof AppError) {
         return res.status(error.statusCode).json({ error: error.message });
      }

      console.error(error);
      return res
         .status(500)
         .json({ error: "Erro ao atualizar as informações do lote." });
   }
}
