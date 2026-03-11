import productRoutes from "./routes/product.routes.js";
import batchRoutes from "./routes/batch.routes.js";

import express from "express";
import cors from "cors";

const app = express();

app.use(
   cors({
      origin: "http://localhost:5173",
   })
);

// middleware para JSON
app.use(express.json());

app.use("/products", productRoutes);
app.use("/batches", batchRoutes);

export default app;
