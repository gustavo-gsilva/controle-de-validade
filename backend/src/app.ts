import router from "./routes/product.routes.js";

import express from "express";

const app = express();
// middleware para JSON
app.use(express.json());

app.use("/products", router);

export default app;
