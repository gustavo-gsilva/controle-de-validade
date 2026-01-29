import { Router } from "express";

import {
   createProduct,
   listProducts,
   getProductId,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/", createProduct);
router.get("/", listProducts);
router.get("/:id", getProductId);

export default router;
