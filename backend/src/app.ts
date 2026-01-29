import productRoutes from "./routes/product.routes.js";

import express from "express";

const app = express();
// middleware para JSON
app.use(express.json());

app.use("/products", productRoutes);
app.use("/products", productRoutes);

export default app;
