import { Router } from "express";

import {
   createProductController,
   listProductController,
   getProductIdController,
   updateProductIdController,
   inactivateProductIdController,
   reactivateProductIdController,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/", createProductController);
router.get("/", listProductController);
router.get("/:id", getProductIdController);
router.put("/:id", updateProductIdController);
router.delete("/:id", inactivateProductIdController);
router.patch("/:id/restore", reactivateProductIdController);

export default router;
