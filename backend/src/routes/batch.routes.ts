import { Router } from "express";

import {
   createBatchController,
   listBatchesByProductController,
   updateBatchesByProductController,
   deleteBatchByIdController,
   getExpiredBatchesController,
} from "../controllers/batch.controller.js";

const router = Router();

router.get("/expired", getExpiredBatchesController);
router.post("/:productId", createBatchController);
router.get("/:productId", listBatchesByProductController);
router.put("/:id", updateBatchesByProductController);
router.delete("/:id", deleteBatchByIdController);

export default router;
