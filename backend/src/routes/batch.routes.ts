import { Router } from "express";

import {
   createBatchController,
   listBatchesByProductController,
} from "../controllers/batch.controller.js";

const router = Router();

router.post("/:productId", createBatchController);
router.get("/:productId", listBatchesByProductController);

export default router;
