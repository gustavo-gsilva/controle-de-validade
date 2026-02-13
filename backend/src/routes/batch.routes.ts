import { Router } from "express";

import { createBatchController } from "../controllers/batch.controller.js";

const router = Router();

router.post("/:productId", createBatchController);

export default router;
