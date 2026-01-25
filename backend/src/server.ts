import express from "express";
import { prisma } from "../lib/prisma.js";

const port = 3000;
const app = express();

app.get("/teste", async (req, res) => {
   res.send("TESTANDO!");
});

app.listen(port, () => {
   console.log(`Servidor em execução na porta ${port}`);
});