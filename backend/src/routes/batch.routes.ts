import { Router } from "express";

import {
   createBatchController,
   listBatchesByProductController,
   updateBatchesByProductController,
   deleteBatchByIdController,
   getExpiredBatchesController,
   getBatchesExpiringInDaysController,
} from "../controllers/batch.controller.js";

const router = Router();

router.get("/expired", getExpiredBatchesController);
router.get("/expiring", getBatchesExpiringInDaysController);
router.post("/:productId", createBatchController);
router.get("/:productId", listBatchesByProductController);
router.put("/:id", updateBatchesByProductController);
router.delete("/:id", deleteBatchByIdController);

export default router;
