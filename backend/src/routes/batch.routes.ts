import { Router } from "express";

import {
   createBatchController,
   listBatchesByProductController,
   updateBatchesByProductController,
   deleteBatchByIdController
} from "../controllers/batch.controller.js";

const router = Router();

router.post("/:productId", createBatchController);
router.get("/:productId", listBatchesByProductController);
router.put("/:id", updateBatchesByProductController);
router.delete("/:id", deleteBatchByIdController);

export default router;
