import type { Request, Response } from "express";

import serializeBigInt from "../utils/serializeBigInt.js";
import { AppError } from "../errors/AppError.js";

import {
   validateProduct,
   validateProductId,
   validateUpdateProduct,
} from "../validators/productValidator.js";

import {
   createProduct,
   findProductByNameAndBrand,
   listProducts,
   getProductById,
   updateProductById,
   inactivateProductById,
   reactivateProductById,
} from "../services/productService.js";

export async function createProductController(req: Request, res: Response) {
   try {
      const data = validateProduct(req.body);

      const existing = await findProductByNameAndBrand(
         data.name,
         data.brand,
         data.category
      );

      if (existing)
         return res.status(409).json({ error: "Esse produto já existe." });

      await createProduct({
         ...data,
         code: req.body.code,
      });

      return res
         .status(201)
         .json({ message: "Produto cadastrado com sucesso." });
   } catch (error) {
      if (error instanceof AppError) {
         return res.status(error.statusCode).json({ error: error.message });
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

      if (products.length === 0)
         return res
            .status(200)
            .json({ data: [], message: "Nenhum produto cadastrado." });

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
      if (error instanceof AppError) {
         return res.status(error.statusCode).json({ error: error.message });
      }

      console.error(error);
      return res
         .status(500)
         .json({ error: "Houve um erro ao buscar o produto pelo ID." });
   }
}

export async function updateProductIdController(req: Request, res: Response) {
   try {
      const data = validateUpdateProduct(req.body);
      const id = validateProductId(req.params.id);
      const existingProduct = await getProductById(id);

      if (!existingProduct)
         return res.status(404).json({ error: "Esse produto não existe." });

      await updateProductById(id, data);

      return res
         .status(200)
         .json({ message: "Produto atualizado com sucesso." });
   } catch (error) {
      if (error instanceof AppError) {
         return res.status(error.statusCode).json({ error: error.message });
      }

      console.error(error);
      res.status(500).json({
         error: "Houve um erro ao atualizar o produto pelo ID.",
      });
   }
}

export async function inactivateProductIdController(
   req: Request,
   res: Response
) {
   try {
      const id = validateProductId(req.params.id);

      await inactivateProductById(id);

      return res.status(200).json({ message: "Produto deletado com sucesso." });
   } catch (error) {
      if (error instanceof AppError) {
         return res.status(error.statusCode).json({ error: error.message });
      }

      console.error(error);
      return res
         .status(500)
         .json({ error: "Houve um erro ao deletar o produto pelo ID." });
   }
}

export async function reactivateProductIdController(req: Request, res: Response) {
   try {
      const id = validateProductId(req.params.id);

      await reactivateProductById(id);

      return res
         .status(200)
         .json({ message: "Produto reativado com sucesso." });
   } catch (error) {
      if (error instanceof AppError) {
         return res.status(error.statusCode).json({ error: error.message });
      }

      console.error(error);
      return res
         .status(500)
         .json({ error: "Houve um erro ao reativar o produto pelo ID." });
   }
}
