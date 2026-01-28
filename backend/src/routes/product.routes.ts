import { Router } from "express";

import {
   createProduct,
   listProducts,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/", createProduct);
router.get("/", listProducts);

export default router;
