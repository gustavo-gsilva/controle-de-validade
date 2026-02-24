import { Router } from "express";

import {
   createBatchController,
   listBatchesByProductController,
   updateBatchesByProductController,
} from "../controllers/batch.controller.js";

const router = Router();

router.post("/:productId", createBatchController);
router.get("/:productId", listBatchesByProductController);
router.put("/:id", updateBatchesByProductController);

export default router;
