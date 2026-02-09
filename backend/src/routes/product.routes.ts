import { Router } from "express";

import {
   createProductController,
   listProductController,
   getProductIdController,
   updateProductIdController,
   deleteProductIdController
} from "../controllers/product.controller.js";

const router = Router();

router.post("/", createProductController);
router.get("/", listProductController);
router.get("/:id", getProductIdController);
router.put("/:id", updateProductIdController);
router.delete("/:id", deleteProductIdController);

export default router;
