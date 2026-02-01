import { Router } from "express";

import {
   createProductController,
   listProductController,
   getProductIdController
} from "../controllers/product.controller.js";

const router = Router();

router.post("/", createProductController);
router.get("/", listProductController);
router.get("/:id", getProductIdController);

export default router;
